import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f7f4",
        foreground: "#202124",
        panel: "#ffffff",
        border: "#deded6",
        muted: "#666d70",
        accent: "#0f766e"
      }
    }
  },
  plugins: []
};

export default config;
