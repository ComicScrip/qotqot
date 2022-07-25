describe("getProducts", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "user@gmail.com" });
  });

  it("should have content appear on screen", () => {
    cy.get("div");
  });
  it("should present a picture of products", () => {
    cy.get("img").should("be.visible");
  });
});
