import { describe, expect, it, vi } from 'vitest'
import { fetchGameById, fetchGames } from '../services/rawgService'

const mockResponse = (data) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  })

describe('rawgService', () => {
  it('builds a request with query params', async () => {
    const fetchMock = vi.fn().mockImplementation(() => mockResponse({ results: [] }))
    vi.stubGlobal('fetch', fetchMock)

    await fetchGames({ search: 'halo', pageSize: 10, genre: 'action' }, { apiKey: 'test-key' })

    expect(fetchMock).toHaveBeenCalledOnce()
    const calledUrl = fetchMock.mock.calls[0][0]
    expect(calledUrl).toContain('search=halo')
    expect(calledUrl).toContain('page_size=10')
    expect(calledUrl).toContain('genres=action')
    expect(calledUrl).toContain('key=test-key')
  })

  it('fetches a game by id', async () => {
    const fetchMock = vi.fn().mockImplementation(() => mockResponse({ id: 42 }))
    vi.stubGlobal('fetch', fetchMock)

    const data = await fetchGameById(42, { apiKey: 'test-key' })

    expect(data.id).toBe(42)
  })
})
