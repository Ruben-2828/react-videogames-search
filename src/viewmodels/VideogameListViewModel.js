import { useCallback, useEffect, useRef, useState } from 'react'
import Videogame from '../models/Videogame'
import { fetchGames, fetchGenres } from '../services/rawgService'

const initialFilters = {
  name: '',
  genre: 'all',
}

export const useVideogameListViewModel = () => {
  const [games, setGames] = useState([])
  const [filters, setFilters] = useState(initialFilters)
  const [viewMode, setViewMode] = useState('card')
  const [genres, setGenres] = useState([])
  const [genreMap, setGenreMap] = useState({})
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const controllerRef = useRef(null)

  const mapGenres = (items) => {
    const map = {}
    const names = items
      .map((genre) => {
        map[genre.name] = genre.slug
        return genre.name
      })
      .sort()

    setGenres(names)
    setGenreMap(map)
  }

  const loadGames = useCallback(async ({ nextFilters, nextPage }) => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    const controller = new AbortController()
    controllerRef.current = controller

    try {
      setStatus('loading')
      setError('')
      const genreSlug =
        nextFilters.genre === 'all' ? '' : genreMap[nextFilters.genre]
      const searchTerm = nextFilters.name.trim()
      const data = await fetchGames(
        {
          search: searchTerm,
          genre: genreSlug,
          page: nextPage,
        },
        { signal: controller.signal },
      )
      const results = Array.isArray(data.results) ? data.results : []
      const mapped = results.map((item) => Videogame.fromApi(item))
      setGames(mapped)
      setPage(nextPage)
      setHasNextPage(Boolean(data.next))
      setStatus('success')
    } catch (err) {
      if (err.name === 'AbortError') {
        return
      }
      setError(err.message)
      setStatus('error')
    }
  }, [genreMap])

  useEffect(() => {
    const controller = new AbortController()
    controllerRef.current = controller

    const loadInitial = async () => {
      try {
        setStatus('loading')
        const [gamesData, genresData] = await Promise.all([
          fetchGames({ page: 1 }, { signal: controller.signal }),
          fetchGenres({}, { signal: controller.signal }),
        ])
        const results = Array.isArray(gamesData.results) ? gamesData.results : []
        const mapped = results.map((item) => Videogame.fromApi(item))
        setGames(mapped)
        setPage(1)
        setHasNextPage(Boolean(gamesData.next))

        const genreResults = Array.isArray(genresData.results)
          ? genresData.results
          : []
        mapGenres(genreResults)
        setStatus('success')
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }
        setError(err.message)
        setStatus('error')
      }
    }

    loadInitial()

    return () => controller.abort()
  }, [])

  const setNameFilter = (value) => {
    setFilters((prev) => ({ ...prev, name: value }))
  }

  const setGenreFilter = (value) => {
    setFilters((prev) => ({ ...prev, genre: value }))
  }

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  const applyFilters = async (nextFilters = filters) => {
    if (nextFilters !== filters) {
      setFilters(nextFilters)
    }
    await loadGames({ nextFilters, nextPage: 1 })
  }

  const goToNextPage = async () => {
    if (!hasNextPage || status === 'loading') {
      return
    }

    await loadGames({ nextFilters: filters, nextPage: page + 1 })
  }

  const goToPreviousPage = async () => {
    if (page <= 1 || status === 'loading') {
      return
    }

    await loadGames({ nextFilters: filters, nextPage: page - 1 })
  }

  return {
    games,
    genres,
    filters,
    viewMode,
    page,
    hasNextPage,
    status,
    error,
    setNameFilter,
    setGenreFilter,
    clearFilters,
    setViewMode,
    applyFilters,
    goToNextPage,
    goToPreviousPage,
  }
}
