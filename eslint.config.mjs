import js from "@eslint/js";
import next from "eslint-plugin-next";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  next.configs.recommended,
  prettier,
  {
    ignores: ["node_modules", "public", ".next"],
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"], // Make sure it applies to all files
    rules: {
      "prettier/prettier": "error",
    },
  },
];
