import FilmController from "../controllers/FilmController";
import FilmRepository from "../repositories/FilmRepository";
import GetFilmByIdUseCase from "../usecases/GetFilmByIdUseCase";

export default class FilmModuleFactory {
  static create(app, queryMetricsService) {
    const chrctrRepository = new FilmRepository();
    const getFilmUseCase = new GetFilmByIdUseCase(chrctrRepository);
    const filmController = new FilmController(
      getFilmUseCase,
      queryMetricsService
    );

    app.get("/films/:id", async (req, res) => {
      try {
        filmController.getFilm(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).send(`Error fetching data: ${error}`);
      }
    });
  }
}
