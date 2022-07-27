describe("getProducts", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "wcsqotqot@gmail.com" });
  });

  it("should have content appear on screen", () => {
    cy.get("div");
  });
});
