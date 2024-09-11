{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "jest": true     // Jest用の環境設定
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",   // Jestの推奨設定
    "plugin:playwright/recommended"  // Playwrightの推奨設定
  ],
  "parserOptions": {
    "ecmaVersion": 12,  // ECMAScript 2021
    "sourceType": "module"
  },
  "rules": {
    // 必要に応じてカスタムルールを追加
  }
}