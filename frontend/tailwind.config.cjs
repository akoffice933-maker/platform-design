const preset = require('../tokens/tailwind.config.preset.js');

module.exports = {
  presets: [preset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
};
