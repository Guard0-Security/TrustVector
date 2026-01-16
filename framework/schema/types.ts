/**
 * TrustVector Framework - Core Type Definitions
 * Version: 1.0.0
 */

export type EntityType = 'model' | 'mcp' | 'agent';

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export type ScoreInterpretation = 'exceptional' | 'strong' | 'adequate' | 'concerning' | 'poor';

/**
 * Evidence supporting a score or claim
 */
export interface Evidence {
  /** Source name (e.g., "LMSYS Chatbot Arena") */
  source: string;
  /** Link to the evidence */
  url: string;
  /** When the evidence was published (ISO 8601) */
  date: string;
  /** What the evidence shows */
  value: string;
  /** Optional context or notes */
  notes?: string;
}

/**
 * A single criterion score within a dimension
 */
export interface CriterionScore {
  /** Score 0-100 (optional for measured/qualitative values) */
  score?: number;
  /** For non-scored metrics (e.g., "2.3s", "200,000 tokens") */
  value?: string | number;
  /** How confident we are in this score */
  confidence: ConfidenceLevel;
  /** Supporting evidence (minimum 1 required) */
  evidence: Evidence[];
  /** How this score was calculated */
  methodology: string;
  /** When this was last verified (ISO 8601) */
  last_verified: string;
  /** Optional notes about limitations or context */
  notes?: string;
}

/**
 * A dimension of the trust vector
 */
export interface DimensionScore {
  /** Overall dimension score (0-100), weighted average of criteria */
  overall_score: number;
  /** Individual criteria scores */
  criteria: Record<string, CriterionScore>;
  /** Optional dimension-level notes */
  notes?: string;
}

/**
 * Use case specific rating
 */
export interface UseCaseRating {
  /** Overall score for this use case (0-100) */
  overall: number;
  /** Explanation of rating and fit */
  notes: string;
  /** Recommended alternatives (entity IDs) */
  alternatives?: string[];
}

/**
 * Metadata specific to models
 */
export interface ModelMetadata {
  /** Pricing information */
  pricing?: {
    input?: string;
    output?: string;
    notes?: string;
  };
  /** Context window size */
  context_window?: number;
  /** Supported languages */
  languages?: string[];
  /** Modalities (text, vision, audio, etc.) */
  modalities?: string[];
  /** API endpoint */
  api_endpoint?: string;
  /** Whether model is open source */
  open_source?: boolean;
  /** Model architecture details */
  architecture?: string;
  /** Parameter count */
  parameters?: string;
}

/**
 * Metadata specific to MCPs
 */
export interface MCPMetadata {
  /** GitHub repository URL */
  repository?: string;
  /** NPM package name */
  package_name?: string;
  /** License type */
  license?: string;
  /** Supported platforms */
  platforms?: string[];
  /** Installation command */
  installation?: string;
  /** Dependencies count */
  dependencies_count?: number;
}

/**
 * Metadata specific to agents/frameworks
 */
export interface AgentMetadata {
  /** GitHub repository URL */
  repository?: string;
  /** Package/library name */
  package_name?: string;
  /** License type */
  license?: string;
  /** Supported languages */
  languages?: string[];
  /** Supported models */
  supported_models?: string[];
  /** Architecture type */
  architecture?: string;
}

/**
 * Main TrustVector evaluation entity
 */
export interface TrustVectorEntity {
  // === Metadata ===
  /** Unique identifier (kebab-case) */
  id: string;
  /** Entity type */
  type: EntityType;
  /** Display name */
  name: string;
  /** Provider/creator name */
  provider: string;
  /** Version identifier */
  version: string;
  /** When this evaluation was last updated (ISO 8601) */
  last_evaluated: string;
  /** Who performed the evaluation */
  evaluated_by: string;
  /** Short description (1-2 sentences) */
  description: string;
  /** Official website or documentation URL */
  website?: string;

  // === The Trust Vector ===
  trust_vector: {
    performance_reliability: DimensionScore;
    security: DimensionScore;
    privacy_compliance: DimensionScore;
    trust_transparency: DimensionScore;
    operational_excellence: DimensionScore;
  };

  // === Use Case Ratings ===
  use_case_ratings: Record<string, UseCaseRating>;

  // === Human Summaries ===
  /** Key strengths (3-5 bullet points) */
  strengths: string[];
  /** Notable limitations (3-5 bullet points) */
  limitations: string[];
  /** Who should use this (target audience) */
  best_for: string[];
  /** Who should NOT use this */
  not_recommended_for?: string[];

  // === Entity-Specific Metadata ===
  metadata: ModelMetadata | MCPMetadata | AgentMetadata | Record<string, any>;

  // === Related Entities ===
  /** Similar/alternative entity IDs */
  related_entities?: string[];

  // === Tags for Filtering ===
  tags?: string[];
}

/**
 * Use case taxonomy
 */
export interface UseCase {
  id: string;
  name: string;
  description: string;
  category: string;
  requirements: {
    critical_dimensions: string[];
    minimum_scores?: Record<string, number>;
  };
}

/**
 * Score interpretation helper
 */
export function interpretScore(score: number): ScoreInterpretation {
  if (score >= 90) return 'exceptional';
  if (score >= 75) return 'strong';
  if (score >= 60) return 'adequate';
  if (score >= 40) return 'concerning';
  return 'poor';
}

/**
 * Score color palette - Terminal/Matrix themed
 * Single source of truth for all score-based colors
 */
export const SCORE_COLORS = {
  exceptional: '#00ff41', // Matrix green
  strong: '#00d9ff',      // Electric cyan
  adequate: '#ffdd00',    // Terminal yellow
  concerning: '#ff6b35',  // Warning orange
  poor: '#ff006e',        // Neon magenta
} as const;

/**
 * Get color for score
 */
export function getScoreColor(score: number): string {
  const interpretation = interpretScore(score);
  return SCORE_COLORS[interpretation];
}

/**
 * Calculate overall trust score (simple average of 5 dimensions)
 */
export function calculateOverallScore(entity: TrustVectorEntity): number {
  const dimensions = Object.values(entity.trust_vector);
  const sum = dimensions.reduce((acc, dim) => acc + dim.overall_score, 0);
  return Math.round(sum / dimensions.length);
}
