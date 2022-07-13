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
  it("should open a popup on image click", () => {
    cy.intercept("**/products", { fixture: "products.json" });
    cy.visit("/nouvelleCommande");
    cy.get("img ").click();
    cy.window().contains("Douceur");
  });
});
