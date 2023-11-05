let gistData;

describe("Update Gist API Tests", () => {
  beforeEach(() => {
    cy.fixture("gist_content.json").then((fixtureData) => {
      gistData = fixtureData;
      cy.createGistRequest(gistData).then((response) => {
        cy.wrap(response.body.id).as("createdGistId");
      });
    });
  });

  it("Updates contents of a file in a gist", function () {
    gistData.files["test-file.js"].content = "Updated";
    cy.get("@createdGistId").then((gistId) => {
      cy.updateGistRequest(gistId, gistData).then((response) => {
        // Assert that the response status code is 200 (OK)
        expect(response.status).to.eq(200);

        // Assert that the response contains the updated Gist data
        expect(response.body.files["test-file.js"].content).to.include("Updated");
      });
    });
  });
});
