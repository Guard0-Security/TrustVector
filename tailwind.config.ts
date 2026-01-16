import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Terminal colors
        terminal: {
          green: 'hsl(var(--terminal-green))',
          cyan: 'hsl(var(--terminal-cyan))',
          red: 'hsl(var(--terminal-red))',
          yellow: 'hsl(var(--terminal-yellow))',
          magenta: 'hsl(var(--terminal-magenta))',
          blue: 'hsl(var(--terminal-blue))',
        },
        // Trust score colors - cyberpunk themed
        // NOTE: Source of truth is SCORE_COLORS in framework/schema/types.ts
        // These are duplicated here for Tailwind class usage (e.g., bg-score-exceptional)
        score: {
          exceptional: '#00ff41', // Matrix green
          strong: '#00d9ff',      // Electric cyan
          adequate: '#ffdd00',    // Terminal yellow
          concerning: '#ff6b35',  // Warning orange
          poor: '#ff006e',        // Neon magenta
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        mono: ['Courier New', 'Consolas', 'Monaco', 'Lucida Console', 'monospace'],
        terminal: ['Courier New', 'Consolas', 'Monaco', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'glitch': 'glitch 1s infinite',
        'scan': 'scan 8s linear infinite',
        'typing': 'typing 3.5s steps(40) 1s forwards',
        'blink': 'blink 1s infinite',
        'flicker': 'flicker 0.15s infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'data-stream': 'data-stream 20s linear infinite',
      },
      boxShadow: {
        'neon-green': '0 0 20px hsl(var(--terminal-green)), 0 0 40px hsl(var(--terminal-green) / 0.5)',
        'neon-cyan': '0 0 20px hsl(var(--terminal-cyan)), 0 0 40px hsl(var(--terminal-cyan) / 0.5)',
        'neon-red': '0 0 20px hsl(var(--terminal-red)), 0 0 40px hsl(var(--terminal-red) / 0.5)',
        'terminal': '0 0 20px hsl(var(--terminal-green) / 0.1), inset 0 0 60px hsl(var(--terminal-green) / 0.02)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
