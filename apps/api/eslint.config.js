import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // Required for ES6 imports
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // 1. Warning for unused variables
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // 2. Error for using undefined variables (catch unimported usage)
      "no-undef": "error",

      // 3. Prevent accidental console.logs in production (optional but good)
      "no-console": "off",

      // 4. Ensure imports are at the top
      "import/first": "off",
    },
  },
];
