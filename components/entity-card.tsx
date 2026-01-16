'use client';

import { TrustVectorEntity, calculateOverallScore, getScoreColor } from '@/framework/schema/types';
import { truncate } from '@/lib/utils';

interface EntityCardProps {
  entity: TrustVectorEntity;
}

// ASCII progress bar generator
function generateASCIIBar(score: number, length: number = 10): string {
  const filled = Math.round((score / 100) * length);
  return '█'.repeat(filled) + '░'.repeat(length - filled);
}

// Get terminal color based on score
function getTerminalColor(score: number): string {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-cyan-400';
  if (score >= 40) return 'text-yellow-400';
  return 'text-red-400';
}

// Get glow color based on score
function getGlowColor(score: number): string {
  if (score >= 80) return 'shadow-[0_0_20px_rgba(34,197,94,0.5)]';
  if (score >= 60) return 'shadow-[0_0_20px_rgba(34,211,238,0.5)]';
  if (score >= 40) return 'shadow-[0_0_20px_rgba(234,179,8,0.5)]';
  return 'shadow-[0_0_20px_rgba(239,68,68,0.5)]';
}

export function EntityCard({ entity }: EntityCardProps) {
  const overallScore = calculateOverallScore(entity);
  const { trust_vector } = entity;

  const dimensionScores = [
    {
      name: 'PERFORMANCE',
      ascii: 'PERF',
      score: trust_vector.performance_reliability.overall_score,
      symbol: '⚡'
    },
    {
      name: 'SECURITY',
      ascii: 'SECR',
      score: trust_vector.security.overall_score,
      symbol: '🛡'
    },
    {
      name: 'PRIVACY',
      ascii: 'PRIV',
      score: trust_vector.privacy_compliance.overall_score,
      symbol: '🔒'
    },
    {
      name: 'TRUST',
      ascii: 'TRST',
      score: trust_vector.trust_transparency.overall_score,
      symbol: '👁'
    },
    {
      name: 'OPERATIONS',
      ascii: 'OPRT',
      score: trust_vector.operational_excellence.overall_score,
      symbol: '⚙'
    },
  ];

  return (
    <a
      href={`/${entity.type}s/${entity.id}`}
      className="group block relative"
      aria-label={`${entity.name} by ${entity.provider} - Trust Score: ${overallScore} out of 100. Click to view full assessment.`}
    >
      {/* Outer glow effect on hover - terminal green */}
      <div className="absolute -inset-1 bg-green-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse" aria-hidden="true" />

      {/* Additional cyan glow */}
      <div className="absolute -inset-1 bg-cyan-500/10 rounded-lg blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" aria-hidden="true" />

      {/* Terminal Window */}
      <div className="relative h-full rounded-lg border-2 border-green-500/50 bg-black/95 backdrop-blur-sm hover:border-green-400 transition-all duration-300 group-hover:translate-y-[-4px] overflow-hidden font-mono">

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent animate-[scan_8s_linear_infinite]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(34,197,94,0.03)_2px,rgba(34,197,94,0.03)_4px)]" />
        </div>

        {/* CRT screen curve effect */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-radial from-transparent via-transparent to-black/30" aria-hidden="true" />

        {/* Glitch effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75 pointer-events-none z-20" aria-hidden="true">
          <div className="absolute inset-0 bg-green-500/5 group-hover:animate-[glitch_0.3s_infinite]" />
        </div>

        {/* Terminal Header */}
        <div className="relative z-20 flex items-center justify-between px-4 py-2 bg-green-950/40 border-b border-green-500/30">
          <div className="flex items-center gap-2">
            {/* Window control dots */}
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] group-hover:animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] group-hover:animate-pulse" />
            </div>
            <span className="text-green-400 text-xs ml-2 tracking-wider">TRUST_ASSESSMENT.exe</span>
          </div>
          <div className="text-green-500/60 text-xs flex items-center gap-2">
            <span className="animate-pulse">●</span>
            <span>LIVE</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="relative z-20 p-4 space-y-3">

          {/* System Header */}
          <div className="border-b border-green-500/20 pb-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="text-green-400 text-xs mb-1 tracking-widest">
                  ┌─ ENTITY IDENTIFICATION ─────────────────────┐
                </div>
                <div className="text-green-300 font-bold text-lg tracking-wide group-hover:text-green-200 transition-colors uppercase">
                  {entity.name}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-cyan-400 bg-cyan-950/50 px-2 py-0.5 border border-cyan-500/30 rounded">
                    [{entity.provider.toUpperCase()}]
                  </span>
                  <span className="text-purple-400 bg-purple-950/50 px-2 py-0.5 border border-purple-500/30 rounded">
                    [{entity.type.toUpperCase()}]
                  </span>
                  <span className="text-green-500/60">v{entity.version}</span>
                </div>
              </div>

              {/* Overall Trust Score */}
              <div className="text-right" role="meter" aria-label={`Trust score: ${overallScore} out of 100`} aria-valuenow={overallScore} aria-valuemin={0} aria-valuemax={100}>
                <div className="text-green-500/60 text-[10px] tracking-widest mb-1" aria-hidden="true">TRUST_SCORE</div>
                <div className={`text-3xl font-bold ${getTerminalColor(overallScore)} ${getGlowColor(overallScore)} transition-all`}>
                  {overallScore}
                </div>
                <div className="text-green-500/40 text-xs" aria-hidden="true">/100</div>
              </div>
            </div>
          </div>

          {/* Description - Terminal style */}
          <div className="text-green-400/80 text-xs leading-relaxed font-light">
            <span className="text-green-500/60">{'> '}</span>
            {truncate(entity.description, 120)}
          </div>

          {/* Dimension Scores - Terminal Output */}
          <div className="space-y-1.5 py-2">
            <div className="text-green-500/60 text-[10px] tracking-widest mb-2">
              ├─ THREAT VECTOR ANALYSIS ────────────────────────
            </div>
            {dimensionScores.map((dim, index) => (
              <div key={dim.name} className="group/line hover:bg-green-950/30 transition-colors px-2 py-1 rounded">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-green-600/60 font-bold w-10">[{dim.ascii}]</span>
                    <span className="text-green-500/70 group-hover/line:text-green-400 transition-colors">
                      {dim.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`${getTerminalColor(dim.score)} font-bold tabular-nums`}>
                      {dim.score.toString().padStart(3, ' ')}/100
                    </span>
                    <span className={`${getTerminalColor(dim.score)} tracking-tighter text-base`}>
                      {generateASCIIBar(dim.score)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags - Terminal style */}
          {entity.tags && entity.tags.length > 0 && (
            <div className="border-t border-green-500/20 pt-3">
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-green-500/60 text-[10px] tracking-widest">TAGS:</span>
                {entity.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-green-400 bg-green-950/40 px-2 py-0.5 text-[10px] border border-green-500/30 rounded tracking-wide hover:border-green-400 hover:bg-green-950/60 transition-all"
                  >
                    #{tag.toUpperCase()}
                  </span>
                ))}
                {entity.tags.length > 3 && (
                  <span className="text-green-500/60 text-[10px]">
                    +{entity.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action prompt */}
          <div className="border-t border-green-500/20 pt-3 flex items-center justify-between">
            <div className="text-green-500/60 text-xs">
              <span className="animate-[blink_1s_infinite]">▋</span>
            </div>
            <div className="text-green-400 text-xs tracking-wider group-hover:text-cyan-400 transition-colors flex items-center gap-2">
              <span>ACCESS_FULL_REPORT</span>
              <span className="text-green-500 group-hover:translate-x-1 transition-transform">&gt;&gt;</span>
            </div>
          </div>

        </div>

        {/* Screen flicker effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-gradient-to-b from-green-500/5 via-transparent to-green-500/5 animate-[flicker_0.15s_infinite]" aria-hidden="true" />

      </div>

      {/* Add keyframe animations to global styles */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        @keyframes flicker {
          0% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            opacity: 0.1;
          }
        }
        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }
      `}</style>
    </a>
  );
}
