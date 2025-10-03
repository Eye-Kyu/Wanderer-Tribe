/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          '100': '#f5f5f5',
          '200': '#e5e5e5',
          '300': '#d4d4d4',
          '400': '#a3a3a3',
          '500': '#737373',
          '600': '#525252',
          '700': '#404040',
          '800': '#262626',
          '900': '#171717'
        },

        beige: '#f5f5dc',
        textDark: '#333333',

        // 🎨 Wanderer Tribe Palette
        wanderer: {
          green: "#036648",     // Dark Green
          teal: "#3891A6",      // Teal Blue
          yellow: "#FDE74C",    // Yellow
          plum: "#361D2E",      // Deep Plum
          rust: "#D56F3E",      // Rust Orange
        },

        // Existing system colors (can map to Wanderer palette if desired)
        primary: {
          DEFAULT: '#3891A6',          // Teal Blue as primary
          foreground: '#ffffff'
        },
        secondary: {
          DEFAULT: '#D56F3E',          // Rust Orange as secondary
          foreground: '#ffffff'
        },
        accent: {
          DEFAULT: '#FDE74C',          // Yellow as accent
          foreground: '#036648'        // Dark Green for contrast
        },
        background: '#ffffff',
        foreground: '#091E05',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#091E05'
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#091E05'
        },
        muted: {
          DEFAULT: '#f5f5f5',
          foreground: '#737373'
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff'
        },
        border: '#e5e5e5',
        input: '#e5e5e5',
        ring: '#3891A6',

        chart: {
          '1': '#3891A6',
          '2': '#D56F3E',
          '3': '#FDE74C',
          '4': '#361D2E',
          '5': '#091E05',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
