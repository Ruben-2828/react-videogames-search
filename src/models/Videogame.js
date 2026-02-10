class Videogame {
  constructor({
    id,
    name,
    released,
    rating,
    backgroundImage,
    genres,
    platforms,
    description,
  }) {
    this.id = id
    this.name = name
    this.released = released
    this.rating = rating
    this.backgroundImage = backgroundImage
    this.genres = genres
    this.platforms = platforms
    this.description = description
  }

  static fromApi(data) {
    return new Videogame({
      id: data.id,
      name: data.name,
      released: data.released,
      rating: data.rating,
      backgroundImage: data.background_image,
      genres: Array.isArray(data.genres) ? data.genres : [],
      platforms: Array.isArray(data.platforms) ? data.platforms : [],
      description: data.description_raw || '',
    })
  }

  get genreNames() {
    return this.genres.map((genre) => genre.name)
  }

  get platformNames() {
    return this.platforms.map((entry) => entry.platform?.name).filter(Boolean)
  }
}

export default Videogame
