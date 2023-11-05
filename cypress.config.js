const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      GITHUB_TOKEN: "YOUR ACCESS TOKEN",
      API_BASE_URL: "https://api.github.com",
    },
  },
});
