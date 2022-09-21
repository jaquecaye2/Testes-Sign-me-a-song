import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "recommendations"`;
});

const recommendations = {
  data: [
    {
      name: "Shawn Mendes - Imagination",
      youtubeLink: "https://www.youtube.com/watch?v=xXEx0DyIMks",
      score: 17,
    },
    {
      name: "Shawn Mendes - Mercy",
      youtubeLink: "https://www.youtube.com/watch?v=KkGVmN68ByU",
      score: 13,
    },
    {
      name: "Ed Sheeran - Perfect",
      youtubeLink: "https://www.youtube.com/watch?v=2Vv-BfVoq4g",
      score: 9,
    },
    {
      name: "Ed Sheeran - Thinking Out Loud",
      youtubeLink: "https://www.youtube.com/watch?v=lp-EO5I60KA",
      score: 8,
    },
    {
      name: "Justin Timberlake - Mirrors",
      youtubeLink: "https://www.youtube.com/watch?v=uuZE_IRwLNI",
      score: 15,
    },
    {
      name: "Bruno Mars - When I Was Your Man",
      youtubeLink: "https://www.youtube.com/watch?v=ekzHIouo8Q4",
      score: 14,
    },
    {
      name: "Bruno Mars - Just The Way You Are",
      youtubeLink: "https://www.youtube.com/watch?v=LjhCEhWiKXk",
      score: 2,
    },
    {
      name: "Jason Mraz - I'm Yours",
      youtubeLink: "https://www.youtube.com/watch?v=EkHTsc9PU2A",
      score: 17,
    },
    {
      name: "TONES AND I - DANCE MONKEY",
      youtubeLink: "https://www.youtube.com/watch?v=q0hyYWKXF0Q",
      score: 22,
    },
    {
      name: "Ed Sheeran - Shape of You",
      youtubeLink: "https://www.youtube.com/watch?v=JGwWNGJdvx8",
      score: 16,
    },
    {
      name: "Coldplay - Paradise",
      youtubeLink: "https://www.youtube.com/watch?v=1G4isv_Fylg",
      score: 6,
    },
  ],
  skipDuplicates: true,
};

describe("Testa POST /recommendations", () => {
  it("Deve retornar status 201 se cadastrado uma recomendação no formato correto", async () => {
    const recommendation = {
      name: "Harry Styles - As It Was",
      youtubeLink: "https://www.youtube.com/watch?v=H5v3kku4y6Q",
    };

    const result = await supertest(app)
      .post("/recommendations")
      .send(recommendation);

    const createdRecommendation = await prisma.recommendation.findFirst({
      where: { name: recommendation.name },
    });

    expect(result.status).toBe(201);
    expect(createdRecommendation).not.toBeNull();
  });

  it("Deve retornar status 422 ao tentar cadastrar um body no formato inválido", async () => {
    const recommendation = {
      name: "Testando URL inválida",
      youtubeLink: "youtube.com/watch?v=H5v3kku4y6Q",
    };

    const result = await supertest(app)
      .post("/recommendations")
      .send(recommendation);

    expect(result.status).toBe(422);
  });

  it("Deve retornar status 409 se cadastrado uma recomendação com nome já utilizado", async () => {
    const recommendation = {
      name: "Harry Styles - As It Was",
      youtubeLink: "https://www.youtube.com/watch?v=H5v3kku4y6Q",
    };

    await supertest(app).post("/recommendations").send(recommendation);

    const result = await supertest(app)
      .post("/recommendations")
      .send(recommendation);

    expect(result.status).toBe(409);
  });
});

describe("Testa POST /recommendations/:id/upvote", () => {
  it("Deve retornar status 200 se informado um id válido", async () => {
    await prisma.recommendation.createMany(recommendations);

    const findAll = await prisma.recommendation.findMany();

    const id = findAll[0].id;

    const findInitial = await prisma.recommendation.findFirst({
      where: { id },
    });
    const initialScore = findInitial.score;

    const result = await supertest(app).post(`/recommendations/${id}/upvote`);

    const findFinal = await prisma.recommendation.findFirst({ where: { id } });
    const finalScore = findFinal.score;

    expect(result.status).toBe(200);
    expect(finalScore - initialScore).toEqual(1);
  });

  it("Deve retornar status 404 se informado um id inválido", async () => {
    const id = 999999999999;

    const result = await supertest(app).post(`/recommendations/${id}/upvote`);

    expect(result.status).toBe(404);
  });
});

describe("Testa POST /recommendations/:id/downvote", () => {
  it("Deve retornar status 200 se informado um id válido", async () => {
    await prisma.recommendation.createMany(recommendations);

    const findAll = await prisma.recommendation.findMany();

    const id = findAll[0].id;

    const findInitial = await prisma.recommendation.findFirst({
      where: { id },
    });
    const initialScore = findInitial.score;

    const result = await supertest(app).post(`/recommendations/${id}/downvote`);

    const findFinal = await prisma.recommendation.findFirst({ where: { id } });
    const finalScore = findFinal.score;

    expect(result.status).toBe(200);
    expect(finalScore - initialScore).toEqual(-1);
  });

  it("Deve retornar status 404 se informado um id inválido", async () => {
    const id = 999999999999;

    const result = await supertest(app).post(`/recommendations/${id}/downvote`);

    expect(result.status).toBe(404);
  });
});

describe("Testa GET /recommendations", () => {
  it("Deve retornar status 200 e o body no formato de Array com no máximo 10 itens", async () => {
    const result = await supertest(app).get("/recommendations");

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body.length).toBeLessThanOrEqual(10)
  });
});

describe("Testa GET /recommendations/:id", () => {
  it.todo(
    "Deve retornar status 200 se informado um id válido e resposta no formato de objeto"
  );

  it.todo("Deve retornar status 404 se informado um id inválido");
});

describe("Testa GET /recommendations/random", () => {
  it.todo("Deve retornar status 200 e resposta no formato de objeto");
});

describe("Testa GET /recommendations/top/:amount", () => {
  it.todo(
    "Deve retornar status 200 e resposta no formato de array com a quantidade de itens informada na rota"
  );
});

afterAll(async () => {
  await prisma.$disconnect();
});
