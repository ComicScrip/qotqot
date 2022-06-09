describe("getProducts", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  it("should display the list of orders when the api responds", () => {
    cy.intercept("**/orders", { fixture: "order.json" });
    cy.visit("/home");
    cy.contains("17 mai 2022");
    cy.contains("24 mars 2022");
    cy.contains("Livrée");
    cy.contains("En cours");
  });

  it("should display an error when the api is down", () => {
    cy.intercept("**/orders", { statusCode: 500 });
    cy.visit("/home");
    cy.contains(alert("Could not get data from the server, please try again"));
  });
});
