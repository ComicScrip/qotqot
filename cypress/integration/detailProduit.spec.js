describe("detailProduit", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.login({ email: "user@gmail.com" });
  });
  it("should open detail in a new tab", () => {
    cy.intercept("**/products", { fixture: "products.json" });
    cy.visit("/nouvelleCommande");
    cy.get("a").should("have.attr", "target").and("include", "_blank");
  });
  it("should display the correct properties of the clicked item", () => {
    cy.visit("detailProduit/rec0cguxNDu8gyr0d");
    cy.contains("Douceur de quinoa coco carotte");
    cy.contains("CLAC!");
  });
  it("works with another product as well", () => {
    cy.visit("detailProduit/rec0nwwI1HxKvN2SO");
    cy.contains("Riz de Camargue IGP rond blanc «special risotto»");
    cy.contains("30800 - SAINT GILLES - GARD");
  });
  it("displays as message when there is no product description", () => {
    cy.visit("detailProduit/rec0rp9lvCydHMM14");
    cy.contains("Aucune desciption disponible, merci de nous contacter");
  });
});
