export default class GetCharacterByIdUseCase {
  constructor(characterRepository) {
    this.characterRepository = characterRepository;
  }

  async execute(id) {
    if (!id) {
      throw new Error("Character ID is required.");
    }

    const characterData = await this.characterRepository.findById(id);
    return characterData;
  }
}
