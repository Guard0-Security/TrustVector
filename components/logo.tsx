/**
 * TrustVector Terminal Logo Component
 *
 * Terminal/Cyberpunk themed logo representing:
 * - Security terminal interface
 * - Hacker aesthetic with ASCII art
 * - Matrix-style system status
 * - Glitch effects for cyberpunk vibe
 */

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'full' | 'icon' | 'wordmark';
}

export function Logo({ className = '', size = 40, variant = 'full' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <div
        className={`relative ${className}`}
        style={{ width: size, height: size }}
        role="img"
        aria-label="TrustVector logo"
      >
        {/* Terminal bracket icon with glowing effect */}
        <div className="font-mono font-bold flex items-center justify-center h-full relative group">
          <span
            className="neon-green text-2xl relative"
            style={{ fontSize: size * 0.7 }}
            aria-hidden="true"
          >
            &gt;_
          </span>
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 border-2 border-primary rounded opacity-20 group-hover:opacity-40 transition-opacity"
               style={{
                 boxShadow: '0 0 20px hsl(var(--terminal-green))',
                 animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
               }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={`flex items-center font-mono ${className}`} role="img" aria-label="TrustVector">
        <span className="text-2xl font-bold tracking-tight uppercase" aria-hidden="true">
          <span className="neon-green">[</span>
          <span className="text-primary">TRUST</span>
          <span className="neon-cyan">&gt;</span>
          <span className="text-secondary">VECTOR</span>
          <span className="neon-green">]</span>
        </span>
      </div>
    );
  }

  // Full logo (clean version)
  return (
    <div className={`flex items-center ${className}`} role="img" aria-label="TrustVector">
      <span className="text-xl font-bold font-mono tracking-tight uppercase" aria-hidden="true">
        <span className="text-white">TRUST</span>
        <span className="text-primary">VECTOR</span>
      </span>
    </div>
  );
}

/**
 * Animated Logo - for hero sections with epic glitch effects
 */
export function AnimatedLogo({ className = '', size = 120 }: { className?: string; size?: number }) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size * 2, height: size }}
      role="img"
      aria-label="TrustVector - AI Security Terminal - Online with 98 systems and 5 vectors"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-primary/5 rounded-lg blur-xl" />

      {/* Main terminal display */}
      <div className="relative font-mono flex flex-col items-start justify-center h-full px-6 border-2 border-primary/30 rounded bg-card/50 backdrop-blur-sm overflow-hidden scanlines">
        {/* Scanline effect overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
             style={{
               background: 'repeating-linear-gradient(0deg, rgba(0,255,0,0.1), rgba(0,255,0,0.1) 1px, transparent 1px, transparent 2px)'
             }}
        />

        {/* System header */}
        <div className="text-xs text-primary/40 mb-2 animate-pulse">
          [SYSTEM INITIALIZATION...]
        </div>

        {/* Main logo with glitch effect */}
        <div className="relative mb-1">
          <div
            className="glitch text-3xl font-bold uppercase tracking-wider"
            data-text="TRUST>VECTOR"
            style={{
              animation: 'glitch 5s infinite'
            }}
          >
            <span className="neon-green">TRUST</span>
            <span className="text-primary/60 mx-1">&gt;</span>
            <span className="neon-cyan">VECTOR</span>
          </div>
        </div>

        {/* Subtitle with typing effect */}
        <div className="text-xs text-secondary/80 mb-2 flex items-center gap-2">
          <span className="text-primary/40">$</span>
          <span className="uppercase tracking-wide">AI Security Terminal</span>
          <span className="terminal-cursor" />
        </div>

        {/* System status indicators */}
        <div className="flex gap-3 text-[10px] font-mono mt-1">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 5px hsl(var(--terminal-green))' }}
            />
            <span className="text-primary/60">ONLINE</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-primary/40">|</span>
            <span className="text-secondary/60">98 SYSTEMS</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-primary/40">|</span>
            <span className="text-accent/60">5 VECTORS</span>
          </div>
        </div>

        {/* Matrix-style data stream */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
      </div>

      {/* Corner brackets for cyberpunk effect */}
      <div className="absolute -top-1 -left-1 text-primary text-2xl font-mono leading-none opacity-60">╔</div>
      <div className="absolute -top-1 -right-1 text-primary text-2xl font-mono leading-none opacity-60">╗</div>
      <div className="absolute -bottom-1 -left-1 text-primary text-2xl font-mono leading-none opacity-60">╚</div>
      <div className="absolute -bottom-1 -right-1 text-primary text-2xl font-mono leading-none opacity-60">╝</div>
    </div>
  );
}

/**
 * ASCII Art Logo - for special displays
 */
export function ASCIILogo({ className = '' }: { className?: string }) {
  return (
    <pre className={`ascii-art ${className}`} role="img" aria-label="TrustVector - AI Security Assurance Framework">
{`╔════════════════════════════════════════╗
║  ▀█▀ █▀▀█ █  █ █▀▀█ ▀█▀   █   █ █▀▀  ║
║   █  █▄▄▀ █  █ ▀▀▀▄  █   ▀█▀  █ █▀▀  ║
║   ▀  ▀ ▀▀ ▀▀▀▀ ▀▀▀▀  ▀    ▀   ▀ ▀▀▀  ║
║                                        ║
║  ▀█  █▀ █▀▀ █▀▀ ▀█▀ █▀▀█ █▀▀█ ║
║   █  █  █▀▀ █    █  █  █ █▄▄▀ ║
║   ▀▄▄▀  ▀▀▀ ▀▀▀  ▀  ▀▀▀▀ ▀ ▀▀ ║
║                                        ║
║  > AI SECURITY ASSURANCE FRAMEWORK     ║
╚════════════════════════════════════════╝`}
    </pre>
  );
}
