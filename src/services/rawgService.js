import {
  RAWG_API_BASE_URL,
  RAWG_DEFAULT_PAGE_SIZE,
  RAWG_DEFAULT_GENRE_PAGE_SIZE,
  RAWG_GAMES_ORDERING,
  RAWG_GENRES_ORDERING,
  RAWG_API_KEY,
} from '../constants/rawgConstants'

const buildUrl = (path, params, apiKey) => {
  const url = new URL(`${RAWG_API_BASE_URL}${path}`)
  const searchParams = new URLSearchParams(params)

  if (!apiKey) {
    throw new Error('Missing RAWG API key. Set VITE_RAWG_API_KEY in a .env file.')
  }

  searchParams.set('key', apiKey)
  url.search = searchParams.toString()
  return url.toString()
}

const request = async (path, params = {}, { signal, apiKey } = {}) => {
  const url = buildUrl(path, params, apiKey ?? RAWG_API_KEY)
  const response = await fetch(url, { signal })

  if (!response.ok) {
    throw new Error(`RAWG request failed with status ${response.status}.`)
  }

  return response.json()
}

export const fetchGames = async (
  { page = 1, pageSize = RAWG_DEFAULT_PAGE_SIZE, search = '', genre = '' } = {},
  { signal, apiKey } = {},
) => {
  const params = {
    page,
    page_size: pageSize,
    search,
    ordering: RAWG_GAMES_ORDERING,
  }

  if (genre) {
    params.genres = genre
  }

  return request('/games', params, { signal, apiKey })
}

export const fetchGameById = async (id, { signal, apiKey } = {}) => {
  if (!id) {
    throw new Error('Game id is required to fetch details.')
  }

  return request(`/games/${id}`, {}, { signal, apiKey })
}

export const fetchGenres = async (
  { page = 1, pageSize = RAWG_DEFAULT_GENRE_PAGE_SIZE } = {},
  { signal, apiKey } = {},
) => {
  return request(
    '/genres',
    {
      page,
      page_size: pageSize,
      ordering: RAWG_GENRES_ORDERING,
    },
    { signal, apiKey },
  )
}
