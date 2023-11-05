// Read the api base url and form the GitHub API endpoint
const apiUrl = `${Cypress.env("API_BASE_URL")}/gists`;

describe("Create Gist API Tests", () => {
  beforeEach(() => {
    cy.fixture("gist_content.json").as("gistContent");
  });

  it("TC_01_Create a gist with a single file", () => {
    cy.get("@gistContent").then((gistData) => {
      cy.createGistRequest(gistData, apiUrl).then((response) => {
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
  });

  it("TC_02_Create a gist with multiple files", () => {
    cy.get("@gistContent").then((gistData) => {
      gistData.files["test-file-2.js"] = {
        content: "Welcome to the World!",
      };
      cy.createGistRequest(gistData, apiUrl).then((response) => {
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
  });
});
