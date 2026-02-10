import { useEffect, useState } from 'react'
import Videogame from '../models/Videogame'
import { fetchGameById } from '../services/rawgService'

export const useVideogameDetailViewModel = (gameId) => {
  const [game, setGame] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {

    const controller = new AbortController()

    const loadGame = async () => {
      try {
        setStatus('loading')
        const data = await fetchGameById(gameId, { signal: controller.signal })
        setGame(Videogame.fromApi(data))
        setStatus('success')
      } catch (err) {
        if (err.name === 'AbortError') {
          return
        }
        setError(err.message)
        setStatus('error')
      }
    }

    loadGame()

    return () => controller.abort()
  }, [gameId])

  return { game, status, error }
}
