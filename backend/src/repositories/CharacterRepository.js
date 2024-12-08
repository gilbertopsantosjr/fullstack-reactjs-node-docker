import axios from "axios";
import {
  fetchAllDataInParallel,
  fetchAllInParallel,
} from "../infra/utils/axios.util";
import makeCharacter from "../infra/utils/maker.character";

export default class CharacterRepository {
  async findById(id) {
    try {
      console.log(`searching people by: ${id}`);
      const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
      let films = [];
      if (response.data.films) {
        films = await fetchAllInParallel(
          `character:${id}`,
          response.data.films
        );
      }
      return makeCharacter(response.data, films);
    } catch (error) {
      const message = `Failed to fetch character data by id. ${id}`;
      console.error(`${message},${error}`);
      throw new Error(message);
    }
  }

  async findAllBy(query) {
    try {
      console.log(`searching people by: ${query}`);
      const result = [];
      const response = await fetchAllDataInParallel(
        `https://swapi.dev/api/people/`
      );

      response.map((p) => {
        const person = makeCharacter(p);
        result.push(person);
      });

      if (query) {
        return result
          .map((person) => {
            return person.name.toLowerCase().includes(query.toLowerCase())
              ? person
              : null;
          })
          .reduce((acc, person) => {
            if (person) acc.push(person);
            return acc;
          }, []);
      }

      return result;
    } catch (error) {
      const message = "Failed to fetch character data. ";
      console.error(`${message},${error}`);
      throw new Error(message);
    }
  }
}
