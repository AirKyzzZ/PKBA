const site = require('../../tailwind.config.js')

module.exports = {
  presets: [site],
  content: ['../**/*.html'],
  corePlugins: { preflight: true },
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        cream: '#f4f2e7',
      },
      fontFamily: {
        display: ['PK Display', 'sans-serif'],
        body: ['PK Body', 'sans-serif'],
      },
    },
  },
}
