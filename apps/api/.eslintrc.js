module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // 1. Check for unused variables
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
      },
    ],

    // 2. Prevent using variables before they are defined
    "no-use-before-define": "error",

    // 3. Import Validation
    "import/no-unresolved": "error", // Errors if you import a file that doesn't exist
    "import/named": "error", // Errors if you import a specific name that isn't exported
    "import/namespace": "error",
    "import/default": "error",
    "import/export": "error",

    // 4. Force best practices
    "no-console": "warn", // Warns when console.log is left in code
    eqeqeq: ["error", "always"], // Forces === instead of ==
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"],
      },
    },
  },
};
