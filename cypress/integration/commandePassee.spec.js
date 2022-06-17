describe("commandePassee", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "user@gmail.com" });
  });

  it("should access a detailed page of pending order when clicking on a pending order", () => {
    cy.visit("/commandes");
    cy.contains("12 mai").click();
    cy.url().should("eq", "http://localhost:3000/commandes/ENT69-0013");
    cy.contains("Prévue pour le 12 mai 2022");
  });

  it("should access a detailed page of a passed order when clicking on a passed order", () => {
    cy.visit("/commandes");
    cy.contains("17 mai").click();
    cy.url().should("eq", "http://localhost:3000/commandes/PRO69-0007");
    cy.contains("Livrée le 17 mai 2022");
  });

  it("should access a detailed page of cancelled order when clicking on a cancelled order", () => {
    cy.visit("/commandes");
    cy.contains("5 avr.").click();
    cy.url().should("eq", "http://localhost:3000/commandes/PRO69-0006");
    cy.contains("Annulée le 5 avr. 2022");
  });
});
