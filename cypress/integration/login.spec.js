describe("login", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  describe("parcours de login", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    it("cannot login with incorrect email", () => {
      cy.get('[data-cy="email"]').type("fb@gmail.com");
      cy.get('[data-cy="password"]').type("qotqot3000");
      cy.get('[data-cy="loginBtn"]').click();
      cy.contains("Identifiants incorrects, veuillez recommencer");
    });

    it("cannot login with incorrect password", function () {
      cy.get('[data-cy="email"]').type("user@gmail.com");
      cy.get('[data-cy="password"]').type("qot3000");
      cy.get('[data-cy="loginBtn"]').click();
      cy.contains("Identifiants incorrects, veuillez recommencer");
    });

    it("can login with correct credentials", function () {
      cy.get('[data-cy="email"]').type("user@gmail.com");
      cy.get('[data-cy="password"]').type("qotqot3000");
      cy.get('[data-cy="loginBtn"]').click();
      cy.url().should("eq", "http://localhost:3000/commandes");
    });
  });
});
