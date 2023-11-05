describe("Read Gist Information", () => {
  beforeEach(() => {
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

  it("TC_006_lists public gists", function () {
    cy.getGistsListRequest("public").then((response) => {
      // Assert that the response status code is 200 (OK)
      expect(response.status).to.eq(200);

      // Assert that the response contains the updated Gist data
      response.body.forEach((responseBody) => {
        expect(responseBody.public).to.equal(true);
      });
    });
  });

  it("TC_008_lists gists for a autheticated user", function () {
    cy.getGistsListAuthenticatedUser().then((response) => {
      // Assert that the response status code is 200 (OK)
      expect(response.status).to.eq(200);

      // Assert that the response contains the updated Gist data
      response.body.forEach((responseBody) => {
        expect(responseBody.public).to.equal(false);
      });
    });
  });

  it("TC_010_attempts to retrieve a non-existing gist by ID", function () {
    cy.get("@createdGistId").then((gistId) => {
      const nonExistingGist = `${gistId}id`;
      cy.getGistsListRequest(nonExistingGist, false).then((response) => {
        // Assert that the response status code is 200 (OK)
        expect(response.status).to.eq(404);

        // Assert that the response contains the updated Gist data
        expect(response.body.message).to.equal("Not Found");
      });
    });
  });
});
