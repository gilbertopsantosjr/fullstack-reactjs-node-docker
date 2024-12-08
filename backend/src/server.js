import cors from "cors";
import express from "express";

import CharacterModuleFactory from "./factories/CharacterModuleFactory";
import FilmModuleFactory from "./factories/FilmModuleFactory";
import SearchTypeModuleFactory from "./factories/SearchTypeModuleFactory";
import { fetchAllDataInParallel } from "./infra/utils/axios.util";
import QueryMetricsService from "./service/QueryMetricsService";

const app = express();
app.use(cors());
const port = 5000;

// Initialize service
const queryMetricsService = new QueryMetricsService();
queryMetricsService.schedulePeriodicComputation();

// Routes
CharacterModuleFactory.create(app, queryMetricsService);
SearchTypeModuleFactory.create(app, queryMetricsService);
FilmModuleFactory.create(app, queryMetricsService);

app.listen(port, async () => {
  await fetchAllDataInParallel(`https://swapi.dev/api/films/`);
  await fetchAllDataInParallel(`https://swapi.dev/api/people/`);
  console.log(`Server running on http://localhost:${port}`);
});
