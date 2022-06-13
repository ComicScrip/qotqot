describe("login", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
  });

  describe("sign in without session", () => {
    it("can login with correct credentials", function () {
      cy.visit("/");
      cy.get('[data-cy="email"]').type("user@gmail.com");
      cy.get('[data-cy="password"]').type("qotqot3000");
      cy.get('[data-cy="loginBtn"]').click();
      cy.url().should("equal", "http://localhost:3000/commandes");
    });
  });

  it("should login with the right credentials and redirect to the right page when callbackUrl is present in the url", function () {
    cy.visit("/");
    cy.get('[data-cy="email"]').type("user@gmail.com");
    cy.get('[data-cy="password"]').type("qotqot3000");
    cy.get('[data-cy="loginBtn"]').click();
    cy.url().should("equal", "http://localhost:3000/commandes");
  });
});

//     it("cannot login with incorrect email", () => {
//       cy.get('[data-cy="currentUserMenu"]').should("not.exist");
//       cy.get("#username").type("adin@website.com");
//       cy.get("#password").type("verysecure");
//       cy.get("form").submit();
//       cy.get('[data-cy="currentUserMenu"]').should("not.exist");
//       cy.contains(
//         "Ces identifiants ne corresspondent à aucun utilisateur actif."
//       );
//     });

//     it("cannot login with incorrect password", function () {
//       cy.get('[data-cy="currentUserMenu"]').should("not.exist");
//       cy.get("#username").type(this.userInDb.email);
//       cy.get("#password").type("veryscure");
//       cy.get("form").submit();
//       cy.get('[data-cy="currentUserMenu"]').should("not.exist");
//       cy.contains(
//         "Ces identifiants ne corresspondent à aucun utilisateur actif."
//       );
//     });
//     it("cannot login without having a confirmed email", () => {
//       cy.task("deleteUserByEmail", "admin@website.com");
//       cy.task("createUser", {
//         email: "admin@website.com",
//         role: "admin",
//         password: "verysecure",
//         emailVerificationCode: "test",
//       });
//       cy.get('[data-cy="currentUserMenu"]').should("not.exist");
//       cy.get("#username").type("admin@website.com");
//       cy.get("#password").type("verysecure");
//       cy.get("form").submit();
//       cy.get('[data-cy="currentUserMenu"]').should("not.exist");
//       cy.contains(
//         "Ces identifiants ne corresspondent à aucun utilisateur actif."
//       );
//     });
//   });

//   describe("with an active session", () => {
//     beforeEach(() => {
//       cy.setupCurrentUser({ email: "visitor@website.com" });
//       cy.visit("/login");
//     });
//     it("shows the email of the current user", () => {
//       cy.contains("connecté en tant que visitor@website.com");
//     });
//     it("shows a disconnect button", () => {
//       cy.get("main").contains("Se déconnecter").click();
//       cy.contains("Se connecter");
//     });
//   });
// });
