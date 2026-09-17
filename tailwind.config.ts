import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#0A0A0B",
          surface: "#131315",
          raised: "#1B1B1E",
          line: "#2A2A2E",
        },
        hazard: {
          DEFAULT: "#F5C400",
          dim: "#8C7100",
        },
        blowtorch: {
          DEFAULT: "#FF5A1F",
          dim: "#8F3110",
        },
        riot: {
          DEFAULT: "#F53091",
          dim: "#7A0E40",
        },
        paper: {
          DEFAULT: "#EDEDEA",
          muted: "#A6A6A2",
          faint: "#8A8882",
        },
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        data: ["var(--font-space-mono)", "monospace"],
        stencil: ["var(--font-stardos)", "monospace"],
      },
      letterSpacing: {
        label: "0.18em",
        wordmark: "0.14em",
      },
      keyframes: {
        "flip-down": {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(-90deg)" },
          "51%": { transform: "rotateX(90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
        "pulse-spike": {
          "0%": { boxShadow: "0 0 0 0 rgba(245,196,0,0.55)" },
          "40%": { boxShadow: "0 0 0 10px rgba(245,196,0,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(245,196,0,0)" },
        },
        "stencil-flash": {
          "0%": { opacity: "0", filter: "brightness(2)" },
          "8%": { opacity: "1", filter: "brightness(1.4)" },
          "14%": { opacity: "0.85", filter: "brightness(1)" },
          "20%": { opacity: "1" },
          "30%": { opacity: "0.9" },
          "100%": { opacity: "1", filter: "brightness(1)" },
        },
        "laser-trace": {
          "0%": { strokeDashoffset: "240" },
          "100%": { strokeDashoffset: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ring-tick": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "pulse-spike": "pulse-spike 0.6s ease-out",
        "stencil-flash": "stencil-flash 1.1s ease-out forwards",
        marquee: "marquee 32s linear infinite",
        "ring-tick": "ring-tick 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
