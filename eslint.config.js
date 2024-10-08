// @ ts-check

import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import html from "eslint-plugin-html";
import globals from "globals";
import tseslint from "typescript-eslint";

const ignores = [
  "node_modules/**",
  "dist/**",
  "build/**",
  "coverage/**",
  "watch.js",
  // generated from rollup
  "utils/**/*.js",
];

// @see https://eslint.org/docs/latest/use/configure/configuration-files-new
// @see https://typescript-eslint.io/users/configs
const config = tseslint.config(
  {
    files: ["**/*.html", "**/*.htm"],
    plugins: { html },
  },

  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.webextensions,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  { ignores },

  eslint.configs.recommended,

  {
    rules: {
      // @see https://mui.com/material-ui/guides/minimizing-bundle-size/#option-one-use-path-imports
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@mui/*/*/*"],
        },
      ],
    },
  },

  ...tseslint.configs.recommended,
  // Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
  // ...tseslint.configs.recommendedTypeChecked,

  prettierConfig,
);

export default config;
