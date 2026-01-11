import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            import: importPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommendedTypeChecked.rules,
            ...tseslint.configs.stylisticTypeChecked.rules,
            "@typescript-eslint/no-explicit-any": "off",
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_", // Ignore arguments starting with underscore
                    varsIgnorePattern: "^_", // Ignore variables starting with underscore
                    caughtErrorsIgnorePattern: "^_", // Ignore caught errors starting with underscore
                },
            ],
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                        "type",
                    ],
                    "newlines-between": "always",
                },
            ],
        },
    },
]);
