/**
 * Data loading utilities for TrustVector
 */

import type { TrustVectorEntity } from '@/framework/schema/types';
import { calculateOverallScore } from '@/framework/schema/types';

// ========================================
// MODELS (38 total)
// ========================================

// Anthropic Models (7)
import claudeOpus45 from '@/data/models/claude-opus-4-5.json';
import claudeSonnet45 from '@/data/models/claude-sonnet-4-5.json';
import claudeSonnet4 from '@/data/models/claude-sonnet-4.json';
import claudeOpus41 from '@/data/models/claude-opus-4-1.json';
import claudeOpus4 from '@/data/models/claude-opus-4.json';
import claudeHaiku45 from '@/data/models/claude-haiku-4-5.json';

// OpenAI Models (17)
import gpt52 from '@/data/models/gpt-5-2.json';
import gpt52Codex from '@/data/models/gpt-5-2-codex.json';
import gpt51 from '@/data/models/gpt-5-1.json';
import gpt5 from '@/data/models/gpt-5.json';
import gpt41 from '@/data/models/gpt-4-1.json';
import gpt41Mini from '@/data/models/gpt-4-1-mini.json';
import gpt41Nano from '@/data/models/gpt-4-1-nano.json';
import gpt4o from '@/data/models/gpt-4o.json';
import gpt4oMini from '@/data/models/gpt-4o-mini.json';
import openaiO1 from '@/data/models/openai-o1.json';
import openaiO1Mini from '@/data/models/openai-o1-mini.json';
import openaiO3 from '@/data/models/openai-o3.json';
import openaiO3Mini from '@/data/models/openai-o3-mini.json';
import openaiO4Mini from '@/data/models/openai-o4-mini.json';
import gptOss120b from '@/data/models/gpt-oss-120b.json';
import gptOss20b from '@/data/models/gpt-oss-20b.json';

// Google Models (5)
import gemini3Pro from '@/data/models/gemini-3-pro.json';
import gemini3Flash from '@/data/models/gemini-3-flash.json';
import gemini25Pro from '@/data/models/gemini-2-5-pro.json';
import gemini20Flash from '@/data/models/gemini-2-0-flash.json';
import gemma327b from '@/data/models/gemma-3-27b.json';

// Meta Models (5)
import llama4Maverick from '@/data/models/llama-4-maverick.json';
import llama4Behemoth from '@/data/models/llama-4-behemoth.json';
import llama4Scout from '@/data/models/llama-4-scout.json';
import llama31405b from '@/data/models/llama-3-1-405b.json';
import llama3370b from '@/data/models/llama-3-3-70b.json';

// xAI Models (1)
import grok3Beta from '@/data/models/grok-3-beta.json';

// DeepSeek Models (2)
import deepseekR1 from '@/data/models/deepseek-r1.json';
import deepseekV30324 from '@/data/models/deepseek-v3-0324.json';

// Other Models (3)
import nemotronUltra253b from '@/data/models/nemotron-ultra-253b.json';
import qwen25Vl32b from '@/data/models/qwen2-5-vl-32b.json';
import novaPro from '@/data/models/nova-pro.json';

// ========================================
// AGENTS (30 total)
// ========================================

// Enterprise Agents (5)
import amazonLex from '@/data/agents/amazon-lex.json';
import azureBotService from '@/data/agents/azure-bot-service.json';
import googleDialogflow from '@/data/agents/google-dialogflow.json';
import ibmWatsonAssistant from '@/data/agents/ibm-watson-assistant.json';
import salesforceEinsteinBots from '@/data/agents/salesforce-einstein-bots.json';

// Cloud Provider Agents (3)
import openaiAssistants from '@/data/agents/openai-assistants-api.json';
import bedrockAgents from '@/data/agents/amazon-bedrock-agents.json';
import googleAgentBuilder from '@/data/agents/google-agent-builder.json';

// Open-Source Frameworks (8)
import rasa from '@/data/agents/rasa.json';
import haystack from '@/data/agents/haystack.json';
import langflow from '@/data/agents/langflow.json';
import flowise from '@/data/agents/flowise.json';
import superagi from '@/data/agents/superagi.json';
import langgraphAgent from '@/data/agents/langgraph-agent.json';
import llamaindexAgent from '@/data/agents/llamaindex-agent.json';
import crewai from '@/data/agents/crewai.json';

// Microsoft Agents (2)
import autogen from '@/data/agents/autogen.json';
import semanticKernel from '@/data/agents/semantic-kernel-agent.json';

// Workflow/Automation Agents (4)
import n8nAiAgent from '@/data/agents/n8n-ai-agent.json';
import makeAi from '@/data/agents/make-ai.json';
import zapierAi from '@/data/agents/zapier-ai.json';
import activepieces from '@/data/agents/activepieces.json';

// Specialized Agents (8)
import agentgpt from '@/data/agents/agentgpt.json';
import e2bAgents from '@/data/agents/e2b-agents.json';
import pydanticAi from '@/data/agents/pydantic-ai.json';
import swarm from '@/data/agents/swarm.json';
import adala from '@/data/agents/adala.json';
import memgpt from '@/data/agents/memgpt.json';
import autogpt from '@/data/agents/autogpt.json';
import babyagi from '@/data/agents/babyagi.json';

// ========================================
// MCPs (30 total)
// ========================================

// Official/Reference MCPs (5)
import mcpFetch from '@/data/mcps/mcp-server-fetch.json';
import mcpGit from '@/data/mcps/mcp-server-git.json';
import mcpSequentialThinking from '@/data/mcps/mcp-server-sequential-thinking.json';
import mcpTime from '@/data/mcps/mcp-server-time.json';
import mcpEverything from '@/data/mcps/mcp-server-everything.json';

// Cloud Integration MCPs (5)
import mcpAws from '@/data/mcps/mcp-server-aws.json';
import mcpAzure from '@/data/mcps/mcp-server-azure.json';
import mcpCloudflare from '@/data/mcps/mcp-server-cloudflare.json';
import mcpDocker from '@/data/mcps/mcp-server-docker.json';
import mcpKubernetes from '@/data/mcps/mcp-server-kubernetes.json';

// Database MCPs (6)
import mcpPostgres from '@/data/mcps/mcp-server-postgres.json';
import mcpMongodb from '@/data/mcps/mcp-server-mongodb.json';
import mcpRedis from '@/data/mcps/mcp-server-redis.json';
import mcpElasticsearch from '@/data/mcps/mcp-server-elasticsearch.json';
import mcpSqlite from '@/data/mcps/mcp-server-sqlite.json';
import mcpS3 from '@/data/mcps/mcp-server-s3.json';

// Productivity MCPs (8)
import mcpGmail from '@/data/mcps/mcp-server-gmail.json';
import mcpCalendar from '@/data/mcps/mcp-server-calendar.json';
import mcpNotion from '@/data/mcps/mcp-server-notion.json';
import mcpLinear from '@/data/mcps/mcp-server-linear.json';
import mcpAtlassian from '@/data/mcps/mcp-server-atlassian.json';
import mcpSlack from '@/data/mcps/mcp-server-slack.json';
import mcpGithub from '@/data/mcps/mcp-server-github.json';
import mcpGoogleDrive from '@/data/mcps/mcp-server-google-drive.json';

// Developer Tools MCPs (4)
import mcpSentry from '@/data/mcps/mcp-server-sentry.json';
import mcpDatadog from '@/data/mcps/mcp-server-datadog.json';
import mcpPuppeteer from '@/data/mcps/mcp-server-puppeteer.json';
import mcpBraveSearch from '@/data/mcps/mcp-server-brave-search.json';

// Utility MCPs (2)
import mcpFilesystem from '@/data/mcps/mcp-server-filesystem.json';
import mcpMemory from '@/data/mcps/mcp-server-memory.json';

/**
 * All entities in the system (98 total: 38 models + 30 agents + 30 MCPs)
 */
const ALL_ENTITIES: TrustVectorEntity[] = [
  // ========================================
  // MODELS (38)
  // ========================================
  // Anthropic (7)
  claudeOpus45,
  claudeSonnet45,
  claudeSonnet4,
  claudeOpus41,
  claudeOpus4,
  claudeHaiku45,

  // OpenAI (17)
  gpt52,
  gpt52Codex,
  gpt51,
  gpt5,
  gpt41,
  gpt41Mini,
  gpt41Nano,
  gpt4o,
  gpt4oMini,
  openaiO1,
  openaiO1Mini,
  openaiO3,
  openaiO3Mini,
  openaiO4Mini,
  gptOss120b,
  gptOss20b,

  // Google (5)
  gemini3Pro,
  gemini3Flash,
  gemini25Pro,
  gemini20Flash,
  gemma327b,

  // Meta (5)
  llama4Maverick,
  llama4Behemoth,
  llama4Scout,
  llama31405b,
  llama3370b,

  // xAI (1)
  grok3Beta,

  // DeepSeek (2)
  deepseekR1,
  deepseekV30324,

  // Other (3)
  nemotronUltra253b,
  qwen25Vl32b,
  novaPro,

  // ========================================
  // AGENTS (30)
  // ========================================
  // Enterprise
  amazonLex,
  azureBotService,
  googleDialogflow,
  ibmWatsonAssistant,
  salesforceEinsteinBots,

  // Cloud Providers
  openaiAssistants,
  bedrockAgents,
  googleAgentBuilder,

  // Open-Source
  rasa,
  haystack,
  langflow,
  flowise,
  superagi,
  langgraphAgent,
  llamaindexAgent,
  crewai,

  // Microsoft
  autogen,
  semanticKernel,

  // Workflow/Automation
  n8nAiAgent,
  makeAi,
  zapierAi,
  activepieces,

  // Specialized
  agentgpt,
  e2bAgents,
  pydanticAi,
  swarm,
  adala,
  memgpt,
  autogpt,
  babyagi,

  // ========================================
  // MCPs (30)
  // ========================================
  // Official/Reference
  mcpFetch,
  mcpGit,
  mcpSequentialThinking,
  mcpTime,
  mcpEverything,

  // Cloud Integration
  mcpAws,
  mcpAzure,
  mcpCloudflare,
  mcpDocker,
  mcpKubernetes,

  // Database
  mcpPostgres,
  mcpMongodb,
  mcpRedis,
  mcpElasticsearch,
  mcpSqlite,
  mcpS3,

  // Productivity
  mcpGmail,
  mcpCalendar,
  mcpNotion,
  mcpLinear,
  mcpAtlassian,
  mcpSlack,
  mcpGithub,
  mcpGoogleDrive,

  // Developer Tools
  mcpSentry,
  mcpDatadog,
  mcpPuppeteer,
  mcpBraveSearch,

  // Utility
  mcpFilesystem,
  mcpMemory,
] as TrustVectorEntity[];

/**
 * Get all entities
 */
export function getAllEntities(): TrustVectorEntity[] {
  return ALL_ENTITIES;
}

/**
 * Get entity by ID
 */
export function getEntityById(id: string): TrustVectorEntity | null {
  return ALL_ENTITIES.find((entity) => entity.id === id) || null;
}

/**
 * Get entities by type
 */
export function getEntitiesByType(type: 'model' | 'mcp' | 'agent'): TrustVectorEntity[] {
  return ALL_ENTITIES.filter((entity) => entity.type === type);
}

/**
 * Get entities by provider
 */
export function getEntitiesByProvider(provider: string): TrustVectorEntity[] {
  return ALL_ENTITIES.filter((entity) => entity.provider === provider);
}

/**
 * Search entities by query
 */
export function searchEntities(query: string): TrustVectorEntity[] {
  const lowerQuery = query.toLowerCase();
  return ALL_ENTITIES.filter((entity) => {
    return (
      entity.name.toLowerCase().includes(lowerQuery) ||
      entity.provider.toLowerCase().includes(lowerQuery) ||
      entity.description.toLowerCase().includes(lowerQuery) ||
      entity.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

/**
 * Filter entities by criteria
 */
export interface EntityFilters {
  type?: 'model' | 'mcp' | 'agent';
  provider?: string;
  minOverallScore?: number;
  minDimensionScores?: {
    performance_reliability?: number;
    security?: number;
    privacy_compliance?: number;
    trust_transparency?: number;
    operational_excellence?: number;
  };
  tags?: string[];
}

export function filterEntities(filters: EntityFilters): TrustVectorEntity[] {
  let results = ALL_ENTITIES;

  if (filters.type) {
    results = results.filter((entity) => entity.type === filters.type);
  }

  if (filters.provider) {
    results = results.filter((entity) => entity.provider === filters.provider);
  }

  if (filters.minOverallScore !== undefined) {
    results = results.filter((entity) => {
      const overallScore = calculateOverallScore(entity);
      return overallScore >= filters.minOverallScore!;
    });
  }

  if (filters.minDimensionScores) {
    results = results.filter((entity) => {
      for (const [dimension, minScore] of Object.entries(filters.minDimensionScores!)) {
        const dimensionScore = entity.trust_vector[dimension as keyof typeof entity.trust_vector].overall_score;
        if (dimensionScore < minScore) {
          return false;
        }
      }
      return true;
    });
  }

  if (filters.tags && filters.tags.length > 0) {
    results = results.filter((entity) => {
      return filters.tags!.some((tag) => entity.tags?.includes(tag));
    });
  }

  return results;
}

/**
 * Get all unique providers
 */
export function getAllProviders(): string[] {
  const providers = new Set(ALL_ENTITIES.map((entity) => entity.provider));
  return Array.from(providers).sort();
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  ALL_ENTITIES.forEach((entity) => {
    entity.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get related entities
 */
export function getRelatedEntities(entity: TrustVectorEntity): TrustVectorEntity[] {
  if (!entity.related_entities) return [];

  return entity.related_entities
    .map((id) => getEntityById(id))
    .filter((e): e is TrustVectorEntity => e !== null);
}

/**
 * Sort entities
 */
export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'overall-score-desc'
  | 'overall-score-asc'
  | 'date-desc'
  | 'date-asc';

export function sortEntities(
  entities: TrustVectorEntity[],
  sortBy: SortOption
): TrustVectorEntity[] {
  const sorted = [...entities];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'overall-score-desc':
      return sorted.sort((a, b) => calculateOverallScore(b) - calculateOverallScore(a));
    case 'overall-score-asc':
      return sorted.sort((a, b) => calculateOverallScore(a) - calculateOverallScore(b));
    case 'date-desc':
      return sorted.sort((a, b) => b.last_evaluated.localeCompare(a.last_evaluated));
    case 'date-asc':
      return sorted.sort((a, b) => a.last_evaluated.localeCompare(b.last_evaluated));
    default:
      return sorted;
  }
}

/**
 * Get statistics
 */
export function getStatistics() {
  const entities = getAllEntities();

  return {
    total: entities.length,
    byType: {
      models: entities.filter((e) => e.type === 'model').length,
      mcps: entities.filter((e) => e.type === 'mcp').length,
      agents: entities.filter((e) => e.type === 'agent').length,
    },
    averageOverallScore:
      entities.reduce((sum, entity) => sum + calculateOverallScore(entity), 0) / entities.length,
    providers: getAllProviders().length,
  };
}
