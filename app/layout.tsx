import type { Metadata } from 'next';
import './globals.css';
import { Logo } from '@/components/logo';

export const metadata: Metadata = {
  title: 'TrustVector - AI Assurance Framework',
  description:
    'Open-source framework for evaluating 106 AI systems (models, MCPs, and agents) across 5 trust dimensions: security, privacy, performance, trust, and operational excellence.',
  keywords: [
    'AI',
    'LLM',
    'security',
    'evaluation',
    'trust',
    'MCP',
    'agents',
    'assurance',
    'open-source',
    'AI models',
    'AI agents',
    'Model Context Protocol',
    'AI transparency',
    'AI safety',
  ],
  authors: [{ name: 'TrustVector Team' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'TrustVector - AI Assurance Framework',
    description: 'Evidence-based evaluations of 106 AI systems across 5 trust dimensions',
    type: 'website',
    siteName: 'TrustVector',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustVector - AI Assurance Framework',
    description: 'Evidence-based evaluations of 106 AI systems across 5 trust dimensions',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-mono">
        <div className="min-h-screen flex flex-col relative">
          {/* Matrix Rain Background Effect */}
          <div className="matrix-bg fixed inset-0 -z-10">
            <canvas id="matrix-canvas" className="w-full h-full opacity-5" />
          </div>

          {/* Cyber grid overlay */}
          <div className="fixed inset-0 -z-10 cyber-grid opacity-30" />

          {/* Terminal Header - Status Bar Style */}
          <header className="sticky top-0 z-50 w-full border-b-2 border-primary/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 scanlines shadow-lg shadow-primary/10">
            {/* Top status bar */}
            <div className="border-b border-primary/20 bg-muted/20">
              <div className="container mx-auto px-4 py-1">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider">
                  <div className="flex items-center gap-4 text-primary/60">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"
                            style={{ boxShadow: '0 0 5px hsl(var(--terminal-green))' }}
                      />
                      SYSTEM ACTIVE
                    </span>
                    <span className="hidden sm:inline">|</span>
                    <span className="hidden sm:inline">106 AI ENTITIES MONITORED</span>
                    <span className="hidden md:inline">|</span>
                    <span className="hidden md:inline">5 TRUST VECTORS</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary/60">
                    <span className="hidden sm:inline">UTC {new Date().toISOString().split('T')[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main navigation bar */}
            <div className="container mx-auto px-4">
              <nav className="flex h-16 items-center justify-between">
                {/* Terminal prompt + Logo */}
                <div className="flex items-center gap-3">
                  <span className="hidden sm:flex items-center text-sm font-mono text-primary/60">
                    <span className="text-secondary">root@trustvector</span>
                    <span className="text-primary/40">:</span>
                    <span className="text-accent">~</span>
                    <span className="text-primary">$</span>
                  </span>
                  <a href="/" className="group relative">
                    <Logo className="transition-all group-hover:scale-105" />
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-primary/20 rounded blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                  </a>
                </div>

                {/* Navigation items with ASCII symbols */}
                <div className="flex items-center gap-4 font-mono">
                  <a
                    href="/"
                    className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:bg-primary/5 rounded border border-transparent hover:border-primary/30"
                  >
                    <span className="text-primary text-xs">█</span>
                    <span className="hidden sm:inline uppercase tracking-wide">Models</span>
                  </a>
                  <a
                    href="/compare"
                    className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-secondary transition-all hover:bg-secondary/5 rounded border border-transparent hover:border-secondary/30"
                  >
                    <span className="text-secondary text-xs">▓</span>
                    <span className="hidden sm:inline uppercase tracking-wide">Compare</span>
                  </a>
                  <a
                    href="/methodology"
                    className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:bg-primary/5 rounded border border-transparent hover:border-primary/30"
                  >
                    <span className="text-primary text-xs">#</span>
                    <span className="hidden sm:inline uppercase tracking-wide">Methodology</span>
                  </a>
                  <a
                    href="/contribute"
                    className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-all hover:bg-accent/5 rounded border border-transparent hover:border-accent/30"
                  >
                    <span className="text-accent text-xs">+</span>
                    <span className="hidden sm:inline uppercase tracking-wide">Contribute</span>
                  </a>

                  {/* GitHub button - command line style */}
                  <a
                    href="https://github.com/JBAhire/trust-vector"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wider text-primary bg-transparent border-2 border-primary rounded transition-all hover:bg-primary/10 overflow-hidden font-mono shadow-lg shadow-primary/20 hover:shadow-primary/40"
                  >
                    {/* Scan line effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <span className="relative flex items-center gap-2">
                      <span className="text-primary/60">$</span>
                      <span>git clone</span>
                      <span className="hidden sm:inline text-secondary/80">&gt;</span>
                    </span>
                  </a>
                </div>
              </nav>
            </div>

            {/* Bottom border with glow */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          </header>

          <main className="flex-1">{children}</main>

          {/* Terminal Footer - System Info Style */}
          <footer className="border-t-2 border-primary/30 bg-muted/20 backdrop-blur-sm mt-auto font-mono relative overflow-hidden">
            {/* Top glow border */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="container mx-auto px-4 py-12">
              {/* System Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {/* Logo & System Info */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-start gap-3">
                    <Logo size={36} />
                  </div>

                  {/* System output style description */}
                  <div className="space-y-2 text-xs font-mono">
                    <div className="text-primary/60">
                      <span className="text-primary">$</span> cat /sys/trustvector/info
                    </div>
                    <div className="pl-4 text-muted-foreground leading-relaxed border-l-2 border-primary/20">
                      Open-source, evidence-based evaluations of AI systems across security, privacy,
                      performance, trust, and operational excellence.
                    </div>
                    <div className="flex items-center gap-2 text-primary/40 text-[10px] uppercase mt-3">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"
                            style={{ boxShadow: '0 0 5px hsl(var(--terminal-green))' }}
                      />
                      <span>FRAMEWORK STATUS: OPERATIONAL</span>
                    </div>
                  </div>
                </div>

                {/* Resources - Terminal directory style */}
                <div>
                  <div className="text-primary text-xs font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
                    <span className="text-primary/60">▓</span>
                    <span>/resources</span>
                  </div>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li>
                      <a href="/methodology" className="hover:text-primary transition-colors flex items-center gap-2 group">
                        <span className="text-primary/40 group-hover:text-primary">&gt;</span>
                        <span>methodology.md</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/JBAhire/trust-vector"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <span className="text-primary/40 group-hover:text-primary">&gt;</span>
                        <span>github.com</span>
                      </a>
                    </li>
                    <li>
                      <a href="/contribute" className="hover:text-primary transition-colors flex items-center gap-2 group">
                        <span className="text-primary/40 group-hover:text-primary">&gt;</span>
                        <span>contribute.sh</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/JBAhire/trust-vector/issues"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors flex items-center gap-2 group"
                      >
                        <span className="text-accent/40 group-hover:text-accent">&gt;</span>
                        <span>report_issue.log</span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Legal - Terminal directory style */}
                <div>
                  <div className="text-secondary text-xs font-bold mb-3 uppercase tracking-wider flex items-center gap-2">
                    <span className="text-secondary/60">#</span>
                    <span>/legal</span>
                  </div>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li>
                      <a
                        href="https://github.com/JBAhire/trust-vector/blob/main/LICENSE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-secondary transition-colors flex items-center gap-2 group"
                      >
                        <span className="text-secondary/40 group-hover:text-secondary">&gt;</span>
                        <span>LICENSE.mit</span>
                      </a>
                    </li>
                    <li>
                      <a href="/privacy" className="hover:text-secondary transition-colors flex items-center gap-2 group">
                        <span className="text-secondary/40 group-hover:text-secondary">&gt;</span>
                        <span>privacy.txt</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom system bar */}
              <div className="mt-8 pt-6 border-t border-primary/20">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  {/* Copyright in terminal style */}
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="text-primary/40">$</span>
                    <span>© 2025 TrustVector</span>
                    <span className="text-primary/40">|</span>
                    <span className="text-primary/60">MIT License</span>
                    <span className="text-primary/40">|</span>
                    <span className="text-secondary/60">Open Source</span>
                  </div>

                  {/* Social / External links */}
                  <div className="flex items-center gap-4">
                    <a
                      href="https://github.com/JBAhire/trust-vector"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-all group relative"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-primary/60 group-hover:text-primary">[</span>
                        <span className="uppercase tracking-wider">GitHub</span>
                        <span className="text-primary/60 group-hover:text-primary">]</span>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Terminal prompt at bottom */}
                <div className="mt-4 text-[10px] font-mono text-primary/40 flex items-center gap-2">
                  <span className="text-secondary">root@trustvector</span>
                  <span>:</span>
                  <span className="text-accent">~</span>
                  <span className="text-primary">$</span>
                  <span className="terminal-cursor" />
                </div>
              </div>
            </div>

            {/* Background data stream effect */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse" />
          </footer>
        </div>

        {/* Matrix rain effect script */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            const canvas = document.getElementById('matrix-canvas');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            const fontSize = 14;
            const columns = canvas.width / fontSize;
            const drops = Array(Math.floor(columns)).fill(1);

            function draw() {
              ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
              ctx.fillRect(0, 0, canvas.width, canvas.height);

              ctx.fillStyle = '#00ff41';
              ctx.font = fontSize + 'px monospace';

              for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                  drops[i] = 0;
                }
                drops[i]++;
              }
            }

            setInterval(draw, 33);

            window.addEventListener('resize', () => {
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
            });
          })();
        `}} />
      </body>
    </html>
  );
}
