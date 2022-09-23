describe('Testando aplicação e2e', () => {
  it('Ao entrar no aplicativo, o mesmo deve estar na rota "/" e deve ser mostrado as ultimas 10 recomendações criadas', async () => {

  })

  it('Verificar se foi listado a recomendação após cria-lá', async () => {
    const recommendation = {
      name: "Avril Lavigne - Complicated",
      link: "https://www.youtube.com/watch?v=5NPBIwQyPWE"
    };

    cy.visit('http://localhost:3000/');

    cy.get("#name").type(recommendation.name)
    cy.get("#url").type(recommendation.link)

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('createRecommendation');

    cy.get('#create').click();

    cy.wait('@createRecommendation');

    cy.url().should('equal', 'http://localhost:3000/market');
  })

  it.todo('Ao clicar em "top" deve ser redirecionado para a url "/top" e mostrado as 10 recomendações mais curtidas')

  it.todo('Ao clicar em "random" deve ser redirecionado para a url "/random" e mostrado uma recomendação aleatória')

  it.todo('Ao clicar na seta pra cima deve aumentar o valor mostrado')

  it.todo('Ao clicar na seta pra baixo deve diminuir o valor mostrado')
})
