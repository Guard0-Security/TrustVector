import { Shield, CheckCircle, AlertCircle, FileText, Users, TrendingUp } from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background/50 backdrop-blur-sm shadow-lg mb-6">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Evidence-Based Evaluation</span>
        </div>

        <h1 className="text-5xl font-bold mb-6">
          Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Methodology</span>
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed">
          TrustVector evaluates AI systems through a rigorous, transparent, and evidence-based framework.
          Every score is backed by verifiable sources and documented methodologies.
        </p>
      </div>

      {/* Core Principles */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Core Principles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Evidence-Based</h3>
            <p className="text-muted-foreground">
              Every score requires documented evidence from official sources, research papers, or verified testing results.
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Transparent</h3>
            <p className="text-muted-foreground">
              All evaluation criteria, methodologies, and confidence levels are publicly documented and verifiable.
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Community-Driven</h3>
            <p className="text-muted-foreground">
              Open-source evaluations reviewed by the community. Anyone can contribute improvements or new evaluations.
            </p>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Continuously Updated</h3>
            <p className="text-muted-foreground">
              Evaluations are regularly updated as new versions, features, and research become available.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Dimensions */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Five Trust Dimensions</h2>

        <div className="space-y-6">
          {/* Performance & Reliability */}
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">1. Performance & Reliability</h3>
            <p className="text-muted-foreground mb-4">
              Measures task accuracy, output consistency, latency, uptime, and overall system reliability.
            </p>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Key Criteria:</span>
                <ul className="list-disc list-inside ml-4 text-muted-foreground mt-1">
                  <li>Task completion accuracy (benchmarks like HumanEval, MMLU, SWE-bench)</li>
                  <li>Output consistency and determinism</li>
                  <li>Response latency (p50, p95)</li>
                  <li>Uptime SLA and availability</li>
                  <li>Context window and multimodal support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">2. Security</h3>
            <p className="text-muted-foreground mb-4">
              Evaluates resistance to attacks, data protection, and security posture of the AI system.
            </p>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Key Criteria:</span>
                <ul className="list-disc list-inside ml-4 text-muted-foreground mt-1">
                  <li>Jailbreak resistance and prompt injection defense</li>
                  <li>Data leakage prevention</li>
                  <li>Adversarial robustness</li>
                  <li>Content filtering and safety guardrails</li>
                  <li>Access controls and authentication</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy & Compliance */}
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">3. Privacy & Compliance</h3>
            <p className="text-muted-foreground mb-4">
              Assesses data handling practices, regulatory compliance, and privacy protections.
            </p>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Key Criteria:</span>
                <ul className="list-disc list-inside ml-4 text-muted-foreground mt-1">
                  <li>Data retention policies and user control</li>
                  <li>GDPR, HIPAA, and SOC 2 compliance</li>
                  <li>Data sovereignty and geographic controls</li>
                  <li>Encryption at rest and in transit</li>
                  <li>Training data usage policies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Trust & Transparency */}
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">4. Trust & Transparency</h3>
            <p className="text-muted-foreground mb-4">
              Evaluates documentation quality, model transparency, and organizational trustworthiness.
            </p>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Key Criteria:</span>
                <ul className="list-disc list-inside ml-4 text-muted-foreground mt-1">
                  <li>Model documentation completeness</li>
                  <li>Training data transparency</li>
                  <li>Safety testing and bias evaluation disclosure</li>
                  <li>Decision explainability</li>
                  <li>Version management and changelogs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Operational Excellence */}
          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">5. Operational Excellence</h3>
            <p className="text-muted-foreground mb-4">
              Measures ease of use, deployment flexibility, cost efficiency, and operational maturity.
            </p>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Key Criteria:</span>
                <ul className="list-disc list-inside ml-4 text-muted-foreground mt-1">
                  <li>Deployment flexibility (API, self-hosted, cloud platforms)</li>
                  <li>API reliability and rate limits</li>
                  <li>Cost efficiency and pricing model</li>
                  <li>Monitoring and observability tools</li>
                  <li>Documentation and support quality</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoring System */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8">Scoring System</h2>

        <div className="bg-card border rounded-xl p-8">
          <h3 className="text-xl font-bold mb-4">Score Ranges (0-100)</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-32 text-right font-semibold">90-100</div>
              <div className="flex-1 h-3 bg-green-500 rounded-full"></div>
              <div className="w-32 text-muted-foreground">Exceptional</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-right font-semibold">70-89</div>
              <div className="flex-1 h-3 bg-blue-500 rounded-full"></div>
              <div className="w-32 text-muted-foreground">Strong</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-right font-semibold">50-69</div>
              <div className="flex-1 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-32 text-muted-foreground">Adequate</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-right font-semibold">30-49</div>
              <div className="flex-1 h-3 bg-orange-500 rounded-full"></div>
              <div className="w-32 text-muted-foreground">Concerning</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-right font-semibold">0-29</div>
              <div className="flex-1 h-3 bg-red-500 rounded-full"></div>
              <div className="w-32 text-muted-foreground">Poor</div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h4 className="font-bold">Confidence Levels</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <span className="inline-flex items-center px-2 py-1 rounded bg-green-100 text-green-800 font-medium mr-2">High</span>
                Multiple authoritative sources, recent data, official documentation
              </div>
              <div>
                <span className="inline-flex items-center px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-medium mr-2">Medium</span>
                Some authoritative sources, community feedback, partial documentation
              </div>
              <div>
                <span className="inline-flex items-center px-2 py-1 rounded bg-red-100 text-red-800 font-medium mr-2">Low</span>
                Limited sources, older data, or inferred from general practices
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contribute */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border rounded-xl p-12 text-center">
          <AlertCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Contribute to TrustVector</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Help improve AI transparency by contributing evaluations, suggesting improvements, or reporting issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/JBAhire/trust-vector"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-primary-foreground bg-gradient-to-r from-primary to-accent rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              View on GitHub
            </a>
            <a
              href="https://github.com/JBAhire/trust-vector/blob/main/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl border-2 border-border hover:bg-accent hover:border-accent transition-all"
            >
              Contributing Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
