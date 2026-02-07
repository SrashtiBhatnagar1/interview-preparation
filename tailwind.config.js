/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: "hsl(var(--card) / <alpha-value>)",
        "card-foreground": "hsl(var(--card-foreground) / <alpha-value>)",
        popover: "hsl(var(--popover) / <alpha-value>)",
        "popover-foreground": "hsl(var(--popover-foreground) / <alpha-value>)",
        primary: "#2563eb",
        "primary-foreground": "#ffffff",
        secondary: "#e5e7eb",
        "secondary-foreground": "#1f2937",
        destructive: "hsl(var(--destructive) / <alpha-value>)",
        "destructive-foreground": "hsl(var(--destructive-foreground) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-foreground": "hsl(var(--muted-foreground) / <alpha-value>)",
        accent: "#2563eb",
        "accent-foreground": "#ffffff",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
