'use client';

import { useState, useMemo } from 'react';
import { getAllEntities, sortEntities, type SortOption } from '@/lib/data';
import { EntityCard } from '@/components/entity-card';
import { calculateOverallScore } from '@/framework/schema/types';

export default function HomePage() {
  const allEntities = getAllEntities();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('overall-score-desc');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Get unique providers
  const providers = useMemo(() => {
    const uniqueProviders = new Set(allEntities.map((e) => e.provider));
    return ['all', ...Array.from(uniqueProviders).sort()];
  }, [allEntities]);

  // Filter and sort entities
  const filteredEntities = useMemo(() => {
    let results = allEntities;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (entity) =>
          entity.name.toLowerCase().includes(query) ||
          entity.provider.toLowerCase().includes(query) ||
          entity.description.toLowerCase().includes(query) ||
          entity.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedProvider !== 'all') {
      results = results.filter((entity) => entity.provider === selectedProvider);
    }

    if (selectedType !== 'all') {
      results = results.filter((entity) => entity.type === selectedType);
    }

    return sortEntities(results, sortBy);
  }, [allEntities, searchQuery, selectedProvider, selectedType, sortBy]);

  // Calculate stats
  const stats = useMemo(() => {
    const avgScore =
      filteredEntities.reduce((sum, entity) => sum + calculateOverallScore(entity), 0) /
      filteredEntities.length;

    return {
      total: filteredEntities.length,
      avgScore: Math.round(avgScore),
    };
  }, [filteredEntities]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Hero Section - Clean Header */}
      <section className="relative border-b-2 border-[#00ff41]/30">
        <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Simple Logo Text */}
            <div className="text-center mb-4">
              <div className="inline-block px-4 py-2 border border-[#00ff41]/50 bg-[#00ff41]/5">
                <span className="text-[#00ff41] font-mono text-xs uppercase tracking-widest">Open-Source AI Security Framework</span>
              </div>
            </div>

            {/* Main Heading - Simplified */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-mono font-black text-center mb-6 uppercase tracking-tight">
              <span className="text-white">TRUST</span>
              <span className="text-[#00ff41]">VECTOR</span>
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl text-gray-400 text-center font-mono mb-12 tracking-wide">
              Evidence-Based AI Security Assessments
            </p>

            {/* Description - More Readable */}
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed text-center mb-12" style={{ lineHeight: '1.8' }}>
              Comprehensive trust evaluations of <span className="text-[#00ff41] font-semibold">{allEntities.length} AI systems</span> across{' '}
              <span className="text-cyan-400 font-semibold">5 security dimensions</span> — covering models, MCPs, and agents with evidence-backed analysis.
            </p>

            {/* Trust Dimensions - Simplified */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm">
              {['Performance', 'Security', 'Privacy', 'Trust', 'Operations'].map((dim) => (
                <div
                  key={dim}
                  className="px-4 py-2 border border-gray-600 bg-gray-900/50 text-gray-300 font-mono uppercase tracking-wide"
                >
                  {dim}
                </div>
              ))}
            </div>

            {/* CTA Buttons - Simplified */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#models"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-[#00ff41] text-black hover:bg-[#00dd35] transition-colors duration-200"
              >
                Explore Evaluations
              </a>
              <a
                href="https://github.com/JBAhire/trust-vector"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold border-2 border-gray-600 text-gray-300 hover:border-[#00ff41] hover:text-[#00ff41] transition-colors duration-200"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* System Stats */}
      <section className="border-b border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Stat 1 */}
            <div className="text-center p-8 bg-gray-900 border border-gray-800">
              <div className="text-sm text-gray-400 mb-2 uppercase tracking-wide">Systems Evaluated</div>
              <div className="text-5xl font-bold text-[#00ff41] mb-2">
                {stats.total}
              </div>
              <div className="text-sm text-gray-500">AI Entities</div>
            </div>

            {/* Stat 2 */}
            <div className="text-center p-8 bg-gray-900 border border-gray-800">
              <div className="text-sm text-gray-400 mb-2 uppercase tracking-wide">Average Trust Score</div>
              <div className="text-5xl font-bold text-[#00ff41] mb-2">
                {stats.avgScore}
              </div>
              <div className="text-sm text-gray-500">Out of 100</div>
            </div>

            {/* Stat 3 */}
            <div className="text-center p-8 bg-gray-900 border border-gray-800">
              <div className="text-sm text-gray-400 mb-2 uppercase tracking-wide">Security Dimensions</div>
              <div className="text-5xl font-bold text-[#00ff41] mb-2">
                5
              </div>
              <div className="text-sm text-gray-500">Trust Vectors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="models" className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-gray-950 border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-gray-200 mb-6">Filter & Search</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Search by name, provider, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#00ff41] transition-colors"
                />
              </div>

              {/* Type Filter */}
              <div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-[#00ff41] transition-colors cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="model">Models</option>
                  <option value="agent">Agents</option>
                  <option value="mcp">MCPs</option>
                </select>
              </div>

              {/* Provider Filter */}
              <div>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-200 focus:outline-none focus:border-[#00ff41] transition-colors cursor-pointer"
                >
                  {providers.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider === 'all' ? 'All Providers' : provider}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort and Results Info */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800 pt-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Showing</span>
                <span className="font-semibold text-[#00ff41]">{filteredEntities.length}</span>
                <span className="text-gray-400 text-sm">
                  {filteredEntities.length === 1 ? 'result' : 'results'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-400">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-2 bg-gray-900 border border-gray-700 text-gray-200 text-sm focus:outline-none focus:border-[#00ff41] transition-colors cursor-pointer"
                >
                  <option value="overall-score-desc">Highest Score</option>
                  <option value="overall-score-asc">Lowest Score</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="date-desc">Recently Updated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Entity Grid */}
        {filteredEntities.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg mb-2">No results found</div>
            <div className="text-gray-500 text-sm">Try adjusting your search or filters</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredEntities.map((entity) => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </div>
        )}

      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 255, 65, 0.05) 50%
          );
          background-size: 100% 4px;
          animation: scanline 8s linear infinite;
        }

        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }

        .glitch-overlay {
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 255, 65, 0.03) 0px,
            transparent 2px,
            transparent 4px,
            rgba(0, 255, 65, 0.03) 4px
          );
        }

        .terminal-glow {
          text-shadow:
            0 0 10px currentColor,
            0 0 20px currentColor,
            0 0 30px currentColor;
        }

        .terminal-window {
          position: relative;
        }

        .terminal-window::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: inherit;
          filter: blur(10px);
          opacity: 0.5;
          z-index: -1;
        }

        .glitch-text {
          position: relative;
          animation: glitch 3s infinite;
        }

        @keyframes glitch {
          0%, 90%, 100% {
            transform: translate(0);
          }
          92% {
            transform: translate(-2px, 2px);
          }
          94% {
            transform: translate(2px, -2px);
          }
          96% {
            transform: translate(-2px, -2px);
          }
          98% {
            transform: translate(2px, 2px);
          }
        }

        .glitch-number {
          animation: glitch-number 5s infinite;
        }

        @keyframes glitch-number {
          0%, 95%, 100% {
            opacity: 1;
          }
          96% {
            opacity: 0.8;
          }
          97% {
            opacity: 1;
          }
          98% {
            opacity: 0.9;
          }
        }

        @keyframes matrix-fall {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .matrix-rain > div {
          animation: matrix-fall 20s linear infinite;
        }

        @keyframes grid-flow {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }

        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #000;
          border-left: 2px solid #00ff41;
        }

        ::-webkit-scrollbar-thumb {
          background: #00ff41;
          box-shadow: 0 0 10px #00ff41;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #00ff41;
          box-shadow: 0 0 20px #00ff41;
        }
      `}</style>
    </div>
  );
}
