/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        excel: {
          green: '#107c41',
          darkgreen: '#0b5c30',
          lightgreen: '#e8f5e9',
          border: '#e1dfdd',
          header: '#f3f2f1',
          selected: '#e2f0d9',
        },
        quest: {
          dark: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          primary: '#10b981',
          gold: '#f59e0b',
          purple: '#8b5cf6',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        mono: ['"Cascadia Code"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'bounce-subtle': 'bounce 2s infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
