module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "perfectionist"],
  rules: {
    "no-duplicate-imports": "error",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "perfectionist/sort-imports": [
      "error",
      {
        type: "natural",
        order: "asc",
        ignoreCase: true,
        internalPattern: ["@/**"],
        newlinesBetween: "always",
        sortSideEffects: true,
        groups: [
          "react",
          ["side-effect-style", "style"],
          ["builtin", "external"],
          "component",
          "hook",
          "context",
          "app-type",
          "internal",
          ["parent", "sibling", "index"],
          "unknown",
        ],
        customGroups: {
          value: {
            react: ["react", "react-dom", "react-router-dom"],
            component: "@/**/components/**",
            context: ["@/**/contexts/**", "@/common/contexts/**"],
            hook: ["@/**/hooks/**", "@/common/hooks/**"],
            "app-type": ["@/**/types/**", "@/types/**"],
          },
          type: {
            "app-type": ["@/**/types/**", "@/types/**"],
          },
        },
      },
    ],
  },
};
