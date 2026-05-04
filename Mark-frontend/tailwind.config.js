/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1E3A8A',
        },
        accent: {
          orange: '#F97316',
        },
        success: {
          green: '#16A34A',
        },
        warning: {
          yellow: '#D97706',
        },
        danger: {
          red: '#DC2626',
        },
        info: {
          blue: '#2563EB',
        },
        neutral: {
          purple: '#7C3AED',
        },
        gray: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          600: '#4B5563',
          900: '#111827',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
