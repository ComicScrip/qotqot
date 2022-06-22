describe("detailProduit", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "user@gmail.com" });
  });
  it("should display details of the proper product", () => {
    cy.intercept("**/products", { fixture: "products.json" });
    cy.visit("/nouvelleCommande");
    cy.get("a").should("have.attr", "target").and("include", "_blank");
  });
});
