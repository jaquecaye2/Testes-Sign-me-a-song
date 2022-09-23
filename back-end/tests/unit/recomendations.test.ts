import { faker } from "@faker-js/faker";

import recommendationRepository from "../../src/repositories/recommendationRepository";
import recommendationService from "../../src/services/recommendationsService";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Testes unitários do recommendations service", () => {
  it("Testa a função 'insert'", async () => {
    const recommendation = {
      name: faker.name.fullName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
        11
      )}`,
    };

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {});

    jest
      .spyOn(recommendationRepository, "create")
      .mockImplementationOnce((): any => {});

    await recommendationService.insert(recommendation);

    expect(recommendationRepository.findByName).toBeCalled();
    expect(recommendationRepository.create).toBeCalled();
  });

  it("Testa a função 'insert' quando já existe o elemento cadastrado", async () => {
    const recommendation = {
      name: faker.name.fullName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
        11
      )}`,
    };

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockImplementationOnce((): any => {
        return {
          name: recommendation.name,
          youtubeLink: recommendation.youtubeLink
        }
      });

    const promise = recommendationService.insert(recommendation);

    expect(promise).rejects.toEqual({
      type: 'conflict',
      message: 'Recommendations names must be unique'
    });
  });

  it("Testa a função 'upvote'", async () => {
    const id = 2;

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          id: id,
        };
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {});

    await recommendationService.upvote(id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("Testa a função 'downvote'", async () => {
    const id = 2;

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          id: id,
        };
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {
          score: 10,
        };
      });

    await recommendationService.downvote(id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
  });

  it("Testa a função 'downvote' com score da recomendação menor que -5", async () => {
    const id = 2;

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce((): any => {
        return {
          id: id,
        };
      });

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockImplementationOnce((): any => {
        return {
          score: -10,
        };
      });

    jest
      .spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});

    await recommendationService.downvote(id);

    expect(recommendationRepository.find).toBeCalled();
    expect(recommendationRepository.updateScore).toBeCalled();
    expect(recommendationRepository.remove).toBeCalled();
  });

  it("Testa a função 'get'", async () => {
    const recommendation = {
      name: faker.name.fullName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
        11
      )}`,
    };

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => {
        return {
          recommendation
        }
      });

    const result = await recommendationService.get();

    expect(recommendationRepository.findAll).toBeCalled();
    expect(result).not.toBe(null)
  });

  it("Testa a função 'getTop'", async () => {
    const recommendation = {
      name: faker.name.fullName(),
      youtubeLink: `https://www.youtube.com/watch?v=${faker.random.alphaNumeric(
        11
      )}`,
    };

    const amount = 10

    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => {
        return {
          recommendation
        }
      });

    const result = await recommendationService.getTop(10);

    expect(recommendationRepository.getAmountByScore).toBeCalled();
    expect(result).not.toBe(null)
  });

  it("Testa a função 'getRandom'", async () => {
  });
});
