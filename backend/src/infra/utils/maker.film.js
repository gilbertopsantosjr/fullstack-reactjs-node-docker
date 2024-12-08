import Character from "../../domain/Character";
import Film from "../../domain/Film";

export default function makeFilm(data, response) {
  let url = data.url.replace("https://swapi.dev/api/", "");
  let characters = [];
  if (response) {
    characters = response.map((c) => {
      let url = c.url.replace("https://swapi.dev/api/", "");
      return new Character(
        c.name,
        c.height,
        c.mass,
        c.gender,
        url,
        c.birth_year,
        c.eye_color,
        c.hair_color
      );
    });
  }

  return new Film({
    name: data.title,
    episode_id: data.episode_id,
    opening_crawl: data.opening_crawl,
    director: data.director,
    producer: data.producer,
    release_date: data.release_date,
    url: url,
    characters: characters,
  });
}
