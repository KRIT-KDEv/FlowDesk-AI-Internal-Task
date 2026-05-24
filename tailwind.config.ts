import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(0.975 0.006 190)",
        foreground: "oklch(0.22 0.012 240)",
        panel: "oklch(0.995 0.004 190)",
        border: "oklch(0.89 0.01 220)",
        muted: "oklch(0.47 0.018 230)",
        accent: "oklch(0.48 0.09 180)",
        "accent-soft": "oklch(0.94 0.03 180)",
        danger: "oklch(0.52 0.145 25)",
        "danger-soft": "oklch(0.95 0.035 25)",
        warning: "oklch(0.62 0.12 75)",
        "warning-soft": "oklch(0.96 0.04 80)",
        success: "oklch(0.5 0.095 145)",
        "success-soft": "oklch(0.94 0.035 145)"
      }
    }
  },
  plugins: []
};

export default config;
