let gistData;

describe("Create Gist API Tests", () => {
  beforeEach(() => {
    cy.fixture("gist_content.json").then(
      (fixtureData) => (gistData = fixtureData)
    );
  });

  it("TC_01_Create a gist with a single file", () => {
    cy.createGistRequest(gistData).then((response) => {
      // Assert that the response status code is 201 (Created)
      expect(response.status).to.eq(201);

      // Validate the response data
      expect(response.body.description).to.eq(gistData.description);

      // Check that the response has file content as expected
      expect(response.body.files["test-file.js"].content).to.deep.equal(
        gistData.files["test-file.js"].content
      );

      // Store the Gist ID for future reference (you can use it in other tests)
      const gistId = response.body.id;
      cy.wrap(gistId).as("createdGistId");
    });
  });

  it("TC_02_Create a gist with multiple files", () => {
    gistData.files["test-file-2.js"] = {
      content: "Welcome to the World!",
    };
    cy.createGistRequest(gistData).then((response) => {
      // Assert that the response status code is 201 (Created)
      expect(response.status).to.eq(201);

      // Validate the response data
      expect(response.body.description).to.eq(gistData.description);

      // Check that the response has file content as expected
      expect(response.body.files["test-file.js"].content).to.deep.equal(
        gistData.files["test-file.js"].content
      );

      // Check that the response has file content as expected
      expect(response.body.files["test-file-2.js"].content).to.deep.equal(
        gistData.files["test-file-2.js"].content
      );

      // Store the Gist ID for future reference (you can use it in other tests)
      const gistId = response.body.id;
      cy.wrap(gistId).as("createdGistId");
    });
  });

  it("TC_03_Create a public gist", () => {
    gistData.public = true;
    // Make an API request to create a Gist using an access token
    cy.createGistRequest(gistData).then((response) => {
      // Assert that the response status code is 201 (Created)
      expect(response.status).to.eq(201);

      // Validate the response data
      expect(response.body.description).to.eq(gistData.description);

      // Check that the response has file content as expected
      expect(response.body.files["test-file.js"].content).to.deep.equal(
        gistData.files["test-file.js"].content
      );

      // Store the Gist ID for future reference (you can use it in other tests)
      const gistId = response.body.id;
      cy.wrap(gistId).as("createdGistId");
    });
  });

  it("TC_04_Attempt to create a gist without required fields", () => {
    delete gistData.files["test-file.js"];
    // Make an API request to create a Gist using an access token
    cy.createGistRequest(gistData, false).then((response) => {
      // Assert that the response status code is 422 (Unprocessable Entity)
      expect(response.status).to.eq(422);

      // Validate the response data
      expect(response.body.message).to.eq("Validation Failed");

      // Store the Gist ID for future reference (you can use it in other tests)
      const gistId = response.body.id;
      cy.wrap(gistId).as("createdGistId");
    });
  });
});
