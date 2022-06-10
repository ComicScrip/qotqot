describe("login", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  describe("when not logged in", () => {
    it("should display the login form when ", () => {
      cy.visit("/");
      cy.get("[data-cy=loginForm]").should("be.visible");
      cy.get("[data-cy=password]").should("be.visible");
      cy.get("[data-cy=email]").should("be.visible");
      cy.get("[data-cy=loginBtn]").should("be.visible");
      cy.get("[data-cy=rememberBox]").should("be.visible");
      cy.get("[data-cy=lostPassword]").should("be.visible");
    });
  });

  describe("when logged in", () => {
    it("should redirect to commande page", () => {
      cy.login({ email: "user@gmail.com" });
      cy.visit("/commandes");
      cy.contains("Bonjour 👋");
      cy.get("[data-cy=menu]").click();
      cy.get("[data-cy=disconnectBtn]").should("be.visible");
    });
  });

  describe("parcours de login", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    // it("cannot login with incorrect email", () => {
    //   cy.get('[data-cy="email"]').type("fb@gmail.com");
    //   cy.get('[data-cy="password"]').type("qotqot3000");
    //   cy.get('[data-cy="loginBtn"]').click();
    //   cy.contains("Identifiants incorrects, veuillez recommencer");
    // });

    // it("cannot login with incorrect password", function () {
    //   cy.get('[data-cy="email"]').type("user@gmail.com");
    //   cy.get('[data-cy="password"]').type("qot3000");
    //   cy.get('[data-cy="loginBtn"]').click();
    //   cy.contains("Identifiants incorrects, veuillez recommencer");
    // });

    // it("can login with correct credentials", function () {
    //   cy.get('[data-cy="email"]').type("user@gmail.com");
    //   cy.get('[data-cy="password"]').type("qotqot3000");
    //   cy.get('[data-cy="loginBtn"]').click();
    //   cy.url().should("eq", "http://localhost:3000/commandes");
    // });
  });
});
