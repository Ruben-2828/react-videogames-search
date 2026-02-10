import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { useVideogameListViewModel } from '../viewmodels/VideogameListViewModel'
import { fetchGames, fetchGenres } from '../services/rawgService'

vi.mock('../services/rawgService', () => ({
  fetchGames: vi.fn(),
  fetchGenres: vi.fn(),
}))

const sampleResponse = {
  results: [
    {
      id: 1,
      name: 'Hades',
      released: '2020-09-17',
      rating: 4.4,
      background_image: 'image.jpg',
      genres: [{ name: 'Action' }],
    },
    {
      id: 2,
      name: 'Celeste',
      released: '2018-01-25',
      rating: 4.5,
      background_image: 'image-2.jpg',
      genres: [{ name: 'Platformer' }],
    },
  ],
}

function TestHarness() {
  const { status, games, setNameFilter, applyFilters } = useVideogameListViewModel()

  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="count">{games.length}</span>
      <button
        type="button"
        onClick={() => {
          setNameFilter('hades')
          applyFilters({ name: 'hades', genre: 'all' })
        }}
      >
        Filter
      </button>
    </div>
  )
}

describe('VideogameListViewModel', () => {
  it('loads and filters games', async () => {
    fetchGames.mockResolvedValue(sampleResponse)
    fetchGenres.mockResolvedValue({ results: [{ name: 'Action', slug: 'action' }] })

    render(<TestHarness />)

    await waitFor(() => {
      expect(screen.getByTestId('status')).toHaveTextContent('success')
    })

    expect(screen.getByTestId('count')).toHaveTextContent('2')

    fetchGames.mockResolvedValue({ results: [sampleResponse.results[0]] })

    screen.getByRole('button', { name: /filter/i }).click()

    await waitFor(() => {
      expect(screen.getByTestId('count')).toHaveTextContent('1')
    })
  })
})
