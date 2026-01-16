import { GitBranch, FileJson, CheckCircle, AlertTriangle, BookOpen, Code, Users, ExternalLink, Database, Bot, Brain } from 'lucide-react';
import Link from 'next/link';

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm shadow-lg mb-6">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Community-Driven</span>
        </div>

        <h1 className="text-5xl font-bold mb-6">
          How to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Contribute</span>
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed">
          TrustVector is an open-source project that relies on community contributions to evaluate AI systems.
          Help us build the most comprehensive and transparent AI trust database.
        </p>
      </div>

      {/* What You Can Contribute */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">What You Can Contribute</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Models</h3>
            <p className="text-muted-foreground text-sm">
              Add evaluations for new LLMs, multimodal models, and specialized AI systems from any provider.
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Agents</h3>
            <p className="text-muted-foreground text-sm">
              Evaluate agent frameworks like CrewAI, AutoGPT, LangGraph, and enterprise agent platforms.
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">MCP Servers</h3>
            <p className="text-muted-foreground text-sm">
              Add trust reports for Model Context Protocol servers that extend AI capabilities.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Quick Start Guide</h2>

        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Fork the Repository</h3>
                <p className="text-muted-foreground mb-3">
                  Start by forking the TrustVector repository to your GitHub account.
                </p>
                <code className="block bg-muted px-4 py-2 rounded-lg text-sm font-mono">
                  git clone https://github.com/YOUR_USERNAME/trust-vector.git
                </code>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Choose What to Evaluate</h3>
                <p className="text-muted-foreground mb-3">
                  Create a new JSON file in the appropriate directory:
                </p>
                <div className="space-y-2 text-sm font-mono">
                  <div className="bg-muted px-4 py-2 rounded-lg flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <span>data/models/</span>
                    <span className="text-muted-foreground">- For AI models</span>
                  </div>
                  <div className="bg-muted px-4 py-2 rounded-lg flex items-center gap-2">
                    <Bot className="w-4 h-4 text-green-500" />
                    <span>data/agents/</span>
                    <span className="text-muted-foreground">- For AI agents</span>
                  </div>
                  <div className="bg-muted px-4 py-2 rounded-lg flex items-center gap-2">
                    <Database className="w-4 h-4 text-purple-500" />
                    <span>data/mcps/</span>
                    <span className="text-muted-foreground">- For MCP servers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Follow the Schema</h3>
                <p className="text-muted-foreground mb-3">
                  Use existing files as templates. Every evaluation must include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Five trust dimensions with scored criteria</li>
                  <li>Evidence with sources, URLs, and dates</li>
                  <li>Confidence levels (high, medium, low)</li>
                  <li>Use case ratings for different scenarios</li>
                  <li>Strengths and limitations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Submit a Pull Request</h3>
                <p className="text-muted-foreground mb-3">
                  Open a PR with a clear description of what you&apos;ve evaluated and why.
                </p>
                <code className="block bg-muted px-4 py-2 rounded-lg text-sm font-mono">
                  git checkout -b add-evaluation-[name] && git push origin HEAD
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Schema */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Data Schema Overview</h2>

        <div className="bg-card border rounded-xl overflow-hidden">
          <div className="bg-muted px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <FileJson className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm">example-evaluation.json</span>
            </div>
          </div>
          <pre className="p-6 text-sm overflow-x-auto">
            <code className="text-muted-foreground">{`{
  "id": "unique-identifier",
  "type": "model" | "agent" | "mcp",
  "name": "Display Name",
  "provider": "Provider Name",
  "version": "1.0.0",
  "last_evaluated": "2025-01-14",
  "description": "Brief description...",
  "trust_vector": {
    "performance_reliability": {
      "overall_score": 85,
      "criteria": {
        "criterion_name": {
          "score": 85,
          "confidence": "high" | "medium" | "low",
          "evidence": [{
            "source": "Source Name",
            "url": "https://...",
            "date": "2025-01-14",
            "value": "Key finding..."
          }]
        }
      }
    },
    "security": { ... },
    "privacy_compliance": { ... },
    "trust_transparency": { ... },
    "operational_excellence": { ... }
  },
  "use_case_ratings": {
    "code-generation": { "overall": 90, "notes": "..." }
  },
  "strengths": ["..."],
  "limitations": ["..."]
}`}</code>
          </pre>
        </div>
      </div>

      {/* Evidence Guidelines */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Evidence Guidelines</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold">Accepted Sources</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Official documentation and technical papers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Peer-reviewed research and benchmarks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Security audits and compliance certifications
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Official GitHub repositories
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                Reputable security research publications
              </li>
            </ul>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-bold">Use With Caution</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">!</span>
                Marketing materials (may be biased)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">!</span>
                Unverified community reports
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">!</span>
                Outdated documentation (&gt;6 months)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">!</span>
                Self-reported benchmarks without validation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">!</span>
                Anonymous or unattributed sources
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Confidence Levels */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Confidence Levels</h2>

        <div className="bg-card border rounded-xl p-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded bg-green-100 text-green-800 font-semibold text-sm">
                High
              </span>
              <div>
                <p className="font-semibold">Multiple authoritative sources</p>
                <p className="text-muted-foreground text-sm">
                  Official documentation, peer-reviewed research, recent data (within 3 months)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold text-sm">
                Medium
              </span>
              <div>
                <p className="font-semibold">Some authoritative sources</p>
                <p className="text-muted-foreground text-sm">
                  Partial documentation, community feedback, data within 6 months
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded bg-red-100 text-red-800 font-semibold text-sm">
                Low
              </span>
              <div>
                <p className="font-semibold">Limited sources available</p>
                <p className="text-muted-foreground text-sm">
                  Older data, inferred from general practices, or single-source information
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Needed Evaluations */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Currently Needed</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-500" />
              MCP Servers
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Supabase MCP Server</li>
              <li>• GitLab MCP Server</li>
              <li>• Perplexity MCP Server</li>
              <li>• Tavily MCP Server</li>
              <li>• Exa MCP Server</li>
              <li>• Context7 MCP Server</li>
              <li>• Google Maps MCP Server</li>
              <li>• ClickHouse MCP Server</li>
            </ul>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Bot className="w-5 h-5 text-green-500" />
              AI Agents & Platforms
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Kore.ai Enterprise Agents</li>
              <li>• Glean AI Platform</li>
              <li>• Sierra Customer Service</li>
              <li>• Moveworks Enterprise Assistant</li>
              <li>• Decagon Support AI</li>
              <li>• Aisera Service Automation</li>
              <li>• Cognigy Contact Center AI</li>
              <li>• Relevance AI Agents</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border rounded-xl p-12 text-center">
          <GitBranch className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Contribute?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join our community of contributors helping build transparency in AI systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/JBAhire/trust-vector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary-foreground bg-gradient-to-r from-primary to-accent rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              <Code className="w-5 h-5" />
              View on GitHub
            </a>
            <Link
              href="/methodology"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border-2 border-border hover:bg-accent hover:border-accent transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Read Methodology
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
