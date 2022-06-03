/// <reference types="cypress" />

describe("nouvelleCommande", () => {
  beforeEach(() => {
    cy.visit("/nouvelleCommande");
  });
  it("should have content appear on screen", () => {
    cy.get("div");
  });
  it("should present a picture of products", () => {
    cy.get("img").should("be.visible");
  });

  it("should hace an id, name, weight and prices properties", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/api/products",
    }).then(function (response) {
      expect(response.body[0].fields).contain("id");
    });
  });
});
