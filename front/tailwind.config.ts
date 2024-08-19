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
        "white": "#fcfcfc",
        "gray1": "#a9acc0",
        "gray2": "#767ca3",
        "darkblue1": "#002a62",
        "darkblue2": "#0e1346",
        "lightblue1": "#137eff",
        "lightblue2": "#1c489f",
        "lightviolet": "#50497e",
        "darkviolet": "#313164",
      },
    },
  },
  plugins: [],
};
export default config;
