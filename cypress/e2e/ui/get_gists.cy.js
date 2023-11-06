import { btnAllGists, gistSnippet } from "../../support/locators";

describe("Read Gist Information", () => {
  beforeEach(() => {
    cy.visit("https://gist.github.com");
  });

  it("TC_03_List public gists", () => {
    cy.get("a")
      .contains(btnAllGists)
      .should("be.visible")
      .click({ force: true });
    cy.get(gistSnippet).should("be.visible");
  });
});
