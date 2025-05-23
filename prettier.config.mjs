/** @typedef {import('prettier').Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
  singleQuote: true,
  tabWidth: 2,
  printWidth: 160,
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  trailingComma: 'all',
  endOfLine: 'auto',
  semi: false,
  singleAttributePerLine: true,
  embeddedLanguageFormatting: 'auto',
  importOrder: ['./src/*'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

export default config
