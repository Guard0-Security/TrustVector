# TrustVector Methodology

This document explains how TrustVector evaluations are conducted, scored, and maintained.

## Overview

TrustVector evaluates AI systems across **5 dimensions** using **evidence-based scoring**. Every claim is backed by verifiable sources with confidence levels.

## The 5 Trust Dimensions

### 1. Performance & Reliability (0-100)

**What we measure:**
- Task accuracy on standard benchmarks
- Output consistency across runs
- Latency (p50, p95, p99)
- Uptime and availability
- Context window size
- Rate limits and throughput

**Why it matters:**
Performance determines if an AI system can meet user needs reliably. A high-performing model that's frequently down or inconsistent is not trustworthy.

**Scoring criteria:**
- Benchmark results normalized to 0-100 scale
- Latency measured in real-world conditions
- Uptime from official status pages
- Consistency from repeated testing

### 2. Security (0-100)

**What we measure:**
- Prompt injection resistance (OWASP LLM01)
- Jailbreak defenses
- Data leakage prevention
- Output safety filtering
- API security features

**Why it matters:**
Security breaches can expose sensitive data, produce harmful outputs, or enable misuse. Security is critical for production deployments.

**Scoring criteria:**
- Testing against known attack vectors
- Review of security documentation
- Historical incident analysis
- API security best practices compliance

### 3. Privacy & Compliance (0-100)

**What we measure:**
- Data residency options
- Data retention policies
- Training data opt-out availability
- PII handling capabilities
- Compliance certifications (SOC 2, HIPAA, GDPR, ISO 27001)
- Zero data retention options

**Why it matters:**
Privacy violations can violate laws (GDPR, HIPAA), break user trust, and expose organizations to liability.

**Scoring criteria:**
- Policy review (terms of service, privacy policy)
- Certification verification
- Data flow analysis
- Opt-out mechanism testing

### 4. Trust & Transparency (0-100)

**What we measure:**
- Explainability features
- Hallucination rates
- Bias and fairness testing
- Uncertainty quantification
- Model card quality
- Training data transparency
- Built-in guardrails

**Why it matters:**
Users need to understand how AI systems work, when they're uncertain, and where biases exist to make informed decisions.

**Scoring criteria:**
- Factual accuracy testing
- Bias benchmarks (BBQ, etc.)
- Documentation completeness review
- Explanation quality assessment

### 5. Operational Excellence (0-100)

**What we measure:**
- API design quality
- SDK availability and quality
- Versioning policy clarity
- Breaking change management
- Monitoring/observability tools
- Support quality and SLAs
- Ecosystem maturity
- License terms

**Why it matters:**
Operational issues cause integration failures, unexpected costs, and vendor lock-in. Excellent operations enable smooth production deployments.

**Scoring criteria:**
- API design principles compliance
- SDK feature completeness
- Documentation quality
- Community health metrics
- Support responsiveness

---

## Scoring Methodology

### Overall Dimension Scores

Each dimension receives an overall score (0-100) calculated as:

```
overall_score = weighted_average(criteria_scores)
```

Weights are assigned based on criterion importance within that dimension.

### Criterion Scoring

Individual criteria are scored based on:

1. **Quantitative metrics**: Benchmark results, measured latency
2. **Qualitative assessment**: Documentation quality, policy comprehensiveness
3. **Binary checks**: Certification present (yes/no)

**Normalization:**
- Benchmarks: Map performance to 0-100 (relative to state-of-the-art)
- Latency: Lower is better, normalize to 0-100
- Binary: Yes = 100, No = 0, Partial = 50

### Overall Trust Score

```
overall_trust_score = (
  performance_reliability +
  security +
  privacy_compliance +
  trust_transparency +
  operational_excellence
) / 5
```

This is a **simple average** by default. Users can customize weights via the custom score calculator.

---

## Evidence Requirements

### Source Types (Ranked by Strength)

1. **Peer-reviewed papers** (highest confidence)
2. **Official benchmarks** (LMSYS, SWE-bench, etc.)
3. **Official documentation** (API docs, model cards)
4. **Third-party testing** (security firms, independent researchers)
5. **Status pages** (uptime data)
6. **Community testing** (GitHub, blogs)
7. **Vendor claims** (lowest confidence, requires verification)

### Minimum Evidence

Every scored criterion requires:
- At least **1 evidence source**
- **URL** to the source
- **Date** when evidence was published (YYYY-MM-DD)
- **Value** that the evidence shows
- **Methodology** explaining how score was derived
- **Last verified** date

**Preferred:**
- 2+ evidence sources (cross-verification)
- Evidence from last 6 months
- Mix of quantitative and qualitative sources

---

## Confidence Levels

### High Confidence ●

- Multiple independent sources (2+)
- Evidence published within last 6 months
- Direct testing or benchmark results
- Authoritative sources (official, peer-reviewed)

### Medium Confidence ◐

- Single authoritative source
- Evidence 6-12 months old
- Indirect measurement (e.g., inferred from similar models)
- Reputable third-party testing

### Low Confidence ○

- Vendor claims only (not independently verified)
- Evidence older than 12 months
- Anecdotal reports
- Significant gaps in data
- Extrapolated from limited information

**Important:** Low confidence doesn't mean wrong, it means "needs more verification."

---

## Handling Uncertainty

### When Evidence is Missing

If no evidence exists for a criterion:
- **Don't guess** - mark as low confidence
- **Explain** in notes why evidence is unavailable
- **Seek** vendor input or community testing
- Consider **not scoring** (use `value` field for qualitative data)

### When Evidence Conflicts

If sources disagree:
- **Document all sources** in evidence array
- **Note the conflict** in criterion notes
- **Use most recent** and authoritative source for score
- **Mark as medium confidence** at best

### Qualitative vs Quantitative

Some criteria are qualitative (e.g., "API design quality"):
- Use **structured rubrics** (see [Rubrics](#rubrics) below)
- **Explain reasoning** in methodology
- **Compare to peers** for relative scoring
- **Mark confidence appropriately** (usually medium)

---

## Rubrics

### API Design Quality (0-100)

- **90-100**: RESTful, OpenAPI spec, streaming, webhooks, comprehensive
- **75-89**: Well-designed, consistent, good features, minor gaps
- **60-74**: Functional, some inconsistencies, missing features
- **40-59**: Poor design, frequent breaking changes, limited features
- **0-39**: Inconsistent, unreliable, poorly documented

### Documentation Quality (0-100)

- **90-100**: Comprehensive, clear examples, API reference, guides, up-to-date
- **75-89**: Good coverage, some gaps, mostly clear
- **60-74**: Basic docs, outdated sections, limited examples
- **40-59**: Minimal documentation, confusing, many gaps
- **0-39**: Severely lacking or non-existent

### Ecosystem Maturity (0-100)

Based on:
- Number of integrations with major frameworks
- Community library availability
- Tutorial and course availability
- Active community size
- GitHub stars/forks (for open-source)

---

## Custom Score Calculator

### CVSS-Inspired Weighting

Like CVSS (Common Vulnerability Scoring System), TrustVector allows custom weights:

```typescript
{
  performance_reliability: 0.20,  // Must sum to 1.0
  security: 0.30,
  privacy_compliance: 0.25,
  trust_transparency: 0.15,
  operational_excellence: 0.10
}
```

### Predefined Profiles

- **Balanced**: 20% each dimension
- **Security First**: 35% security, 30% privacy
- **Performance Focused**: 45% performance, 20% operations
- **Enterprise**: 25% security, 25% privacy, 20% operations
- **Healthcare**: 35% privacy, 30% security (HIPAA focus)
- **Financial**: 30% security, 25% privacy, 20% operations
- **Startup**: 35% performance, 30% operations (cost-focused)

### Use Case Recommendations

Different use cases prioritize different dimensions:

| Use Case | Critical Dimensions | Min Scores |
|----------|---------------------|------------|
| Healthcare | Privacy, Security | 85, 80 |
| Finance | Security, Compliance | 85, 85 |
| Code Generation | Performance, Trust | 75, 70 |
| Research | Trust, Transparency | 85, 80 |
| Customer Support | Performance, Security | 70, 75 |

---

## Evaluation Updates

### When to Update

- **Major version release**: New model version
- **Significant benchmark update**: New SWE-bench, GPQA results
- **Policy changes**: Privacy policy, terms of service changes
- **Security incidents**: Disclosed vulnerabilities
- **Every 6 months**: Routine refresh

### Update Process

1. Contributor opens issue or PR
2. Update relevant criteria
3. Add new evidence
4. Update `last_evaluated` and `last_verified` dates
5. Note what changed in PR description

---

## Limitations & Biases

### Known Limitations

1. **Recency bias**: Newer models may have more recent benchmarks
2. **Benchmark gaming**: Vendors may optimize specifically for tested benchmarks
3. **Closed-source opacity**: Limited transparency for proprietary models
4. **Resource constraints**: Can't test everything ourselves
5. **Temporal decay**: Evaluations become less accurate over time

### Mitigations

- Multiple evidence sources required
- Confidence levels acknowledge uncertainty
- Community review process
- Regular re-evaluation (6 months)
- Transparent methodology

### What TrustVector Doesn't Measure

- **Cost-benefit analysis** (though we note pricing)
- **Subjective quality** (writing style preference)
- **Specific use case performance** (beyond 10 common ones)
- **Future capabilities** (roadmap promises)

---

## Quality Assurance

### Validation Checks

Every evaluation must pass:
- JSON schema validation
- Evidence URL accessibility
- Score consistency (overall ≈ average of criteria)
- Required fields present
- Evidence freshness warnings (if > 1 year old)

### Peer Review

- 2 maintainer approvals required
- Community can comment on PRs
- Conflicts of interest must be disclosed

### Maintenance

- Bi-annual review of all evaluations
- Issue tracking for needed updates
- Community can flag outdated evaluations

---

## Comparison to Other Frameworks

| Feature | TrustVector | LMSYS Arena | RiskRubric | Simple Benchmarks |
|---------|-------------|-------------|------------|------------------|
| Multi-dimensional | ✅ 5 dimensions | ❌ Single | ⚠️ Limited | ❌ Single metric |
| Security evaluation | ✅ Comprehensive | ❌ No | ⚠️ Basic | ❌ No |
| Privacy evaluation | ✅ Detailed | ❌ No | ⚠️ Basic | ❌ No |
| Evidence-based | ✅ Every score | ✅ Yes | ⚠️ Partial | ✅ Yes |
| Confidence levels | ✅ High/Med/Low | ❌ No | ❌ No | ❌ No |
| Custom weighting | ✅ CVSS-style | ❌ No | ❌ No | ❌ No |
| Open-source | ✅ MIT | ✅ Open | ❌ No | ⚠️ Varies |
| Use case specific | ✅ 10+ | ❌ No | ⚠️ Limited | ❌ No |

**Complementary, not competitive:** TrustVector incorporates data from LMSYS, benchmarks, etc., providing a holistic view.

---

## Version History

- **v1.0** (2025-11-07): Initial methodology
- Framework covers models, MCPs, agents
- 5 dimensions, evidence-based, confidence levels
- Custom score calculator

---

## Feedback

This methodology will evolve based on community feedback.

- **Suggest improvements**: [GitHub Discussions](https://github.com/JBAhire/trust-vector/discussions)
- **Report issues**: [GitHub Issues](https://github.com/JBAhire/trust-vector/issues)
- **Ask questions**: Comment on relevant PRs

---

## Credits

Methodology inspired by:
- **CVSS** (vulnerability scoring)
- **OWASP LLM Top 10** (security framework)
- **Model Card** framework (documentation standards)
- **ISO/IEC 25010** (software quality model)
