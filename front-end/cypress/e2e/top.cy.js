describe("Testando Página Top", () => {
  it("Verificar listagem das 10 postagens com maiores quantidades de likes", async () => {
    cy.visit("http://localhost:3000/");

    cy.intercept("GET", "http://localhost:5000/recommendations/top/10").as(
      "showTopRecommendations"
    );

    cy.get("#pageTop").click();

    cy.wait("@showTopRecommendations");

    cy.url().should("equal", "http://localhost:3000/top");

    cy.get("article").should(($article) => {
      expect($article).to.have.length.of.at.most(10);
    });
  });
});
