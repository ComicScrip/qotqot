describe("commandePassee", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "user@gmail.com" });
  });

  it("should access a detailed page of pending order when clicking on a pending order", () => {
    cy.intercept("**/api/commandes", { fixture: "orders.json" });
    cy.visit("/commandes");
    cy.contains("12 mai").click();
    cy.intercept("**/commandePassee", { fixture: "commandePassee.json" });
    cy.url().should("include", "/commandes/ENT69-0013");
    cy.contains("Prévue pour le 12/05/2022");
    cy.contains("Provençale de légumes");
  });

  it("should access a detailed page of a passed order when clicking on a passed order", () => {
    cy.intercept("**/api/commandes", { fixture: "orders.json" });
    cy.visit("/commandes");
    cy.contains("17 mai").click();
    cy.intercept("**/commandePassee", { fixture: "commandePassee.json" });
    cy.url().should("include", "/commandes/PRO69-0007");
    cy.contains("Livrée le 17/05/2022");
    cy.contains("Liqueur de Verveine");
  });

  it("should access a detailed page of cancelled order when clicking on a cancelled order", () => {
    cy.intercept("**/api/commandes", { fixture: "orders.json" });
    cy.visit("/commandes");
    cy.contains("5 avr.").click();
    cy.intercept("**/commandePassee", { fixture: "commandePassee.json" });
    cy.url().should("include", "/commandes/PRO69-0006");
    cy.contains("Annulée le 05/04/2022");
    cy.contains("Provençale de légumes");
  });
});
