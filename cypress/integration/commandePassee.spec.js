describe("commandePassee", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "user@gmail.com" });
  });

  it("should access a detailed page of a passed order when clicking on a passed order", () => {
    cy.intercept("**/api/orders**", { fixture: "orderspassed.json" });
    cy.visit("/commandes");
    cy.contains("26 Jul").click();
    cy.intercept("**/orderDetails/cl62b8ee3004609jw4t8pmb1a", {
      fixture: "orderDetails.json",
    });
    cy.url().should("include", "/commandes/cl62b8ee3004609jw4t8pmb1a");
    cy.contains("En cours");
    cy.contains("Caviar d'artichaut");
  });
});
