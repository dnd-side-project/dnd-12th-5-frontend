import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        gray: {
          50: "#fbfcff",
          100: "#f3f4f8",
          200: "#d2d4da",
          300: "#b3b5bd",
          400: "#9496a1",
          500: "#777986",
          600: "#5b5d6b",
          700: "#404252",
          800: "#282a3a",
          900: "#0f0f10",
        },
        coral: {
          50: "#ffefef",
          100: "#ffcfcf",
          200: "#ffb7b7",
          300: "#ff9696",
          400: "#ff8282",
          500: "#ff6363",
          600: "#e85a5a",
          700: "#b54646",
          800: "#8c3636",
          900: "#6b2a2a",
        },
        pink: {
          50: "#fff2f7",
          100: "#ffd8e6",
          200: "#ffc5d9",
          300: "#ffaac8",
          400: "#ff99bd",
          500: "#ff80ad",
          600: "#e8749d",
          700: "#b55b7b",
          800: "#8c465f",
          900: "#6b3649",
        },
        skyblue: {
          50: "#f1faff",
          100: "#d2f0ff",
          200: "#bce8ff",
          300: "#9edeff",
          400: "#8bd8ff",
          500: "#6eceff",
          600: "#64bbe8",
          700: "#4e92b5",
          800: "#3d718c",
          900: "#2e576b",
        },
        yellow: {
          50: "#fffae6",
          100: "#fff0b0",
          200: "#ffe88a",
          300: "#ffde54",
          400: "#ffd733",
          500: "#ffcd00",
          600: "#e8bb00",
          700: "#b59200",
          800: "#8c7100",
          900: "#6b5600",
        },
        symantic: {
          negative: "#ff564a",
          notice: "#ff8f4a",
          positive: "#00b466",
          informative: "#4a9dff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        pretendard: "var(--font-pretendard)",
        nanum: "var(--font-nanum-square-round)",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
