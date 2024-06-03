const { defineConfig } = require('cypress');
const config = require('./cypress.config');

module.exports = defineConfig({
  ...config,
  projectId: 'qg6ckb',
  retries: 2,
});
