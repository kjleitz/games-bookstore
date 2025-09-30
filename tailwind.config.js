/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        surfaceMuted: "var(--color-surface-muted)",
        accent: "var(--color-accent)",
        accentMuted: "var(--color-accent-muted)",
        textPrimary: "var(--color-text-primary)",
        textSecondary: "var(--color-text-secondary)",
        border: "var(--color-border)",
        danger: "var(--color-danger)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
      },
      fontFamily: {
        mono: ["var(--font-monospace)", "monospace"],
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 32px 0 var(--color-accent-muted)",
      },
      borderRadius: {
        chrome: "var(--radius-chrome)",
        panel: "var(--radius-panel)",
      },
      spacing: {
        chrome: "var(--spacing-chrome)",
      },
    },
  },
  plugins: [],
};
