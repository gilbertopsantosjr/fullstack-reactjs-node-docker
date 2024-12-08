import CharacterRepository from "../repositories/CharacterRepository";
import FilmRepository from "../repositories/FilmRepository";

export default class SearchTypeUseCase {
  async execute(type, input) {
    if (!type) {
      throw new Error("Type search is required.");
    }

    const repository = this.resolver(type);
    return await repository.findAllBy(input);
  }

  resolver(type) {
    switch (type) {
      case "films":
        return new FilmRepository();

      case "people":
        return new CharacterRepository();

      default:
        throw new Error("Type search is not valid.");
    }
  }
}
