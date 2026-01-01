import { type Config } from "prettier";

const config: Config = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: true,
  singleQuote: false,
  printWidth: 100, // Maximum line length
  bracketSpacing: true,
  arrowParens: "always",
  bracketSameLine: true,
};

export default config;