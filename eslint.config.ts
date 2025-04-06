import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

const ignores = ["node_modules/**", ".output/**", ".wxt/**"];

// @see https://eslint.org/docs/latest/use/configure/configuration-files-new
// @see https://typescript-eslint.io/users/configs
const config = tseslint.config(
  { ignores },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires parserServices to be generated. You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
  // ...tseslint.configs.recommendedTypeChecked,
  prettierConfig,
);

export default config;
