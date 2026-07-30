import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#F5F6F8",
          dark: "#0B0D12",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#12151C",
        },
        ink: {
          DEFAULT: "#12151C",
          dark: "#E7E9EE",
        },
        muted: {
          DEFAULT: "#5B6172",
          dark: "#8A90A2",
        },
        line: {
          DEFAULT: "#E2E4EA",
          dark: "#242832",
        },
        brand: {
          50: "#EEF1FF",
          100: "#DCE2FF",
          200: "#B8C4FF",
          300: "#8FA0FF",
          400: "#5C74FF",
          500: "#2452FF",
          600: "#1B3FD6",
          700: "#1631A8",
          800: "#132780",
          900: "#101F5F",
        },
        signal: {
          DEFAULT: "#FFB020",
          light: "#FFD48A",
          dark: "#C97F00",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(16, 20, 30, 0.04), 0 1px 0 rgba(16, 20, 30, 0.03)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        blink: "blink 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
