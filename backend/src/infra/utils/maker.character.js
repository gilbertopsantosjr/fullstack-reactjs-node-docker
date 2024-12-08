import Character from "../../domain/Character";
import Film from "../../domain/Film";

export default function makeCharacter(data, response) {
  const url = data.url.replace("https://swapi.dev/api/", "");
  let films = [];
  if (response) {
    films = response.map((film) => {
      let url = film.url.replace("https://swapi.dev/api/", "");
      return new Film({
        name: film.title,
        episode_id: film.episode_id,
        opening_crawl: film.opening_crawl,
        director: film.director,
        producer: film.producer,
        release_date: film.release_date,
        url,
      });
    });
  }
  return new Character(
    data.name,
    data.height,
    data.mass,
    data.gender,
    url,
    data.birth_year,
    data.eye_color,
    data.hair_color,
    films
  );
}
