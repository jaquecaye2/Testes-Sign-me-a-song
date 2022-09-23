describe("Testando Página Random", () => {
  it("Verificar a aparição de uma recomendação aleatória", async () => {
    cy.visit("http://localhost:3000/");

    cy.intercept("GET", "http://localhost:5000/recommendations/random").as(
      "showRandomRecommendation"
    );

    cy.get("#pageRandom").click()

    cy.wait("@showRandomRecommendation");

    cy.url().should('equal', 'http://localhost:3000/random');

    cy.get("article").should(($article) => {
      expect($article).to.have.length(1)
    })
  });
});
