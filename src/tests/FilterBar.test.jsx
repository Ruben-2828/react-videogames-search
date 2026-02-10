import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import FilterBar from '../components/FilterBar'

describe('FilterBar', () => {
  it('fires change callbacks', () => {
    const onNameChange = vi.fn()
    const onGenreChange = vi.fn()

    render(
      <FilterBar
        nameValue=""
        genreValue="all"
        genres={['Action']}
        onNameChange={onNameChange}
        onGenreChange={onGenreChange}
        onClear={() => {}}
      />,
    )

    fireEvent.change(screen.getByPlaceholderText(/e.g. Hades/i), {
      target: { value: 'Halo' },
    })

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Action' },
    })

    expect(onNameChange).toHaveBeenCalledWith('Halo')
    expect(onGenreChange).toHaveBeenCalledWith('Action')
  })
})
