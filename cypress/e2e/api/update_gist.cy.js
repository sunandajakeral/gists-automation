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

  it("TC_011_Updates contents of a file in a gist", function () {
    gistData.files["test-file.js"].content = "Updated";
    cy.get("@createdGistId").then((gistId) => {
      cy.updateGistRequest(gistId, gistData).then((response) => {
        // Assert that the response status code is 200 (OK)
        expect(response.status).to.eq(200);

        // Assert that the response contains the updated Gist data
        expect(response.body.files["test-file.js"].content).to.include(
          "Updated"
        );
      });
    });
  });

  it("TC_013_adds a new file to an existing gist", function () {
    gistData.files["test-file-2.js"] = {
      content: "New file added to an existing gist",
    };
    cy.get("@createdGistId").then((gistId) => {
      cy.updateGistRequest(gistId, gistData).then((response) => {
        // Assert that the response status code is 200 (OK)
        expect(response.status).to.eq(200);

        // Assert if the response contains the new file added
        expect(response.body.files).to.have.property("test-file-2.js");
      });
    });
  });

  it("TC_015_attempts to update a gist that doesn’t exist", function () {
    gistData.files["test-file-2.js"] = {
      content: "New file added to an existing gist",
    };
      cy.updateGistRequest("", gistData, false).then((response) => {
        // Assert that the response status code is 404 (Not Found)
        expect(response.status).to.eq(404);

        // Assert if the message equals "Not Found"
        expect(response.body.message).to.equal("Not Found");
      });
  });
});
