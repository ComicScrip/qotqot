describe("/mot-de-passe-oublie", () => {
  const email = "wcsqotqot@gmail.com";
  const resetPasswordToken = "tokentokentoken";
  const newPassword = "nouveaumotdepasse";

  it("can send the reset password email", () => {
    cy.login({ email });
    cy.visit("/mot-de-passe-oublie");
    cy.get("[data-cy='email']").type(email);
    cy.get("[data-cy='sendResetLinkBtn']").click();
    cy.contains(
      `Un message avec un lien de réinitialisation vous a été envoyé,
      merci de vérifier votre boîte mail`
    );

    cy.task("getLastEmail", email).then((mail) => {
      expect(mail).not.to.be.null;
      expect(mail.body).to.contain(`/mot-de-passe-oublie`);
    });
  });

  it("cannot send the mail if the user is not in db", () => {
    cy.login({ email });
    cy.visit("/mot-de-passe-oublie");
    cy.get("[data-cy='email']").type(email + "test");
    cy.get("[data-cy='sendResetLinkBtn']").click();
    cy.contains("Email introuvable");
  });

  it("should reset the password when provided valid info", () => {
    cy.task("hashPassword", resetPasswordToken).then(() => {
      cy.visit(
        `/reset-password?email=${email}&resetPasswordToken=${resetPasswordToken}`
      );
      cy.get("[data-cy='newPassword']").type(newPassword);
      cy.get("[data-cy='newPasswordConfirmation']").type(newPassword);
      cy.get("[data-cy='resetPasswordBtn']").click();
      cy.url().should("match", "/");
    });
  });

  it("prints an error if the token is ivalid", () => {
    cy.visit(
      `/reset-password?email=${email}&resetPasswordToken=${
        resetPasswordToken + "test"
      }`
    );
    cy.get("[data-cy='newPassword']").type(newPassword);
    cy.get("[data-cy='newPasswordConfirmation']").type(newPassword);
    cy.get("[data-cy='resetPasswordBtn']").click();
    cy.contains("Ce lien de réinitialisation n'est plus valide");
  });

  it("prints an error if passwords dont match", () => {
    cy.visit(
      `/reset-password?email=${email}&resetPasswordToken=${resetPasswordToken}`
    );
    cy.get("[data-cy='newPassword']").type(newPassword);
    cy.get("[data-cy='newPasswordConfirmation']").type(newPassword + "ef");
    cy.get("[data-cy='resetPasswordBtn']").click();
    cy.contains("Les mots de passe ne correspondent pas");
  });
});
