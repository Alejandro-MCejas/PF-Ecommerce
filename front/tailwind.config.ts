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
        background: "var(--background)",
        foreground: "var(--foreground)",
        backgroundLayout: '#232323'
      },
      boxShadow: {
        'custom-blue': '0px 15px 20px 0px rgba(32, 63, 230, 0.8)',
        'custom-blue-hover': '0px 20px 30px 2px rgba(32, 63, 230, 0.8)',
      },
      translate: {
        '-5': '-5px', // Para la clase hover
      },
      fontFamily: {
        'tilt-neon': ['Tilt Neon', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
