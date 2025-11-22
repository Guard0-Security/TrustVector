/**
 * TrustVector Custom Score Calculator
 * Inspired by CVSS - allows users to weight dimensions based on their priorities
 */

import type { TrustVectorEntity } from '../schema/types';

/**
 * Dimension weights (must sum to 1.0)
 */
export interface DimensionWeights {
  performance_reliability: number;
  security: number;
  privacy_compliance: number;
  trust_transparency: number;
  operational_excellence: number;
}

/**
 * Predefined weighting profiles
 */
export const WEIGHTING_PROFILES: Record<string, { name: string; description: string; weights: DimensionWeights }> = {
  balanced: {
    name: 'Balanced',
    description: 'Equal weight across all dimensions',
    weights: {
      performance_reliability: 0.2,
      security: 0.2,
      privacy_compliance: 0.2,
      trust_transparency: 0.2,
      operational_excellence: 0.2,
    },
  },
  security_first: {
    name: 'Security First',
    description: 'Prioritize security and privacy above all',
    weights: {
      performance_reliability: 0.15,
      security: 0.35,
      privacy_compliance: 0.30,
      trust_transparency: 0.10,
      operational_excellence: 0.10,
    },
  },
  performance_focused: {
    name: 'Performance Focused',
    description: 'Optimize for speed and reliability',
    weights: {
      performance_reliability: 0.45,
      security: 0.15,
      privacy_compliance: 0.10,
      trust_transparency: 0.10,
      operational_excellence: 0.20,
    },
  },
  enterprise: {
    name: 'Enterprise',
    description: 'Balance security, compliance, and operational needs',
    weights: {
      performance_reliability: 0.20,
      security: 0.25,
      privacy_compliance: 0.25,
      trust_transparency: 0.10,
      operational_excellence: 0.20,
    },
  },
  research: {
    name: 'Research',
    description: 'Focus on transparency and trust',
    weights: {
      performance_reliability: 0.20,
      security: 0.15,
      privacy_compliance: 0.15,
      trust_transparency: 0.35,
      operational_excellence: 0.15,
    },
  },
  healthcare: {
    name: 'Healthcare',
    description: 'HIPAA compliance and privacy focused',
    weights: {
      performance_reliability: 0.15,
      security: 0.30,
      privacy_compliance: 0.35,
      trust_transparency: 0.10,
      operational_excellence: 0.10,
    },
  },
  financial: {
    name: 'Financial Services',
    description: 'Security, compliance, and operational excellence',
    weights: {
      performance_reliability: 0.15,
      security: 0.30,
      privacy_compliance: 0.25,
      trust_transparency: 0.10,
      operational_excellence: 0.20,
    },
  },
  startup: {
    name: 'Startup',
    description: 'Optimize for performance and cost',
    weights: {
      performance_reliability: 0.35,
      security: 0.15,
      privacy_compliance: 0.10,
      trust_transparency: 0.10,
      operational_excellence: 0.30,
    },
  },
};

/**
 * Calculate custom weighted score for an entity
 */
export function calculateCustomScore(
  entity: TrustVectorEntity,
  weights: DimensionWeights
): number {
  // Validate weights sum to 1.0 (with tolerance for floating point)
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);
  if (Math.abs(sum - 1.0) > 0.01) {
    throw new Error(`Weights must sum to 1.0 (got ${sum})`);
  }

  const { trust_vector } = entity;

  const weightedScore =
    trust_vector.performance_reliability.overall_score * weights.performance_reliability +
    trust_vector.security.overall_score * weights.security +
    trust_vector.privacy_compliance.overall_score * weights.privacy_compliance +
    trust_vector.trust_transparency.overall_score * weights.trust_transparency +
    trust_vector.operational_excellence.overall_score * weights.operational_excellence;

  return Math.round(weightedScore);
}

/**
 * Calculate custom scores for multiple entities
 */
export function calculateCustomScores(
  entities: TrustVectorEntity[],
  weights: DimensionWeights
): Map<string, number> {
  const scores = new Map<string, number>();

  for (const entity of entities) {
    scores.set(entity.id, calculateCustomScore(entity, weights));
  }

  return scores;
}

/**
 * Rank entities by custom score
 */
export function rankByCustomScore(
  entities: TrustVectorEntity[],
  weights: DimensionWeights
): Array<{ entity: TrustVectorEntity; score: number; rank: number }> {
  const scored = entities.map(entity => ({
    entity,
    score: calculateCustomScore(entity, weights),
  }));

  scored.sort((a, b) => b.score - a.score);

  return scored.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));
}

/**
 * Find best entity for a custom weighting profile
 */
export function findBestForProfile(
  entities: TrustVectorEntity[],
  profileKey: keyof typeof WEIGHTING_PROFILES
): { entity: TrustVectorEntity; score: number } | null {
  if (entities.length === 0) return null;

  const profile = WEIGHTING_PROFILES[profileKey];
  const ranked = rankByCustomScore(entities, profile.weights);

  return ranked[0];
}

/**
 * Compare how entities rank under different profiles
 */
export function compareAcrossProfiles(
  entities: TrustVectorEntity[]
): Map<string, Map<string, { score: number; rank: number }>> {
  const results = new Map<string, Map<string, { score: number; rank: number }>>();

  for (const [profileKey, profile] of Object.entries(WEIGHTING_PROFILES)) {
    const ranked = rankByCustomScore(entities, profile.weights);

    for (const item of ranked) {
      if (!results.has(item.entity.id)) {
        results.set(item.entity.id, new Map());
      }
      results.get(item.entity.id)!.set(profileKey, {
        score: item.score,
        rank: item.rank,
      });
    }
  }

  return results;
}

/**
 * Validate custom weights
 */
export function validateWeights(weights: DimensionWeights): { valid: boolean; error?: string } {
  // Check all values are between 0 and 1
  for (const [key, value] of Object.entries(weights)) {
    if (value < 0 || value > 1) {
      return {
        valid: false,
        error: `${key} weight must be between 0 and 1 (got ${value})`,
      };
    }
  }

  // Check sum is 1.0 (with tolerance)
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);
  if (Math.abs(sum - 1.0) > 0.01) {
    return {
      valid: false,
      error: `Weights must sum to 1.0 (got ${sum.toFixed(2)})`,
    };
  }

  return { valid: true };
}

/**
 * Normalize weights to sum to 1.0
 */
export function normalizeWeights(weights: DimensionWeights): DimensionWeights {
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);

  if (sum === 0) {
    // Return balanced if all zeros
    return WEIGHTING_PROFILES.balanced.weights;
  }

  return {
    performance_reliability: weights.performance_reliability / sum,
    security: weights.security / sum,
    privacy_compliance: weights.privacy_compliance / sum,
    trust_transparency: weights.trust_transparency / sum,
    operational_excellence: weights.operational_excellence / sum,
  };
}

/**
 * Convert weights to URL-safe string for sharing
 */
export function weightsToString(weights: DimensionWeights): string {
  return Object.values(weights)
    .map(w => Math.round(w * 100))
    .join('-');
}

/**
 * Parse weights from URL-safe string
 */
export function weightsFromString(str: string): DimensionWeights | null {
  const parts = str.split('-').map(Number);

  if (parts.length !== 5 || parts.some(isNaN)) {
    return null;
  }

  const weights = {
    performance_reliability: parts[0] / 100,
    security: parts[1] / 100,
    privacy_compliance: parts[2] / 100,
    trust_transparency: parts[3] / 100,
    operational_excellence: parts[4] / 100,
  };

  const validation = validateWeights(weights);
  if (!validation.valid) {
    return null;
  }

  return weights;
}

/**
 * Generate shareable URL with custom weights
 */
export function generateShareableUrl(
  baseUrl: string,
  weights: DimensionWeights,
  entityIds?: string[]
): string {
  const params = new URLSearchParams();
  params.set('weights', weightsToString(weights));

  if (entityIds && entityIds.length > 0) {
    params.set('entities', entityIds.join(','));
  }

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Suggest optimal profile for a use case
 */
export function suggestProfile(useCase: string): keyof typeof WEIGHTING_PROFILES {
  const useCaseLower = useCase.toLowerCase();

  if (useCaseLower.includes('health') || useCaseLower.includes('medical')) {
    return 'healthcare';
  }

  if (useCaseLower.includes('financial') || useCaseLower.includes('banking')) {
    return 'financial';
  }

  if (useCaseLower.includes('security') || useCaseLower.includes('secure')) {
    return 'security_first';
  }

  if (useCaseLower.includes('research') || useCaseLower.includes('academic')) {
    return 'research';
  }

  if (useCaseLower.includes('enterprise') || useCaseLower.includes('compliance')) {
    return 'enterprise';
  }

  if (useCaseLower.includes('startup') || useCaseLower.includes('cost')) {
    return 'startup';
  }

  if (useCaseLower.includes('performance') || useCaseLower.includes('speed')) {
    return 'performance_focused';
  }

  return 'balanced';
}
