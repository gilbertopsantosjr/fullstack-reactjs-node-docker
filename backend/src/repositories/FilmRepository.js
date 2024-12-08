import axios from "axios";
import {
  fetchAllDataInParallel,
  fetchAllInParallel,
} from "../infra/utils/axios.util";
import makeFilm from "../infra/utils/maker.film";

export default class FilmsRepository {
  async findById(id) {
    try {
      const response = await axios.get(`https://swapi.dev/api/films/${id}/`);
      let characters = [];
      if (response.data.characters) {
        characters = await fetchAllInParallel(
          `film:${id}`,
          response.data.characters
        );
      }

      return makeFilm(response.data, characters);
    } catch (error) {
      const message = `Failed to fetch character data by id. ${id}`;
      console.error(`${message},${error}`);
      throw new Error(message);
    }
  }

  async findAllBy(query) {
    try {
      const result = [];
      const response = await fetchAllDataInParallel(
        `https://swapi.dev/api/films/`
      );

      response.map((film) => {
        const f = makeFilm(film);
        result.push(f);
      });

      if (query) {
        return result
          .map((film) => {
            return film.name.toLowerCase().includes(query.toLowerCase())
              ? film
              : null;
          })
          .reduce((acc, film) => {
            if (film) acc.push(film);
            return acc;
          }, []);
      }

      return result;
    } catch (error) {
      const message = "Failed to fetch film data.";
      console.error(`${message},${error}`);
      throw new Error(message);
    }
  }
}
