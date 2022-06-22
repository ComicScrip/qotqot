describe("detailProduit", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "user@gmail.com" });
  });
  it("should open detail in a new tab", () => {
    cy.intercept("**/products", { fixture: "products.json" });
    cy.visit("/nouvelleCommande");
    cy.get("a").should("have.attr", "target").and("include", "_blank");
  });
});
