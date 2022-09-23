beforeEach(async () => {
  await cy.request("POST", "http://localhost:5001/e2e/reset", {});
});

describe("Testando Página Home", () => {
  it("Verificar listagem de no máximo 10 recomendações, criação da recomendação na página Home e likes e deslikes na recomendação", async () => {
    cy.intercept("GET", "http://localhost:5001/recommendations").as(
      "showRecommendations"
    );

    cy.intercept("POST", "http://localhost:5001/recommendations/1/upvote").as(
      "likeRecommendation"
    );

    cy.intercept("POST", "http://localhost:5001/recommendations/1/downvote").as(
      "deslikeRecommendation"
    );

    cy.visit("http://localhost:3000/");

    cy.wait("@showRecommendations");

    cy.get("#noOneRecommendation").should("be.visible");

    cy.createRecommendation()
    cy.get("article").should(($article) => {
      expect($article).to.have.length(1)
    }) 

    cy.get("#upvote").click();
    cy.wait("@likeRecommendation");
    cy.get("#score").should("contain.text", "1")

    cy.get("#upvote").click();
    cy.wait("@likeRecommendation");
    cy.get("#score").should("contain.text", "2")

    cy.get("#downvote").click();
    cy.wait("@deslikeRecommendation");
    cy.get("#score").should("contain.text", "1")
    
    cy.createRecommendation()
    cy.get("article").should(($article) => {
      expect($article).to.have.length(2)
    })

    cy.createRecommendation()
    cy.get("article").should(($article) => {
      expect($article).to.have.length(3)
    })

    cy.createRecommendation()
    cy.get("article").should(($article) => {
      expect($article).to.have.length(4)
    })

    cy.createRecommendation()
    cy.createRecommendation()
    cy.createRecommendation()
    cy.createRecommendation()
    cy.createRecommendation()
    cy.createRecommendation()
    cy.createRecommendation()

    cy.get("article").should(($article) => {
      expect($article).to.have.length.of.at.most(10)
    })   
  });
});
