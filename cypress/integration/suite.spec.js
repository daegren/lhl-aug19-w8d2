/// <reference types="Cypress" />

describe("Album Search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8000");
  });

  it("toggles the checkboxes", () => {
    cy.get("#Single")
      .check()
      .should("be.checked");

    cy.get("#2000s")
      .uncheck()
      .should("not.be.checked");
  });

  it("searches for an artist", () => {
    cy.server();
    cy.route("GET", "search*").as("getSearch");

    cy.get(".search__form")
      .find("input")
      .first()
      .type("daft punk", { delay: 250 });

    cy.wait("@getSearch")
      .its("status")
      .should("eq", 200);

    cy.get(".album").should("have.length", 13);

    cy.get("#Explicit").uncheck();

    cy.get(".album")
      .should("have.length", 12)
      .should("not.have.descendants", ".album__info--explicit");
  });
});
