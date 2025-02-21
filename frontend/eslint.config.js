// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.(app|spec).json"]
      }
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.all,
      ...tseslint.configs.stylistic,
      ...tseslint.configs.strictTypeCheckedOnly,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/class-methods-use-this": "off",
      "@typescript-eslint/init-declarations": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/parameter-properties": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/member-ordering": "off",
      "@typescript-eslint/method-signature-style": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "semi": ["error", "always"],
      "@typescript-eslint/no-extraneous-class": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/array-type": "off",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
