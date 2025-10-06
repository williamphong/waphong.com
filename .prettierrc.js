import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions;

module.exports = {
  trailingComma: 'es5',
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
};
