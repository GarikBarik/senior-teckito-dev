const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight:	900,
  viewportWidth:	1440,
  e2e: {
    baseUrl: 'https://senor-tickito-staging.newfolder2.dev/login',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*']
  },
})