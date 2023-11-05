// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
const accessToken = Cypress.env("GITHUB_TOKEN");

Cypress.Commands.add("createGistRequest", (gistData, apiUrl,failOnStatusCode= true) => {
  // Make an API request to create a Gist using an access token
  cy.request({
    method: "POST",
    url: apiUrl,
    failOnStatusCode: failOnStatusCode,
    headers: {
      Authorization: `token ${accessToken}`,
    },
    body: gistData,
  });
});
