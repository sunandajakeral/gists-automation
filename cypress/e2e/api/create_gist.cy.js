let gistData;

describe("Create Gist API Tests", () => {
  beforeEach(() => {
    cy.fixture("gist_content.json").then(
      (fixtureData) => (gistData = fixtureData)
    );
  });

  it("TC_01_creates a gist with a single file", () => {
    cy.createGistRequest(gistData).then((response) => {
      cy.assertGistCreation(response, gistData);
    });
  });

  it("TC_02_creates a gist with multiple files", () => {
    gistData.files["test-file-2.js"] = {
      content: "Welcome to the World!",
    };
    cy.createGistRequest(gistData).then((response) => {
      cy.assertGistCreation(response, gistData);
    });
  });

  it.only("TC_03_creates a public gist", () => {
    gistData.public = true;
    // Make an API request to create a Gist using an access token
    cy.createGistRequest(gistData).then((response) => {
      cy.assertGistCreation(response, gistData);
    });
  });

  it("TC_04_attempts to create a gist without required fields", () => {
    delete gistData.files["test-file.js"];
    // Make an API request to create a Gist using an access token
    cy.createGistRequest(gistData, false).then((response) => {
      // Assert that the response status code is 422 (Unprocessable Entity)
      expect(response.status).to.eq(422);

      // Validate the response data
      expect(response.body.message).to.eq("Validation Failed");
    });
  });
});
