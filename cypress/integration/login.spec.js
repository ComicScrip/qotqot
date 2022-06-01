describe("login", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  describe("without session", () => {
    beforeEach(() => {
      cy.signup({ password: "verysecure" });
      cy.visit("/login");
    });

    it("can login with correct credentials", function () {
      cy.get('[data-cy="email"]').type(this.userInDb.email);
      cy.get('[data-cy="password"]').type("verysecure");
      cy.get('[data-cy="loginForm"]').submit();
      cy.url().should("match", /\/$/);
    });
  });
});
