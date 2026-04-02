import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: {
          50: "#fdf5f0",
          100: "#fbe8dc",
          200: "#f6cdb8",
          300: "#f0ab8a",
          400: "#d4845e",
          DEFAULT: "#C4704B",
          500: "#C4704B",
          600: "#b0623f",
          700: "#9a5236",
          800: "#7d422c",
          900: "#6a3826",
        },
      },
    },
  },
  plugins: [],
};
export default config;
