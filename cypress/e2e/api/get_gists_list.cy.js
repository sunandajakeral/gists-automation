describe("Read Gist Information", () => {
  before(() => {
    cy.fixture("gist_content.json").then((fixtureData) => {
      cy.createGistRequest(fixtureData).then((response) => {
        cy.wrap(response.body.id).as("createdGistId");
      });
    });
  });

  it("TC_007_retrieves an existing gist by ID", function () {
    cy.get("@createdGistId").then((gistId) => {
      cy.getGistsListRequest(gistId).then((response) => {
        // Assert that the response status code is 200 (OK)
        expect(response.status).to.eq(200);

        // Assert that the response contains the updated Gist data
        expect(response.body.id).to.equal(gistId);
      });
    });
  });
});
