import { getEntityById, getRelatedEntities } from '@/lib/data';
import { calculateOverallScore } from '@/framework/schema/types';
import { ScoreBadge, ScoreBar } from '@/components/score-badge';
import { TrustVectorChart } from '@/components/trust-vector-chart';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const agents = [
    // Enterprise (5)
    'amazon-lex', 'azure-bot-service', 'google-dialogflow', 'ibm-watson-assistant', 'salesforce-einstein-bots',

    // Cloud Providers (3)
    'openai-assistants-api', 'amazon-bedrock-agents', 'google-agent-builder',

    // Open-Source (8)
    'rasa', 'haystack', 'langflow', 'flowise', 'superagi', 'langgraph-agent', 'llamaindex-agent', 'crewai',

    // Microsoft (2)
    'autogen', 'semantic-kernel-agent',

    // Workflow/Automation (4)
    'n8n-ai-agent', 'make-ai', 'zapier-ai', 'activepieces',

    // Specialized (8)
    'agentgpt', 'e2b-agents', 'pydantic-ai', 'swarm', 'adala', 'memgpt', 'autogpt', 'babyagi',
  ];
  return agents.map((id) => ({ id }));
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
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        <a href="/" className="hover:text-primary">
          Home
        </a>
        <span className="mx-2">›</span>
        <a href="/" className="hover:text-primary">
          Agents
        </a>
        <span className="mx-2">›</span>
        <span>{entity.name}</span>
      </div>

      {/* Hero Section */}
      <div className="bg-card border rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{entity.name}</h1>
            <p className="text-xl text-muted-foreground">{entity.provider}</p>
          </div>
          <div className="text-right">
            <ScoreBadge score={overallScore} size="lg" showLabel />
            <p className="text-sm text-muted-foreground mt-2">Overall Trust Score</p>
          </div>
        </div>

        <p className="text-lg text-muted-foreground mb-6">{entity.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {entity.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div>
            <span className="font-semibold">Version:</span> {entity.version}
          </div>
          <div>
            <span className="font-semibold">Last Evaluated:</span> {formatDate(entity.last_evaluated)}
          </div>
          {entity.website && (
            <a
              href={entity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Official Website →
            </a>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left: Trust Vector Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-card border rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Trust Vector</h2>
            <TrustVectorChart entity={entity} height={400} />
          </div>

          {/* Dimension Details */}
          {dimensions.map((dimension) => (
            <div key={dimension.key} className="bg-card border rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{dimension.name}</h3>
                <ScoreBadge score={dimension.data.overall_score} size="md" />
              </div>

              {dimension.data.notes && (
                <p className="text-sm text-muted-foreground mb-4">{dimension.data.notes}</p>
              )}

              <div className="space-y-3">
                {Object.entries(dimension.data.criteria).map(([key, criterion]) => (
                  <details key={key} className="group">
                    <summary className="cursor-pointer list-none">
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
                        <div className="flex-1">
                          <div className="font-medium capitalize">
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
                            <div className="text-sm text-muted-foreground mt-1">
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

                    <div className="mt-2 p-4 bg-muted rounded-lg space-y-3">
                      <div>
                        <div className="text-sm font-semibold mb-1">Methodology</div>
                        <div className="text-sm text-muted-foreground">
                          {criterion.methodology}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold mb-1">Evidence</div>
                        <div className="space-y-2">
                          {criterion.evidence.map((evidence, idx) => (
                            <div key={idx} className="text-sm">
                              <a
                                href={evidence.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                              >
                                {evidence.source}
                              </a>
                              <div className="text-muted-foreground mt-1">
                                {evidence.value}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Date: {evidence.date}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span
                          className={`px-2 py-1 rounded ${
                            criterion.confidence === 'high'
                              ? 'bg-green-100 text-green-800'
                              : criterion.confidence === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          Confidence: {criterion.confidence}
                        </span>
                        <span>Last verified: {criterion.last_verified}</span>
                      </div>

                      {criterion.notes && (
                        <div className="text-sm text-muted-foreground italic">
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
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">✨ Strengths</h3>
            <ul className="space-y-2">
              {entity.strengths.map((strength, idx) => (
                <li key={idx} className="text-sm flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4">⚠️ Limitations</h3>
            <ul className="space-y-2">
              {entity.limitations.map((limitation, idx) => (
                <li key={idx} className="text-sm flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </div>


          {/* Metadata */}
          {entity.metadata && (
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">📊 Metadata</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(entity.metadata).map(([key, value]) => {
                  if (typeof value === 'object' && value !== null) {
                    return (
                      <div key={key}>
                        <div className="font-semibold capitalize mb-1">
                          {key.replace(/_/g, ' ')}:
                        </div>
                        <div className="pl-4 space-y-1">
                          {Object.entries(value).map(([subKey, subValue]) => (
                            <div key={subKey} className="text-muted-foreground">
                              <span className="capitalize">{subKey.replace(/_/g, ' ')}:</span>{' '}
                              {String(subValue)}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={key} className="text-muted-foreground">
                      <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span>{' '}
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
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Use Case Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(entity.use_case_ratings).map(([key, rating]) => (
              <div key={key} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold capitalize">{key.replace(/-/g, ' ')}</h3>
                  <ScoreBadge score={rating.overall} size="sm" />
                </div>
                <p className="text-sm text-muted-foreground">{rating.notes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Entities */}
      {relatedEntities.length > 0 && (
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Similar Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedEntities.map((related) => (
              <a
                key={related.id}
                href={`/agents/${related.id}`}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{related.name}</h3>
                  <ScoreBadge score={calculateOverallScore(related)} size="sm" />
                </div>
                <p className="text-sm text-muted-foreground">{related.provider}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
