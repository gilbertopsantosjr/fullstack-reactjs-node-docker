import CharacterController from "../controllers/CharacterController";
import CharacterRepository from "../repositories/CharacterRepository";
import GetCharacterByIdUseCase from "../usecases/GetCharacterByIdUseCase";

export default class CharacterModuleFactory {
  static create(app, queryMetricsService) {
    const chrctrRepository = new CharacterRepository();
    const getCharacterUseCase = new GetCharacterByIdUseCase(chrctrRepository);
    const characterController = new CharacterController(
      getCharacterUseCase,
      queryMetricsService
    );

    app.get("/character/:id", async (req, res) => {
      try {
        characterController.getCharacter(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).send(`Error fetching data: ${error}`);
      }
    });
  }
}
