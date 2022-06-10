describe("orders", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "user@gmail.com" });
  });

  it("should display the list of orders when the api responds", () => {
    cy.intercept("**/orders**", { fixture: "order.json" });
    cy.visit("/commandes");
    cy.contains("17 mai 2022");
    cy.contains("24 mars 2022");
    cy.contains("Livrée");
  });

  it("should display an error when the api is down", () => {
    cy.intercept("**/orders**", { statusCode: 500 });
    cy.visit("/commandes");
    cy.contains("Could not get data from the server, please try again");
  });
});
