# TrustVector

> **Open-source AI assurance framework for models, MCPs, and agents**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Evaluations](https://img.shields.io/badge/Evaluations-93-blue.svg)](#-current-coverage)
[![GitHub Stars](https://img.shields.io/github/stars/JBAhire/trust-vector?style=social)](https://github.com/JBAhire/trust-vector)

TrustVector is an evidence-based evaluation framework for AI systems, providing transparent, multi-dimensional trust scores across **security**, **privacy**, **performance**, **trust**, and **operational excellence**.

🌐 **Website**: [Coming Soon]
📖 **Documentation**: [/docs](/docs)
🤝 **Contributing**: [CONTRIBUTING.md](/CONTRIBUTING.md)
🗺️ **Roadmap**: [ROADMAP.md](/ROADMAP.md)
🔒 **Security**: [SECURITY.md](/SECURITY.md)
📜 **Code of Conduct**: [CODE_OF_CONDUCT.md](/CODE_OF_CONDUCT.md)

---

## 🎯 What is TrustVector?

Unlike simple benchmarks, TrustVector evaluates AI systems holistically across **5 critical dimensions**:

1. **Performance & Reliability** - Accuracy, latency, uptime
2. **Security** - Prompt injection resistance, jailbreak defense, data leakage
3. **Privacy & Compliance** - Data residency, retention, HIPAA/GDPR
4. **Trust & Transparency** - Explainability, hallucination rate, bias
5. **Operational Excellence** - API quality, SDKs, ecosystem maturity

### Key Features

- **Evidence-Based**: Every score backed by verifiable sources
- **CVSS-like Weighting**: Customize dimension importance for your use case
- **Transparent**: Full methodology and confidence levels disclosed
- **Open-Source**: Community-driven, GitHub-based contribution workflow
- **Actionable**: Use case specific recommendations

---

## 🚀 Quick Start

### View Evaluations

Browse existing evaluations at [website URL] or locally:

```bash
# Clone the repository
git clone https://github.com/JBAhire/trust-vector.git
cd trust-vector

# Install dependencies
npm install

# Run the website locally
npm run dev

# Open http://localhost:3000
```

### Using the Data

All evaluations are structured JSON files in `/data`:

```typescript
import claudeSonnet from './data/models/claude-sonnet-4-5.json';

// Get overall score
const overallScore = calculateOverallScore(claudeSonnet);

// Access dimension scores
const securityScore = claudeSonnet.trust_vector.security.overall_score;

// Custom weighted score (CVSS-style)
const customScore = calculateCustomScore(claudeSonnet, {
  performance_reliability: 0.15,
  security: 0.35,
  privacy_compliance: 0.30,
  trust_transparency: 0.10,
  operational_excellence: 0.10,
});
```

---

## 📊 Current Coverage

**90 Total Evaluations** across 3 categories:

### AI Models (30)

**Frontier Models:**
- ✅ Claude Sonnet 4.5, Claude Opus 4.1, Claude 3.7 Sonnet, Claude 3.5 Haiku (Anthropic)
- ✅ GPT-5, GPT-4.5, GPT-4.1, GPT-4o, GPT-4o Mini (OpenAI)
- ✅ o1, o1 Mini, o3, o3 Mini (OpenAI Reasoning)
- ✅ Gemini 2.5 Pro, Gemini 2.0 Flash (Google)
- ✅ Llama 4 Behemoth, Llama 4 Maverick, Llama 4 Scout, Llama 3.3 70B, Llama 3.1 405B (Meta)
- ✅ Grok 3 Beta (xAI)
- ✅ DeepSeek R1, DeepSeek V3 (DeepSeek)

**Specialized & Open Source:**
- ✅ Gemma 3 27B (Google)
- ✅ Qwen2.5-VL 32B (Alibaba)
- ✅ Nemotron Ultra 253B (NVIDIA)
- ✅ Nova Pro (Amazon)

**[See all models →](/data/models)**

### AI Agents (30)

**Enterprise Platforms:**
- ✅ Amazon Bedrock Agents, Azure Bot Service, Google Agent Builder
- ✅ IBM Watson Assistant, Google Dialogflow, Amazon Lex

**Developer Frameworks:**
- ✅ LangGraph Agent, LlamaIndex Agent, CrewAI, AutoGen
- ✅ Haystack, LangFlow, Flowise, E2B Agents

**Autonomous Agents:**
- ✅ AutoGPT, BabyAGI, AgentGPT, Adala
- ✅ And 15+ more...

**[See all agents →](/data/agents)**

### MCP Servers (30)

**Cloud & Infrastructure:**
- ✅ AWS, Azure, Cloudflare, Docker, Kubernetes

**Development Tools:**
- ✅ GitHub, Git, Filesystem, Memory

**Productivity & Business:**
- ✅ Gmail, Google Drive, Calendar, Linear, Atlassian
- ✅ Datadog, Elasticsearch, MongoDB

**Utilities:**
- ✅ Brave Search, Fetch, Everything
- ✅ And 15+ more...

**[See all MCPs →](/data/mcps)**

---

## 🤝 Contributing

We welcome contributions! Here's how to add an evaluation:

### 1. Choose an Entity

Pick an unevaluated AI system (model, MCP, or agent).

### 2. Gather Evidence

For each criterion, collect:
- **Source**: Benchmark name, paper, or documentation
- **URL**: Link to evidence
- **Date**: When published
- **Value**: What it shows (e.g., "92.3% on MATH-500")

### 3. Create Evaluation File

Use our template:

```bash
npm run create-template -- --type model --id your-model-name
```

Fill in the JSON following the schema in `/framework/schema/types.ts`.

### 4. Validate

```bash
npm run validate
```

Ensures your evaluation meets quality standards.

### 5. Submit PR

```bash
git checkout -b evaluation/your-model-name
git add data/models/your-model-name.json
git commit -m "Add evaluation for Your Model Name"
git push origin evaluation/your-model-name
```

Open a PR! We'll review within 48 hours.

See [CONTRIBUTING.md](/CONTRIBUTING.md) for detailed guidelines.

---

## 📖 Methodology

### Scoring (0-100)

- **90-100**: Exceptional - Industry leading
- **75-89**: Strong - Meets enterprise requirements
- **60-74**: Adequate - Usable with caveats
- **40-59**: Concerning - Significant gaps
- **0-39**: Poor - Not recommended

### Confidence Levels

- **High**: Multiple independent sources, recent testing
- **Medium**: Single authoritative source or slightly dated
- **Low**: Inferred, vendor claims only, needs verification

### Evidence Requirements

Every score requires:
1. Primary source (benchmark, paper, official doc)
2. Date of evidence
3. Methodology used to derive score
4. Last verified timestamp

See [METHODOLOGY.md](/docs/METHODOLOGY.md) for full details.

---

## 🛠️ Custom Score Calculator

Like CVSS, you can weight dimensions based on your priorities:

```typescript
import { calculateCustomScore, WEIGHTING_PROFILES } from '@/framework/calculator/custom-score';

// Use a predefined profile
const score = calculateCustomScore(entity, WEIGHTING_PROFILES.security_first);

// Or create your own weights
const customWeights = {
  performance_reliability: 0.20,
  security: 0.30,
  privacy_compliance: 0.25,
  trust_transparency: 0.15,
  operational_excellence: 0.10,
};

const myScore = calculateCustomScore(entity, customWeights);
```

### Predefined Profiles

- `balanced` - Equal weight (20% each)
- `security_first` - Security & privacy prioritized
- `performance_focused` - Speed & reliability first
- `enterprise` - Balanced security, compliance, ops
- `healthcare` - HIPAA compliance focused
- `financial` - Security & compliance heavy
- `startup` - Performance & cost optimized

---

## 🏗️ Project Structure

```
trust-vector/
├── data/                       # Evaluation data
│   ├── models/                 # Model evaluations (JSON)
│   ├── mcps/                   # MCP evaluations
│   ├── agents/                 # Agent evaluations
│   └── use-cases/              # Use case taxonomy
├── framework/                  # Core framework
│   ├── schema/                 # TypeScript types & validation
│   └── calculator/             # Custom score calculator
├── website/                    # Next.js website
│   ├── app/                    # Pages and routes
│   ├── components/             # React components
│   └── lib/                    # Utilities
├── docs/                       # Documentation
│   ├── CONTRIBUTING.md
│   ├── METHODOLOGY.md
│   └── examples/
└── scripts/                    # Validation & tools
    └── validate-data.ts        # CI validation
```

---

## 🔒 Security & Privacy

TrustVector itself:
- ✅ No user data collection
- ✅ No cookies or tracking
- ✅ Static site generation (no runtime deps)
- ✅ All evaluations version-controlled
- ✅ Schema validation on every PR

---

## 🌟 Why TrustVector?

| Feature | TrustVector | Typical Benchmarks |
|---------|-------------|-------------------|
| Multi-dimensional | ✅ 5 dimensions | ❌ 1-2 metrics |
| Evidence-based | ✅ Every score sourced | ⚠️ Limited |
| Confidence levels | ✅ High/Med/Low | ❌ No |
| Security evaluation | ✅ Comprehensive | ⚠️ Basic |
| Privacy assessment | ✅ Detailed | ❌ Rare |
| Use case specific | ✅ 10+ use cases | ⚠️ Generic |
| Custom weighting | ✅ CVSS-style | ❌ No |
| Open-source | ✅ MIT | ⚠️ Varies |

---

## 📜 License

MIT License - see [LICENSE](/LICENSE) for details.

---

## 🙏 Acknowledgments

Inspired by:
- [CVSS](https://www.first.org/cvss/) - Vulnerability scoring methodology
- [RiskRubric.ai](https://riskrubric.ai/) - AI model evaluation
- [LMSYS Chatbot Arena](https://lmsys.org/) - Crowdsourced benchmarking
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) - LLM security

Built with:
- Next.js 14 & React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts
- Zod (validation)

---

## 🌟 Support

If you find TrustVector useful:
- ⭐ **Star the repository** to show support
- 🐛 **Report bugs** via [Issues](https://github.com/JBAhire/trust-vector/issues)
- 💡 **Request features** via [Discussions](https://github.com/JBAhire/trust-vector/discussions)
- 🤝 **Contribute** evaluations (see [CONTRIBUTING.md](/CONTRIBUTING.md))
- 📢 **Share** with your network

---

## 📬 Contact

- **Issues**: [GitHub Issues](https://github.com/JBAhire/trust-vector/issues)
- **Discussions**: [GitHub Discussions](https://github.com/JBAhire/trust-vector/discussions)
- **Feature Requests**: [Roadmap](ROADMAP.md)
- **Security**: [SECURITY.md](SECURITY.md)

---

<div align="center">

**[⭐ Star on GitHub](https://github.com/JBAhire/trust-vector)** · **[🤝 Contribute](/CONTRIBUTING.md)** · **[📖 Read Docs](/docs)**

Made with ❤️ by the TrustVector community

</div>
