describe("getProducts", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("should display a list of products when the api responds", () => {
    cy.intercept("**/products", { fixture: "products.json" });
    cy.visit("/nouvelleCommande");
    cy.contains("Mousse de carotte au bleu d'Auvergne");
    cy.contains("Caviar d'artichaut");
    cy.contains("Caramel à la Fleur de Sel de Guérande");
    cy.contains("Ketchup Piment'ail");
  });
  it("should have content appear on screen", () => {
    cy.get("div");
  });
  it("should present a picture of products", () => {
    cy.get("img").should("be.visible");
  });
  it("should display an error when the api is down", () => {
    cy.intercept("**/products", { statusCode: 500 });
    cy.visit("/nouvelleCommande");
    cy.contains("Could not get data from the server, please try again");
  });
});