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
          '900': '#171717',
        },

        beige: '#f5f5dc',
        textDark: '#333333',

        // 🎨 African Heritage Wanderer Palette
        wanderer: {
          forest: "#254D32",     // Deep forest green (brand foundation)
          moss: "#3C6E47",       // Soft moss green (secondary tone)
          bronze: "#9A6B4F",     // Earthy bronze accent
          gold: "#CDA869",       // Warm cultural gold highlight
          ivory: "#F5E5C0",      // Soft ivory (text/contrast)
          rust: "#D56F3E",       // Vibrant Rust Orange (kept as main accent)
          mahogany: "#2C1810",   // Deep brown for backgrounds/footers
        },

        // 🌍 System colors mapped to the Wanderer palette
        primary: {
          DEFAULT: '#254D32',          // Forest Green — main brand tone
          foreground: '#F5E5C0',       // Ivory for text
        },
        secondary: {
          DEFAULT: '#D56F3E',          // Rust Orange (warm accent)
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#CDA869',          // Warm Gold — luxurious highlight
          foreground: '#2C1810',       // Mahogany for text contrast
        },
        background: '#2C1810',         // Deep Mahogany background
        foreground: '#F5E5C0',         // Ivory for readability

        card: {
          DEFAULT: '#3C6E47',          // Moss green base
          foreground: '#F5E5C0',       // Ivory text
        },
        popover: {
          DEFAULT: '#3C6E47',
          foreground: '#F5E5C0',
        },
        muted: {
          DEFAULT: '#9A6B4F',
          foreground: '#F5E5C0',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        border: '#9A6B4F',             // Subtle bronze border tone
        input: '#9A6B4F',
        ring: '#CDA869',               // Gold accent for focus states

        // 📊 Chart Colors (optional)
        chart: {
          '1': '#254D32',  // forest
          '2': '#D56F3E',  // rust
          '3': '#CDA869',  // gold
          '4': '#9A6B4F',  // bronze
          '5': '#3C6E47',  // moss
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
