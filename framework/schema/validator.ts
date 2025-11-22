/**
 * TrustVector Framework - Data Validation
 * Ensures all evaluations meet quality standards
 */

import { z } from 'zod';
import type { TrustVectorEntity } from './types';

// === Zod Schemas ===

const EvidenceSchema = z.object({
  source: z.string().min(1, 'Evidence source is required'),
  url: z.string().url('Evidence URL must be valid'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be ISO 8601 (YYYY-MM-DD)'),
  value: z.string().min(1, 'Evidence value is required'),
  notes: z.string().optional(),
});

const CriterionScoreSchema = z.object({
  score: z.number().min(0).max(100).optional(),
  value: z.union([z.string(), z.number()]).optional(),
  confidence: z.enum(['high', 'medium', 'low']),
  evidence: z.array(EvidenceSchema).min(1, 'At least one evidence source required'),
  methodology: z.string().min(10, 'Methodology must be descriptive'),
  last_verified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be ISO 8601'),
  notes: z.string().optional(),
}).refine(
  (data) => data.score !== undefined || data.value !== undefined,
  'Either score or value must be provided'
);

const DimensionScoreSchema = z.object({
  overall_score: z.number().min(0).max(100),
  criteria: z.record(z.string(), CriterionScoreSchema),
  notes: z.string().optional(),
});

const UseCaseRatingSchema = z.object({
  overall: z.number().min(0).max(100),
  notes: z.string().min(10),
  alternatives: z.array(z.string()).optional(),
});

const ModelMetadataSchema = z.object({
  pricing: z.object({
    input: z.string().optional(),
    output: z.string().optional(),
    notes: z.string().optional(),
  }).optional(),
  context_window: z.number().positive().optional(),
  languages: z.array(z.string()).optional(),
  modalities: z.array(z.string()).optional(),
  api_endpoint: z.string().url().optional(),
  open_source: z.boolean().optional(),
  architecture: z.string().optional(),
  parameters: z.string().optional(),
});

const MCPMetadataSchema = z.object({
  repository: z.string().url().optional(),
  package_name: z.string().optional(),
  license: z.string().optional(),
  platforms: z.array(z.string()).optional(),
  installation: z.string().optional(),
  dependencies_count: z.number().optional(),
});

const AgentMetadataSchema = z.object({
  repository: z.string().url().optional(),
  package_name: z.string().optional(),
  license: z.string().optional(),
  languages: z.array(z.string()).optional(),
  supported_models: z.array(z.string()).optional(),
  architecture: z.string().optional(),
});

const TrustVectorEntitySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, 'ID must be kebab-case'),
  type: z.enum(['model', 'mcp', 'agent']),
  name: z.string().min(1),
  provider: z.string().min(1),
  version: z.string().min(1),
  last_evaluated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  evaluated_by: z.string().min(1),
  description: z.string().min(10).max(500),
  website: z.string().url().optional(),

  trust_vector: z.object({
    performance_reliability: DimensionScoreSchema,
    security: DimensionScoreSchema,
    privacy_compliance: DimensionScoreSchema,
    trust_transparency: DimensionScoreSchema,
    operational_excellence: DimensionScoreSchema,
  }),

  use_case_ratings: z.record(z.string(), UseCaseRatingSchema),

  strengths: z.array(z.string()).min(3).max(7),
  limitations: z.array(z.string()).min(2).max(7),
  best_for: z.array(z.string()).min(2).max(5),
  not_recommended_for: z.array(z.string()).optional(),

  metadata: z.union([ModelMetadataSchema, MCPMetadataSchema, AgentMetadataSchema, z.record(z.any())]),

  related_entities: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

// === Validation Functions ===

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate a TrustVector entity
 */
export function validateEntity(entity: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    TrustVectorEntitySchema.parse(entity);
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.push(...error.errors.map(e => `${e.path.join('.')}: ${e.message}`));
      return { valid: false, errors, warnings };
    }
    errors.push('Unknown validation error');
    return { valid: false, errors, warnings };
  }

  const typedEntity = entity as TrustVectorEntity;

  // Additional quality checks

  // Check: Overall scores should roughly match criteria averages
  for (const [dimName, dimension] of Object.entries(typedEntity.trust_vector)) {
    const criteriaScores = Object.values(dimension.criteria)
      .filter(c => c.score !== undefined)
      .map(c => c.score as number);

    if (criteriaScores.length > 0) {
      const avgCriteria = criteriaScores.reduce((a, b) => a + b, 0) / criteriaScores.length;
      const diff = Math.abs(avgCriteria - dimension.overall_score);

      if (diff > 10) {
        warnings.push(
          `${dimName}: Overall score (${dimension.overall_score}) differs significantly from criteria average (${avgCriteria.toFixed(1)})`
        );
      }
    }
  }

  // Check: Evidence URLs should be accessible (warn if not HTTPS)
  const allEvidence: any[] = [];
  for (const dimension of Object.values(typedEntity.trust_vector)) {
    for (const criterion of Object.values(dimension.criteria)) {
      allEvidence.push(...criterion.evidence);
    }
  }

  for (const evidence of allEvidence) {
    if (!evidence.url.startsWith('https://')) {
      warnings.push(`Non-HTTPS evidence URL: ${evidence.url}`);
    }
  }

  // Check: Recent evidence (warn if > 1 year old)
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  for (const evidence of allEvidence) {
    const evidenceDate = new Date(evidence.date);
    if (evidenceDate < oneYearAgo) {
      warnings.push(`Old evidence (${evidence.date}): ${evidence.source} - consider updating`);
    }
  }

  // Check: Use case ratings should exist
  if (Object.keys(typedEntity.use_case_ratings).length === 0) {
    warnings.push('No use case ratings provided');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate multiple entities
 */
export function validateEntities(entities: unknown[]): {
  valid: boolean;
  results: Map<string, ValidationResult>;
} {
  const results = new Map<string, ValidationResult>();
  let allValid = true;

  for (const entity of entities) {
    try {
      const id = (entity as any).id || 'unknown';
      const result = validateEntity(entity);
      results.set(id, result);
      if (!result.valid) {
        allValid = false;
      }
    } catch (error) {
      allValid = false;
      results.set('unknown', {
        valid: false,
        errors: ['Failed to validate entity'],
        warnings: [],
      });
    }
  }

  return { valid: allValid, results };
}

/**
 * Format validation results for display
 */
export function formatValidationResults(result: ValidationResult): string {
  const lines: string[] = [];

  if (result.valid) {
    lines.push('✅ Validation passed!');
  } else {
    lines.push('❌ Validation failed:');
  }

  if (result.errors.length > 0) {
    lines.push('\nErrors:');
    result.errors.forEach(e => lines.push(`  - ${e}`));
  }

  if (result.warnings.length > 0) {
    lines.push('\nWarnings:');
    result.warnings.forEach(w => lines.push(`  - ${w}`));
  }

  return lines.join('\n');
}
