describe("Update Gist API Tests", () => {
  beforeEach(() => {
    cy.fixture("gist_content.json").then((fixtureData) => {
      gistData = fixtureData;
      cy.createGistRequest(gistData).then((response) => {
        cy.wrap(response.body.id).as("createdGistId");
      });
    });
  });

  it("TC_016_deletes an existing Gist", function () {
    cy.get("@createdGistId").then((gistId) => {
      // Make an API request to delete the Gist
      cy.deleteGistRequest(gistId).then((response) => {
        // Assert that the response status code is 204
        expect(response.status).to.eq(204);
      });
    });
  });
});
