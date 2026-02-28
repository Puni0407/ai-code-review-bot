module.exports = [
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "report.json"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
    },
    rules: {
      "no-var": "warn",
      eqeqeq: ["warn", "always"],
      "no-unused-vars": "warn",
    },
  },
];