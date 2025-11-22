# Contributing to TrustVector

Thank you for considering contributing to TrustVector! This guide will help you submit high-quality evaluations.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Evaluation Guidelines](#evaluation-guidelines)
- [Quality Standards](#quality-standards)
- [Review Process](#review-process)

---

## Code of Conduct

- Be respectful and constructive
- Focus on evidence, not opinions
- Disclose conflicts of interest
- No vendor bashing or promotion
- Assume good faith

---

## How to Contribute

### 1. Pick an Entity

Choose from:
- **Models**: LLMs, embedding models, vision models
- **MCPs**: Model Context Protocol implementations
- **Agents**: Agentic frameworks (LangGraph, CrewAI, etc.)

Check [open issues](https://github.com/JBAhire/trust-vector/issues) for requested evaluations.

### 2. Research & Evidence Collection

**Required for each criterion:**

- **Source**: Benchmark name, research paper, or official documentation
- **URL**: Direct link to evidence (prefer HTTPS)
- **Date**: Publication date (YYYY-MM-DD format)
- **Value**: What the evidence shows
- **Methodology**: How you derived the score

**Good sources:**
- ✅ Published benchmarks (LMSYS, SWE-bench, GPQA)
- ✅ Official documentation and model cards
- ✅ Peer-reviewed papers
- ✅ Reputable third-party testing (Lakera, Artificial Analysis)
- ✅ Historical status page data

**Avoid:**
- ❌ Anecdotal claims without source
- ❌ Marketing materials only
- ❌ Single-user experiences
- ❌ Evidence older than 1 year (mark as low confidence)

### 3. Create Evaluation File

```bash
# Generate template (coming soon)
npm run create-template -- --type model --id your-model-name

# Manually: Copy an existing evaluation and modify it
cp data/models/claude-sonnet-4-5.json data/models/your-model.json
```

**File naming:**
- Use kebab-case: `gpt-5.json`, `claude-sonnet-4-5.json`
- Match the `id` field in the JSON

### 4. Fill Out the Evaluation

Use the schema in `/framework/schema/types.ts` as your guide.

**Required fields:**
- `id`, `type`, `name`, `provider`, `version`
- `last_evaluated`, `evaluated_by`, `description`
- All 5 trust_vector dimensions with scores
- At least 3 strengths, 2 limitations
- At least 2 "best for" items
- At least 3 use case ratings

**For each criterion score:**
- ✅ At least 1 evidence source (prefer 2+)
- ✅ Methodology description (min 10 characters)
- ✅ Confidence level (high/medium/low)
- ✅ Last verified date

### 5. Validate Your Evaluation

```bash
npm run validate
```

This checks:
- JSON schema compliance
- Evidence URLs are valid
- Scores are consistent
- Required fields present
- Evidence is recent (warns if > 1 year old)

Fix any errors before submitting.

### 6. Submit Pull Request

```bash
git checkout -b evaluation/your-model-name
git add data/models/your-model-name.json
git commit -m "Add evaluation for Your Model Name"
git push origin evaluation/your-model-name
```

**PR Description Template:**

```markdown
## Evaluation: [Model Name]

### Summary
Brief description of the entity and why it's worth evaluating.

### Evidence Quality
- [ ] All scores have at least 1 evidence source
- [ ] Evidence is from the last 12 months
- [ ] Confidence levels accurately reflect evidence strength
- [ ] Methodology is clearly explained

### Conflicts of Interest
- [ ] I have no conflicts of interest
- [ ] I disclose the following: [explain if applicable]

### Additional Notes
Any caveats, limitations, or areas needing community review.
```

---

## Evaluation Guidelines

### Scoring Philosophy

**Be conservative and honest:**
- Don't inflate scores to make entities look good
- Low scores are okay if evidence supports it
- Use confidence levels appropriately:
  - **High**: Multiple recent sources, direct testing
  - **Medium**: Single authoritative source or slightly dated
  - **Low**: Inferred, vendor claims only, needs verification

**Score interpretation:**
- **90-100**: Industry-leading, exceptional capabilities
- **75-89**: Strong, meets enterprise requirements
- **60-74**: Adequate, usable with caveats
- **40-59**: Concerning, significant gaps exist
- **0-39**: Poor, not recommended for production use

### Dimension-Specific Guidance

#### 1. Performance & Reliability

Focus on:
- Benchmark results (HumanEval, MMLU, GPQA, etc.)
- Latency (p50, p95, p99)
- Uptime and availability
- Context window size
- Output consistency

**Example good criterion:**

```json
{
  "task_accuracy_code": {
    "score": 96,
    "confidence": "high",
    "evidence": [
      {
        "source": "SWE-bench Verified",
        "url": "https://www.anthropic.com/news/claude-3-5-sonnet",
        "date": "2024-10-22",
        "value": "49.0% resolution rate (highest on benchmark)"
      }
    ],
    "methodology": "Industry-standard coding benchmark measuring real-world software engineering tasks",
    "last_verified": "2025-11-07"
  }
}
```

#### 2. Security

Focus on:
- Prompt injection resistance
- Jailbreak defenses
- Data leakage prevention
- Output safety filters
- API security features

**Testing:** Reference OWASP LLM Top 10 for security criteria.

#### 3. Privacy & Compliance

Focus on:
- Data residency options
- Data retention policies
- Training data opt-out
- Compliance certifications (SOC 2, HIPAA, GDPR)
- PII handling capabilities

**Important:** Clearly distinguish between:
- Default behavior (what happens out-of-the-box)
- Enterprise options (available for additional cost)
- Self-hosted capabilities (for open-source models)

#### 4. Trust & Transparency

Focus on:
- Explainability features
- Hallucination rates
- Bias and fairness testing
- Uncertainty quantification
- Training data transparency
- Model card quality

#### 5. Operational Excellence

Focus on:
- API design quality
- SDK availability and quality
- Documentation completeness
- Versioning policy
- Monitoring/observability
- Community/support quality
- Ecosystem maturity

### Use Case Ratings

Rate the entity for specific use cases:
- Be realistic about fit
- Explain your rating in notes
- Suggest alternatives if not ideal
- Consider dimension priorities for that use case

**Example:**

```json
"healthcare": {
  "overall": 94,
  "notes": "Top choice for healthcare with HIPAA eligibility and ASL-3 safety. Maximum privacy and accuracy.",
  "alternatives": ["claude-sonnet-4-5"]
}
```

---

## Quality Standards

### Minimum Requirements

- ✅ All 5 dimensions evaluated
- ✅ At least 3 criteria per dimension
- ✅ Every score has evidence
- ✅ Evidence from last 12 months (or marked low confidence)
- ✅ At least 5 use case ratings
- ✅ Passes `npm run validate`

### High-Quality Evaluations

- ✅ 5+ criteria per dimension
- ✅ Multiple evidence sources per criterion
- ✅ Recent evidence (< 6 months)
- ✅ Mix of high-confidence scores
- ✅ Detailed use case ratings (10+)
- ✅ Comprehensive metadata
- ✅ Related entities linked

---

## Review Process

### Timeline

- **Initial review**: Within 48 hours
- **Feedback**: Reviewers will comment on your PR
- **Revisions**: Make requested changes
- **Approval**: 2 maintainer approvals required
- **Merge**: Typically within 1 week of submission

### What We Review

1. **Evidence quality**: Are sources authoritative and recent?
2. **Score accuracy**: Do scores match the evidence?
3. **Confidence levels**: Appropriately conservative?
4. **Completeness**: All required fields present?
5. **Objectivity**: Free from bias or conflicts?
6. **Methodology**: Clearly explained reasoning?

### Common Feedback

- "Please add evidence URL for this score"
- "Confidence should be 'medium' not 'high' for this single source"
- "Evidence is 18 months old, please mark as low confidence or find recent data"
- "Score seems high/low given the evidence, can you explain?"
- "Please add use case ratings for healthcare and finance"

### After Merge

- Your evaluation goes live immediately
- Community can suggest updates via issues
- Evaluations are re-reviewed every 6 months

---

## Tips for Success

1. **Start with an existing evaluation**: Copy `claude-sonnet-4-5.json` as a template
2. **Research thoroughly**: Spend 2-4 hours gathering evidence
3. **Be honest**: Low scores with evidence are better than inflated scores
4. **Ask for help**: Open a draft PR early for feedback
5. **Iterate**: Don't aim for perfection on first try

---

## Questions?

- **General questions**: [GitHub Discussions](https://github.com/JBAhire/trust-vector/discussions)
- **Methodology questions**: See [METHODOLOGY.md](/docs/METHODOLOGY.md)
- **Specific evaluation**: Comment on the relevant PR or issue

---

## Recognition

- Contributors are listed in evaluation metadata (`evaluated_by`)
- Top contributors featured in README
- All contributions under MIT license

Thank you for helping make AI systems more transparent and trustworthy! 🙏
