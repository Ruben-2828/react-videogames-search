import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Videogame from '../models/Videogame'
import VideogameCard from '../components/VideogameCard'

const game = Videogame.fromApi({
  id: 9,
  name: 'Spiritfarer',
  released: '2020-08-18',
  rating: 4.2,
  background_image: 'image.jpg',
  genres: [{ name: 'Adventure' }],
})

describe('VideogameCard', () => {
  it('renders game information', () => {
    render(
      <MemoryRouter>
        <VideogameCard game={game} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Spiritfarer')).toBeInTheDocument()
    expect(screen.getByText(/Adventure/)).toBeInTheDocument()
    expect(screen.getByText(/Rating:/)).toBeInTheDocument()
  })
})
