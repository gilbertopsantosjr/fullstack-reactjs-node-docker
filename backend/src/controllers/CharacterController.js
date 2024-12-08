export default class CharacterController {
  constructor(getCharacterUseCase, queryMetricsService) {
    this.getCharacterUseCase = getCharacterUseCase;
    this.queryMetricsService = queryMetricsService;
  }

  async getCharacter(req, res) {
    try {
      const { id } = req.params;
      await this.queryMetricsService.trackQuery(
        "characters",
        `character-${id}`
      );
      const character = await this.getCharacterUseCase.execute(id);
      res.status(200).json(character);
    } catch (error) {
      console.error(`error`, error);
      res.status(400).json({ error: error.message });
    }
  }
}
