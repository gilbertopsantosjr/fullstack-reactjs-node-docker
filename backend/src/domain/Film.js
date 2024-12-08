export default class Film {
  constructor({
    name,
    episode_id,
    opening_crawl,
    director,
    producer,
    release_date,
    url,
    characters,
  }) {
    this.name = name;
    this.episode_id = episode_id;
    this.opening_crawl = opening_crawl;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
    this.url = url;
    this.characters = characters;
  }
}
