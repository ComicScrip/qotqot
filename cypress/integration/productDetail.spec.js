describe("detailProduit", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "user@gmail.com" });
  });
  it("should be clickable", () => {
    cy.intercept("**/products", { fixture: "products.json" });
    cy.visit("/nouvelleCommande");
    cy.get("img ").click();
  });
});
