import type { CSSProperties } from "react";

// Shared toast style constants used across the app.
// These mirror the inline style objects used previously and are exported
// so components can import them and keep toast styling consistent.

export const toastDestructiveStyle: CSSProperties = {
  "--normal-bg":
    "light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))",
  "--normal-text": "var(--color-white)",
  "--normal-border": "transparent",
} as CSSProperties;

export const toastSuccessStyle: CSSProperties = {
  "--normal-bg": "light-dark(var(--color-green-600), var(--color-green-400))",
  "--normal-text": "var(--color-white)",
  "--normal-border": "light-dark(var(--color-green-600), var(--color-green-400))",
} as CSSProperties;

export default {
  toastDestructiveStyle,
  toastSuccessStyle,
};
