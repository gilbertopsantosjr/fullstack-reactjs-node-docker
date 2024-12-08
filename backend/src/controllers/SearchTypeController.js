export default class SearchTypeController {
  constructor(searchTypeUseCase, queryMetricsService) {
    this.searchTypeUseCase = searchTypeUseCase;
    this.queryMetricsService = queryMetricsService;
  }

  async search(req, res) {
    try {
      const { type } = req.params;
      const { input } = req.query;
      await this.queryMetricsService.trackQuery("search", `${type}-${input}`);
      const result = await this.searchTypeUseCase.execute(type, input);
      res.status(200).json(result);
    } catch (error) {
      console.error(`error`, error);
      res.status(400).json({ error: error.message });
    }
  }
}
