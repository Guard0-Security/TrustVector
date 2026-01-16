import { getEntityById, getRelatedEntities, getEntitiesByType } from '@/lib/data';
import { calculateOverallScore } from '@/framework/schema/types';
import { ScoreBadge, ScoreBar } from '@/components/score-badge';
import { TrustVectorChart } from '@/components/trust-vector-chart';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { ExportPDFButton } from '@/components/export-pdf-button';

export function generateStaticParams() {
  const agents = getEntitiesByType('agent');
  return agents.map((agent) => ({ id: agent.id }));
}

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const entity = getEntityById(params.id);

  if (!entity || entity.type !== 'agent') {
    notFound();
  }

  const overallScore = calculateOverallScore(entity);
  const relatedEntities = getRelatedEntities(entity);
  const { trust_vector } = entity;

  const dimensions = [
    {
      key: 'performance_reliability',
      name: 'Performance & Reliability',
      data: trust_vector.performance_reliability,
    },
    { key: 'security', name: 'Security', data: trust_vector.security },
    {
      key: 'privacy_compliance',
      name: 'Privacy & Compliance',
      data: trust_vector.privacy_compliance,
    },
    {
      key: 'trust_transparency',
      name: 'Trust & Transparency',
      data: trust_vector.trust_transparency,
    },
    {
      key: 'operational_excellence',
      name: 'Operational Excellence',
      data: trust_vector.operational_excellence,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 font-mono">
      {/* Breadcrumb */}
      <div className="text-sm text-green-400/70 mb-6 tracking-wide">
        <a href="/" className="hover:text-green-300 transition-colors">
          Home
        </a>
        <span className="mx-2 text-green-500/50">›</span>
        <a href="/" className="hover:text-green-300 transition-colors">
          Agents
        </a>
        <span className="mx-2 text-green-500/50">›</span>
        <span className="text-green-300">{entity.name}</span>
      </div>

      {/* Hero Section */}
      <div className="bg-black/80 border-2 border-green-500/40 rounded-lg p-8 mb-8 relative overflow-hidden" id="report-content">
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(34,197,94,0.1)_2px,rgba(34,197,94,0.1)_4px)]" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
            <div>
              <div className="text-green-500/60 text-xs tracking-widest mb-2">┌─ AGENT IDENTIFICATION ─────────────────────┐</div>
              <h1 className="text-4xl font-bold mb-2 text-green-300 tracking-wide">{entity.name}</h1>
              <p className="text-xl text-cyan-400">[{entity.provider.toUpperCase()}]</p>
            </div>
            <div className="text-right flex flex-col items-end gap-3">
              <ScoreBadge score={overallScore} size="lg" showLabel />
              <p className="text-sm text-green-400/70">Overall Trust Score</p>
              <ExportPDFButton entity={entity} />
            </div>
          </div>

          <p className="text-base text-green-100/80 mb-6 leading-relaxed">{entity.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {entity.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-green-950/60 text-green-400 border-green-500/40 hover:bg-green-950/80">
                #{tag.toUpperCase()}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm text-green-400/80 flex-wrap">
            <div>
              <span className="font-semibold text-green-300">Version:</span> {entity.version}
            </div>
            <div>
              <span className="font-semibold text-green-300">Last Evaluated:</span> {formatDate(entity.last_evaluated)}
            </div>
            {entity.website && (
              <a
                href={entity.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                Official Website →
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left: Trust Vector Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-black/80 border-2 border-green-500/40 rounded-lg p-6 mb-8">
            <div className="text-green-500/60 text-xs tracking-widest mb-4">├─ TRUST VECTOR ANALYSIS ────────────────────</div>
            <h2 className="text-2xl font-bold mb-6 text-green-300">Trust Vector</h2>
            <TrustVectorChart entity={entity} height={400} />
          </div>

          {/* Dimension Details */}
          {dimensions.map((dimension) => (
            <div key={dimension.key} className="bg-black/80 border-2 border-green-500/40 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-300">{dimension.name}</h3>
                <ScoreBadge score={dimension.data.overall_score} size="md" />
              </div>

              {dimension.data.notes && (
                <p className="text-sm text-green-400/70 mb-4">{dimension.data.notes}</p>
              )}

              <div className="space-y-3">
                {Object.entries(dimension.data.criteria).map(([key, criterion]) => (
                  <details key={key} className="group">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-green-950/40 transition-colors border border-transparent hover:border-green-500/20">
                        <div className="flex-1">
                          <div className="font-medium capitalize text-green-200">
                            {key.replace(/_/g, ' ')}
                          </div>
                          {criterion.score !== undefined && (
                            <ScoreBar
                              score={criterion.score}
                              className="mt-2"
                              showValue={false}
                            />
                          )}
                          {criterion.value !== undefined && (
                            <div className="text-sm text-green-400/60 mt-1">
                              Value: {criterion.value}
                            </div>
                          )}
                        </div>
                        {criterion.score !== undefined && (
                          <div className="ml-4">
                            <ScoreBadge score={criterion.score} size="sm" />
                          </div>
                        )}
                      </div>
                    </summary>

                    <div className="mt-2 p-4 bg-green-950/30 border border-green-500/20 rounded-lg space-y-3">
                      <div>
                        <div className="text-sm font-semibold mb-1 text-cyan-400">Methodology</div>
                        <div className="text-sm text-green-100/70">
                          {criterion.methodology}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold mb-1 text-cyan-400">Evidence</div>
                        <div className="space-y-2">
                          {criterion.evidence.map((evidence, idx) => (
                            <div key={idx} className="text-sm">
                              <a
                                href={evidence.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium"
                              >
                                {evidence.source}
                              </a>
                              <div className="text-green-100/70 mt-1">
                                {evidence.value}
                              </div>
                              <div className="text-xs text-green-400/50 mt-1">
                                Date: {evidence.date}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-green-400/70 flex-wrap">
                        <span
                          className={`px-2 py-1 rounded border ${
                            criterion.confidence === 'high'
                              ? 'bg-green-950/60 text-green-400 border-green-500/40'
                              : criterion.confidence === 'medium'
                              ? 'bg-yellow-950/60 text-yellow-400 border-yellow-500/40'
                              : 'bg-red-950/60 text-red-400 border-red-500/40'
                          }`}
                        >
                          Confidence: {criterion.confidence}
                        </span>
                        <span>Last verified: {criterion.last_verified}</span>
                      </div>

                      {criterion.notes && (
                        <div className="text-sm text-green-400/60 italic">
                          Note: {criterion.notes}
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Strengths */}
          <div className="bg-black/80 border-2 border-green-500/40 rounded-lg p-6">
            <div className="text-green-500/60 text-xs tracking-widest mb-3">├─ STRENGTHS ─────────</div>
            <h3 className="text-lg font-bold mb-4 text-green-300">Strengths</h3>
            <ul className="space-y-2">
              {entity.strengths.map((strength, idx) => (
                <li key={idx} className="text-sm flex items-start">
                  <span className="text-green-400 mr-2">+</span>
                  <span className="text-green-100/80">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="bg-black/80 border-2 border-yellow-500/30 rounded-lg p-6">
            <div className="text-yellow-500/60 text-xs tracking-widest mb-3">├─ LIMITATIONS ───────</div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Limitations</h3>
            <ul className="space-y-2">
              {entity.limitations.map((limitation, idx) => (
                <li key={idx} className="text-sm flex items-start">
                  <span className="text-yellow-400 mr-2">!</span>
                  <span className="text-yellow-100/80">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>


          {/* Metadata */}
          {entity.metadata && (
            <div className="bg-black/80 border-2 border-cyan-500/30 rounded-lg p-6">
              <div className="text-cyan-500/60 text-xs tracking-widest mb-3">├─ METADATA ──────────</div>
              <h3 className="text-lg font-bold mb-4 text-cyan-400">Metadata</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(entity.metadata).map(([key, value]) => {
                  if (typeof value === 'object' && value !== null) {
                    return (
                      <div key={key}>
                        <div className="font-semibold capitalize mb-1 text-cyan-300">
                          {key.replace(/_/g, ' ')}:
                        </div>
                        <div className="pl-4 space-y-1">
                          {Object.entries(value).map(([subKey, subValue]) => (
                            <div key={subKey} className="text-cyan-100/70">
                              <span className="capitalize text-cyan-400/80">{subKey.replace(/_/g, ' ')}:</span>{' '}
                              {String(subValue)}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={key} className="text-cyan-100/70">
                      <span className="font-semibold capitalize text-cyan-300">{key.replace(/_/g, ' ')}:</span>{' '}
                      {String(value)}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Use Case Ratings */}
      {entity.use_case_ratings && Object.keys(entity.use_case_ratings).length > 0 && (
        <div className="bg-black/80 border-2 border-green-500/40 rounded-lg p-6 mb-8">
          <div className="text-green-500/60 text-xs tracking-widest mb-4">├─ USE CASE ANALYSIS ─────────────────────────</div>
          <h2 className="text-2xl font-bold mb-6 text-green-300">Use Case Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(entity.use_case_ratings).map(([key, rating]) => (
              <div key={key} className="p-4 border border-green-500/30 rounded-lg bg-green-950/20 hover:bg-green-950/40 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold capitalize text-green-200">{key.replace(/-/g, ' ')}</h3>
                  <ScoreBadge score={rating.overall} size="sm" />
                </div>
                <p className="text-sm text-green-400/70">{rating.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Entities */}
      {relatedEntities.length > 0 && (
        <div className="bg-black/80 border-2 border-green-500/40 rounded-lg p-6">
          <div className="text-green-500/60 text-xs tracking-widest mb-4">├─ SIMILAR ENTITIES ──────────────────────────</div>
          <h2 className="text-2xl font-bold mb-6 text-green-300">Similar Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedEntities.map((related) => (
              <a
                key={related.id}
                href={`/agents/${related.id}`}
                className="p-4 border border-green-500/30 rounded-lg bg-green-950/20 hover:bg-green-950/40 hover:border-green-400/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-green-200 group-hover:text-green-100">{related.name}</h3>
                  <ScoreBadge score={calculateOverallScore(related)} size="sm" />
                </div>
                <p className="text-sm text-green-400/70">{related.provider}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
