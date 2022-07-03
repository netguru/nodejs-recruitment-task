module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["@typescript-eslint/eslint-plugin", "import"],
  env: {
    node: true,
    es6: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "tsconfig.json",
  },
  rules: {
    semi: ["off"],
    quotes: ["error", "double", { allowTemplateLiterals: true, avoidEscape: false }],
    "prefer-const": "error",
    "no-console": "error",
    "comma-dangle": ["warn", "only-multiline"],
    // do not allow relative path import. only import from @app/*
    "no-restricted-imports": ["error", { patterns: ["./*", "../*"] }],
    "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/no-inferrable-types": [
      "warn",
      {
        ignoreParameters: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/no-default-export": 2,
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: [
          "variable",
          "classProperty",
          "function",
          "parameter",
          "typeProperty",
          "parameterProperty",
          "classMethod",
          "objectLiteralMethod",
          "typeMethod",
          "accessor",
          "enumMember",
        ],
        format: ["camelCase"],
      },
      {
        selector: ["class", "interface", "enum", "typeAlias"],
        format: ["PascalCase"],
      },
      {
        selector: ["typeParameter"],
        format: ["UPPER_CASE"],
      },
    ],
  },
  overrides: [
    {
      files: ["src/**/index.ts", "src/db/migration/*.ts"],
      rules: {
        "import/no-default-export": 0,
      },
    },
    {
      files: ["src/db/migration/*.ts"],
      rules: {
        // class name check disabled
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: [
              "variable",
              "classProperty",
              "function",
              "parameter",
              "typeProperty",
              "parameterProperty",
              "classMethod",
              "objectLiteralMethod",
              "typeMethod",
              "accessor",
              "enumMember",
            ],
            format: ["camelCase"],
          },
          {
            selector: ["interface", "enum", "typeAlias"],
            format: ["PascalCase"],
          },
          {
            selector: ["typeParameter"],
            format: ["UPPER_CASE"],
          },
        ],
      },
    },
  ],
  ignorePatterns: [".eslintrc.js"],
};
