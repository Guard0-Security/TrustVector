# Security Policy

## Supported Versions

TrustVector is currently in active development. We provide security updates for:

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

---

## Reporting a Vulnerability

**We take security seriously.** If you discover a security vulnerability in TrustVector, please report it responsibly.

### What to Report

Please report:
- **Code vulnerabilities** in the website, framework, or validation scripts
- **Data injection attacks** that could corrupt evaluations
- **XSS, CSRF, or other web vulnerabilities**
- **Dependency vulnerabilities** (high/critical severity)
- **Authentication/authorization bypasses**
- **Denial of service vulnerabilities**

### What NOT to Report

The following are **not** security vulnerabilities:
- Missing evaluations or outdated data
- Disagreement with evaluation scores
- Feature requests or bugs without security impact
- Social engineering attacks
- Issues already publicly known and documented

---

## How to Report

### Option 1: GitHub Security Advisories (Preferred)

1. Go to the [Security tab](https://github.com/JBAhire/trust-vector/security)
2. Click "Report a vulnerability"
3. Fill out the advisory form with:
   - Vulnerability description
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if known)

### Option 2: Private Email

If you prefer email, send to: **[INSERT SECURITY EMAIL]**

Include:
- **Subject**: `[SECURITY] Brief description`
- **Description**: Detailed explanation of the vulnerability
- **Proof of Concept**: Steps to reproduce or PoC code
- **Impact**: What an attacker could achieve
- **Environment**: Browser, OS, version if relevant

### Encryption

For sensitive reports, you may encrypt your message with our PGP key:
```
[INSERT PGP PUBLIC KEY]
```

---

## Response Timeline

We aim to:
- **Acknowledge** your report within **48 hours**
- **Provide an initial assessment** within **5 business days**
- **Release a fix** within **30 days** for critical issues
- **Publicly disclose** after a fix is released (coordinated disclosure)

---

## Disclosure Policy

### Our Commitment

- We will work with you to understand and validate the issue
- We will keep you informed of our progress
- We will credit you in the security advisory (unless you prefer to remain anonymous)
- We will not take legal action against good-faith security researchers

### Coordinated Disclosure

We follow **coordinated disclosure**:
1. You report the vulnerability privately
2. We confirm and develop a fix
3. We release a security patch
4. We publish a security advisory
5. You may publicly discuss the issue (after advisory)

**Please do not**:
- Publicly disclose the vulnerability before we release a fix
- Exploit the vulnerability beyond what's necessary to demonstrate it
- Access or modify user data that isn't yours
- Conduct automated scanning that degrades service performance

---

## Security Best Practices for Contributors

### Code Contributions

When contributing code:
- ✅ **Validate all inputs** (user-provided data, API responses)
- ✅ **Sanitize outputs** to prevent XSS
- ✅ **Use parameterized queries** (if adding database features)
- ✅ **Keep dependencies updated** (`npm audit` regularly)
- ✅ **Follow least privilege** principles
- ✅ **Avoid hardcoded secrets** (use environment variables)

### Evaluation Contributions

When contributing evaluations:
- ✅ **Verify evidence URLs** are from trusted sources
- ✅ **Avoid suspicious links** that could be phishing
- ✅ **Don't include malicious content** in JSON files
- ✅ **Report injected/tampered evaluations** if you find them

---

## Security Measures

TrustVector implements:

### Website Security
- ✅ **Static site generation** (no runtime server vulnerabilities)
- ✅ **Content Security Policy** headers
- ✅ **HTTPS only** (via GitHub Pages/CDN)
- ✅ **No user authentication** (reduces attack surface)
- ✅ **No data collection** (privacy by design)

### Code Security
- ✅ **Dependency scanning** (Dependabot)
- ✅ **Automated vulnerability alerts**
- ✅ **Code review** for all PRs
- ✅ **Type safety** (TypeScript)
- ✅ **Input validation** (Zod schemas)

### Data Security
- ✅ **Schema validation** on every PR
- ✅ **JSON schema enforcement**
- ✅ **Version control** (all changes tracked)
- ✅ **No sensitive data** in evaluations
- ✅ **Public data only** (transparency)

---

## Known Security Considerations

### Trust in Evidence Sources

TrustVector relies on **external evidence sources** (benchmarks, documentation).
- We cannot guarantee the integrity of third-party sources
- We validate URLs but cannot prevent site compromises
- We encourage multiple independent sources per criterion
- We mark confidence levels to reflect evidence quality

### Supply Chain

Our dependencies are managed via npm:
- We run `npm audit` on every PR
- Dependabot provides automated updates
- We pin versions in `package.json`
- We review dependency changes carefully

### Data Integrity

Anyone can propose evaluation updates:
- We rely on **peer review** to catch malicious changes
- We require **evidence** for all scores
- We track **all changes** via Git history
- We have **maintainer review** before merge

---

## Security Advisories

Past security advisories will be listed here:

- *No security advisories yet*

Subscribe to [security advisories](https://github.com/JBAhire/trust-vector/security/advisories) to stay informed.

---

## Bug Bounty

**Status**: Not currently available

We do not have a paid bug bounty program at this time. However, we:
- Publicly acknowledge security researchers (with permission)
- Provide credit in security advisories
- May offer swag or recognition for significant findings

---

## Security-Related Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [NIST Secure Software Development Framework](https://csrc.nist.gov/projects/ssdf)

---

## Questions?

For **non-security** questions, use:
- [GitHub Issues](https://github.com/JBAhire/trust-vector/issues)
- [GitHub Discussions](https://github.com/JBAhire/trust-vector/discussions)

For **security questions**, use the security advisory or email above.

---

**Thank you for helping keep TrustVector secure!** 🔒
