import SearchTypeController from "../controllers/SearchTypeController";
import SearchTypeUseCase from "../usecases/SearchTypeUseCase";

export default class SearchTypeModuleFactory {
  static create(app, queryMetricsService) {
    const searchTypeUseCase = new SearchTypeUseCase();
    const searchTypeController = new SearchTypeController(
      searchTypeUseCase,
      queryMetricsService
    );

    app.get("/search/:type", async (req, res) => {
      try {
        searchTypeController.search(req, res);
      } catch (error) {
        console.error(error);
        res.status(500).send(`Error fetching data: ${error}`);
      }
    });

    app.get("/search/metrics/queries", (req, res) => {
      const searchQueries = queryMetricsService.getTopQueries().search;
      res.json(searchQueries);
    });
  }
}
