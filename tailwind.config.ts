import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep herbal green, fresh leaf green, mint, cream
        herbal: {
          50: "#f0f7f1",
          100: "#dcecde",
          200: "#bbd9c0",
          300: "#8fbf98",
          400: "#5e9e6c",
          500: "#48915c",
          600: "#3c6f45",
          700: "#2e5636",
          800: "#1f432a",
          900: "#163a22",
          950: "#0b2114",
        },
        leaf: {
          50: "#f3faeb",
          100: "#e3f3d0",
          200: "#c8e8a6",
          300: "#a3d86f",
          400: "#7fc348",
          500: "#5fa52f",
          600: "#4a8322",
          700: "#39631d",
          800: "#2f4f1c",
          900: "#29431b",
        },
        mint: {
          50: "#f1faf6",
          100: "#e6f6ef",
          200: "#cdecdd",
        },
        // Vibrant herbal-spice orange — the lead packaging colour
        spice: {
          50: "#fff7ed",
          100: "#ffecd6",
          200: "#fdd7ab",
          300: "#fbba75",
          400: "#f8933d",
          500: "#f2731a",
          600: "#e35a0f",
          700: "#bc4310",
          800: "#953615",
          900: "#782e14",
        },
        clay: {
          300: "#d08a63",
          400: "#c0683c",
          500: "#a8532c",
          600: "#8a4122",
          700: "#6d331c",
        },
        // Brass / gold — thin premium line & emblem accents
        brass: {
          200: "#e7d4a8",
          300: "#d8bd87",
          400: "#c9a86a",
          500: "#b8924f",
          600: "#9a7638",
        },
        cream: {
          50: "#fdfbf4",
          100: "#faf4e4",
          200: "#f4e8cf",
          300: "#ecd9b2",
        },
        ink: {
          DEFAULT: "#14281d",
          soft: "#3c4b40",
          muted: "#6b7a6f",
        },
        navy: "#17365a",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(22, 58, 34, 0.18)",
        card: "0 4px 24px -8px rgba(22, 58, 34, 0.14)",
        glow: "0 20px 60px -20px rgba(46, 105, 61, 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
      },
      backgroundImage: {
        "mint-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(127,195,72,0.12) 0%, rgba(255,255,255,0) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
