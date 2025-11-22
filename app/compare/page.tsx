'use client';

import { useState, useMemo } from 'react';
import { getAllEntities } from '@/lib/data';
import { calculateOverallScore, getScoreColor } from '@/framework/schema/types';
import { ScoreBadge } from '@/components/score-badge';
import { GitCompare, X, Plus } from 'lucide-react';
import type { TrustVectorEntity } from '@/framework/schema/types';

export default function ComparePage() {
  const allEntities = getAllEntities();
  const [selectedEntities, setSelectedEntities] = useState<TrustVectorEntity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntities = useMemo(() => {
    if (!searchQuery) return allEntities;
    const query = searchQuery.toLowerCase();
    return allEntities.filter(
      (entity) =>
        entity.name.toLowerCase().includes(query) ||
        entity.provider.toLowerCase().includes(query) ||
        entity.type.toLowerCase().includes(query)
    );
  }, [allEntities, searchQuery]);

  const addEntity = (entity: TrustVectorEntity) => {
    if (selectedEntities.length < 4 && !selectedEntities.find((e) => e.id === entity.id)) {
      setSelectedEntities([...selectedEntities, entity]);
    }
  };

  const removeEntity = (id: string) => {
    setSelectedEntities(selectedEntities.filter((e) => e.id !== id));
  };

  const dimensions = [
    { key: 'performance_reliability', name: 'Performance & Reliability' },
    { key: 'security', name: 'Security' },
    { key: 'privacy_compliance', name: 'Privacy & Compliance' },
    { key: 'trust_transparency', name: 'Trust & Transparency' },
    { key: 'operational_excellence', name: 'Operational Excellence' },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm shadow-lg mb-6">
          <GitCompare className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Side-by-Side Comparison</span>
        </div>

        <h1 className="text-5xl font-bold mb-6">
          Compare <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Systems</span>
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed">
          Compare up to 4 AI models, agents, or MCPs side-by-side across all trust dimensions
        </p>
      </div>

      {/* Entity Selection */}
      {selectedEntities.length < 4 && (
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Select Entities to Compare</h2>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search models, agents, or MCPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredEntities.map((entity) => {
                const isSelected = selectedEntities.find((e) => e.id === entity.id);
                const overallScore = calculateOverallScore(entity);

                return (
                  <button
                    key={entity.id}
                    onClick={() => !isSelected && addEntity(entity)}
                    disabled={!!isSelected}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-muted/50 opacity-50 cursor-not-allowed'
                        : 'hover:bg-accent cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-left">
                        <div className="font-semibold">{entity.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {entity.provider} • {entity.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ScoreBadge score={overallScore} size="sm" />
                      {!isSelected && <Plus className="w-4 h-4 text-primary" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {selectedEntities.length > 0 && (
        <div className="mb-12">
          <div className="bg-card border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-bold sticky left-0 bg-muted/50 z-10">Metric</th>
                    {selectedEntities.map((entity) => (
                      <th key={entity.id} className="text-left p-4 min-w-[200px]">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold">{entity.name}</div>
                            <div className="text-xs text-muted-foreground font-normal">
                              {entity.provider}
                            </div>
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-background">
                                {entity.type}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeEntity(entity.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Overall Score */}
                  <tr className="border-t bg-background">
                    <td className="p-4 font-semibold sticky left-0 bg-background z-10">
                      Overall Trust Score
                    </td>
                    {selectedEntities.map((entity) => {
                      const score = calculateOverallScore(entity);
                      return (
                        <td key={entity.id} className="p-4">
                          <ScoreBadge score={score} size="lg" showLabel />
                        </td>
                      );
                    })}
                  </tr>

                  {/* Dimension Scores */}
                  {dimensions.map((dimension, idx) => (
                    <tr key={dimension.key} className={idx % 2 === 0 ? 'bg-muted/30' : 'bg-background'}>
                      <td className="p-4 font-semibold sticky left-0 z-10" style={{
                        backgroundColor: idx % 2 === 0 ? 'hsl(var(--muted) / 0.3)' : 'hsl(var(--background))'
                      }}>
                        {dimension.name}
                      </td>
                      {selectedEntities.map((entity) => {
                        const score =
                          entity.trust_vector[
                            dimension.key as keyof typeof entity.trust_vector
                          ].overall_score;
                        return (
                          <td key={entity.id} className="p-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-16 h-2 rounded-full"
                                style={{ backgroundColor: getScoreColor(score) }}
                              />
                              <span className="font-semibold" style={{ color: getScoreColor(score) }}>
                                {score}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Provider */}
                  <tr className="border-t bg-background">
                    <td className="p-4 font-semibold sticky left-0 bg-background z-10">Provider</td>
                    {selectedEntities.map((entity) => (
                      <td key={entity.id} className="p-4 text-muted-foreground">
                        {entity.provider}
                      </td>
                    ))}
                  </tr>

                  {/* Version */}
                  <tr className="bg-muted/30">
                    <td className="p-4 font-semibold sticky left-0 bg-muted/30 z-10">Version</td>
                    {selectedEntities.map((entity) => (
                      <td key={entity.id} className="p-4 text-muted-foreground">
                        {entity.version}
                      </td>
                    ))}
                  </tr>

                  {/* Last Evaluated */}
                  <tr className="bg-background">
                    <td className="p-4 font-semibold sticky left-0 bg-background z-10">Last Evaluated</td>
                    {selectedEntities.map((entity) => (
                      <td key={entity.id} className="p-4 text-muted-foreground">
                        {entity.last_evaluated}
                      </td>
                    ))}
                  </tr>

                  {/* Strengths Count */}
                  <tr className="bg-muted/30">
                    <td className="p-4 font-semibold sticky left-0 bg-muted/30 z-10">Key Strengths</td>
                    {selectedEntities.map((entity) => (
                      <td key={entity.id} className="p-4">
                        <span className="text-green-600 font-semibold">{entity.strengths.length}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Limitations Count */}
                  <tr className="bg-background">
                    <td className="p-4 font-semibold sticky left-0 bg-background z-10">Limitations</td>
                    {selectedEntities.map((entity) => (
                      <td key={entity.id} className="p-4">
                        <span className="text-orange-600 font-semibold">{entity.limitations.length}</span>
                      </td>
                    ))}
                  </tr>

                  {/* View Details Link */}
                  <tr className="border-t bg-background">
                    <td className="p-4 font-semibold sticky left-0 bg-background z-10">Details</td>
                    {selectedEntities.map((entity) => (
                      <td key={entity.id} className="p-4">
                        <a
                          href={`/${entity.type}s/${entity.id}`}
                          className="text-primary hover:underline font-medium"
                        >
                          View Full Evaluation →
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {selectedEntities.length === 0 && (
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
            <GitCompare className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No Entities Selected</h3>
          <p className="text-muted-foreground">
            Search and select up to 4 AI systems above to start comparing
          </p>
        </div>
      )}
    </div>
  );
}
