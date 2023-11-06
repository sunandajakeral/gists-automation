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
const apiUrl = Cypress.env("API_BASE_URL");

Cypress.Commands.add(
  "createGistRequest",
  (gistData, failOnStatusCode = true) => {
    // Make an API request to create a Gist using an access token
    cy.request({
      method: "POST",
      url: `${apiUrl}/gists`,
      failOnStatusCode: failOnStatusCode,
      headers: {
        Authorization: `token ${accessToken}`,
      },
      body: gistData,
    });
  }
);

Cypress.Commands.add(
  "updateGistRequest",
  (gistId, gistData, failOnStatusCode = true) => {
    // Make an API request to update the Gist
    cy.request({
      method: "PATCH",
      url: `${apiUrl}/gists/${gistId}`,
      failOnStatusCode: failOnStatusCode,
      headers: {
        Authorization: `token ${accessToken}`,
      },
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
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
});

Cypress.Commands.add("getGistsListRequest", (gist, failOnStatusCode = true) => {
  // Make an API request to get the Gists List
  cy.request({
    method: "GET",
    url: `${apiUrl}/gists/${gist}`,
    failOnStatusCode: failOnStatusCode,
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
});

Cypress.Commands.add(
  "getGistsListAuthenticatedUser",
  (failOnStatusCode = true) => {
    // Make an API request to get the Gists List
    cy.request({
      method: "GET",
      url: `${apiUrl}/gists`,
      failOnStatusCode: failOnStatusCode,
      headers: {
        Authorization: `token ${accessToken}`,
      },
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
