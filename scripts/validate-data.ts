#!/usr/bin/env tsx

/**
 * TrustVector Data Validation Script
 * Validates all evaluation JSON files against schema
 */

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { validateEntity, formatValidationResults } from '../framework/schema/validator';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

function log(message: string, color?: keyof typeof colors) {
  const c = color ? colors[color] : colors.reset;
  console.log(`${c}${message}${colors.reset}`);
}

function validateDirectory(dirPath: string, type: string): { valid: number; invalid: number } {
  let valid = 0;
  let invalid = 0;

  try {
    const files = readdirSync(dirPath).filter((f) => f.endsWith('.json'));

    if (files.length === 0) {
      log(`  No ${type} files found`, 'yellow');
      return { valid, invalid };
    }

    for (const file of files) {
      const filePath = join(dirPath, file);
      try {
        const content = readFileSync(filePath, 'utf-8');
        const entity = JSON.parse(content);

        const result = validateEntity(entity);

        if (result.valid) {
          log(`  ✓ ${file}`, 'green');
          valid++;
          if (result.warnings.length > 0) {
            result.warnings.forEach((warning) => {
              log(`    ⚠ ${warning}`, 'yellow');
            });
          }
        } else {
          log(`  ✗ ${file}`, 'red');
          invalid++;
          result.errors.forEach((error) => {
            log(`    • ${error}`, 'red');
          });
        }
      } catch (error) {
        log(`  ✗ ${file} - JSON parsing error`, 'red');
        if (error instanceof Error) {
          log(`    • ${error.message}`, 'red');
        }
        invalid++;
      }
    }
  } catch (error) {
    log(`  Directory not found: ${dirPath}`, 'yellow');
  }

  return { valid, invalid };
}

async function main() {
  log('\n🔍 TrustVector Data Validation\n', 'bold');

  const results = {
    valid: 0,
    invalid: 0,
  };

  // Validate models
  log('📊 Models:', 'blue');
  const modelResults = validateDirectory('./data/models', 'model');
  results.valid += modelResults.valid;
  results.invalid += modelResults.invalid;

  // Validate MCPs
  log('\n🔌 MCPs:', 'blue');
  const mcpResults = validateDirectory('./data/mcps', 'mcp');
  results.valid += mcpResults.valid;
  results.invalid += mcpResults.invalid;

  // Validate agents
  log('\n🤖 Agents:', 'blue');
  const agentResults = validateDirectory('./data/agents', 'agent');
  results.valid += agentResults.valid;
  results.invalid += agentResults.invalid;

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  log('Summary:', 'bold');
  log(`  Valid: ${results.valid}`, results.valid > 0 ? 'green' : undefined);
  log(`  Invalid: ${results.invalid}`, results.invalid > 0 ? 'red' : undefined);
  log('='.repeat(50) + '\n', 'blue');

  if (results.invalid > 0) {
    log('❌ Validation failed. Please fix the errors above.\n', 'red');
    process.exit(1);
  } else {
    log('✅ All evaluations are valid!\n', 'green');
    process.exit(0);
  }
}

main().catch((error) => {
  log('\n❌ Validation script error:', 'red');
  console.error(error);
  process.exit(1);
});
