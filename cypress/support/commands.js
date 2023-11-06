// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { apiMethods } from "./constants";

const accessToken = Cypress.env("GITHUB_TOKEN");
const apiUrl = Cypress.env("API_BASE_URL");
const authHeader =  {
  Authorization: `token ${accessToken}`,
};

Cypress.Commands.add(
  "createGistRequest",
  (gistData, failOnStatusCode = true) => {
    // Make an API request to create a Gist using an access token
    cy.request({
      method: apiMethods.POST,
      url: `${apiUrl}/gists`,
      failOnStatusCode: failOnStatusCode,
      headers: {...authHeader},
      body: gistData,
    });
  }
);

Cypress.Commands.add(
  "updateGist",
  (gistId, gistData, failOnStatusCode = true) => {
    // Make an API request to update the Gist
    cy.request({
      method: apiMethods.PATCH,
      url: `${apiUrl}/gists/${gistId}`,
      failOnStatusCode: failOnStatusCode,
      headers: {...authHeader},
      body: gistData,
    });
  }
);

Cypress.Commands.add("deleteGistRequest", (gistId, failOnStatusCode = true) => {
  // Make an API request to delete the Gist
  cy.request({
    method: "DELETE",
    url: `${apiUrl}/gists/${gistId}`,
    failOnStatusCode: failOnStatusCode,
    headers: {...authHeader},
  });
});

Cypress.Commands.add("getGists", (gist, failOnStatusCode = true) => {
  // Make an API request to get the Gists List
  cy.request({
    method: apiMethods.GET,
    url: `${apiUrl}/gists/${gist}`,
    failOnStatusCode: failOnStatusCode,
    headers: {...authHeader},
  });
});

Cypress.Commands.add(
  "getGistsListAuthenticatedUser",
  (failOnStatusCode = true) => {
    // Make an API request to get the Gists List
    cy.request({
      method: apiMethods.GET,
      url: `${apiUrl}/gists`,
      failOnStatusCode: failOnStatusCode,
      headers: {...authHeader},
    });
  }
);

Cypress.Commands.add("assertGistCreation", (response, gistData) => {
  // Assert that the response status code is 201 (Created)
  expect(response.status).to.eq(201);
  // Validate the response data
  expect(response.body.description).to.eq(gistData.description);
  // Check that the response has file content as expected
  for (const fileName in gistData.files) {
    expect(response.body.files[fileName].content).to.deep.equal(gistData.files[fileName].content);
  }
});
