import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // Port-as-is overrides.
    //
    // These rules surface real issues we'll address in the dedicated
    // issues-fix pass after the port (see memory: project-sjs-phase-status).
    // Keeping them at "warn" lets the lint pass while leaving every
    // occurrence visible for cleanup later.
    rules: {
      // Most `any` types in this codebase come from the Vite original
      // (where TS strictness was lower). They're flagged in issue #1
      // of the 13-issue audit. Will be properly typed during issues-fix.
      "@typescript-eslint/no-explicit-any": "warn",

      // ~~Pre-existing pattern in profile / settings pages.~~ Resolved
      // during Phase B.1 issue 0a: split each affected page into outer
      // (loading guard) + inner (form with state initialized from props
      // directly). Rule is back to "error" so the pattern can't regress.
      "react-hooks/set-state-in-effect": "error",
    },
  },
]);

export default eslintConfig;
