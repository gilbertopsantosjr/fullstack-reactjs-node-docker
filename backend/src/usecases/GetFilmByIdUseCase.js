export default class GetFilmByIdUseCase {
  constructor(filmRepository) {
    this.filmRepository = filmRepository;
  }

  async execute(id) {
    if (!id) {
      throw new Error("Film ID is required.");
    }

    const filmData = await this.filmRepository.findById(id);
    return filmData;
  }
}
