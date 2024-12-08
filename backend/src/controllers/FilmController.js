export default class FilmController {
  constructor(getFilmUseCase, queryMetricsService) {
    this.getFilmUseCase = getFilmUseCase;
    this.queryMetricsService = queryMetricsService;
  }

  async getFilm(req, res) {
    try {
      const { id } = req.params;
      await this.queryMetricsService.trackQuery("films", `film-${id}`);
      const filme = await this.getFilmUseCase.execute(id);
      res.status(200).json(filme);
    } catch (error) {
      console.error(`error`, error);
      res.status(400).json({ error: error.message });
    }
  }
}
