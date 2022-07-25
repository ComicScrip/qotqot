describe("getProducts", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "user@gmail.com" });
  });

  it("should display a list of products when the api responds", () => {
    cy.intercept("**/products", { fixture: "products.json" });
    cy.visit("/nouvelleCommande");
    cy.contains("Caviar d'artichaut");
    cy.contains("Caramel à la Fleur de Sel de Guérande");
    cy.contains("Ketchup Piment'ail");
  });
  it("should have content appear on screen", () => {
    cy.get("div");
  });

  it("should display an error when the api is down", () => {
    cy.intercept("**/products", { statusCode: 500 });
    cy.login({ email: "user@gmail.com" });
    cy.visit("/nouvelleCommande");
    cy.contains("Could not get data from the server, please try again");
  });
});
