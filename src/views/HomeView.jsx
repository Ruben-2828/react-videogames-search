import ErrorState from '../components/ErrorState'
import FilterBar from '../components/FilterBar'
import LoadingState from '../components/LoadingState'
import VideogameList from '../components/VideogameList'
import { useVideogameListViewModel } from '../viewmodels/VideogameListViewModel'

function HomeView() {
  const {
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
  } = useVideogameListViewModel()

  const handleClear = () => {
    const nextFilters = { name: '', genre: 'all' }
    clearFilters()
    applyFilters(nextFilters)
  }

  const renderPagination = () => (
    <div className="pager" role="group" aria-label="Pagination">
      <button
        type="button"
        className="primary-button"
        onClick={goToPreviousPage}
        disabled={page <= 1 || status === 'loading'}
      >
        Previous
      </button>
      <button
        type="button"
        className="primary-button"
        onClick={goToNextPage}
        disabled={!hasNextPage || status === 'loading'}
      >
        Next
      </button>
    </div>
  )

  return (
    <section className="page">
      <div className="page__intro">
        <p className="eyebrow">Browse the library</p>
        <h1>Discover videogames with strong reviews</h1>
        <p className="lead">
          Search by title, narrow by genre, and explore details without leaving
          the page.
        </p>
      </div>

      <FilterBar
        nameValue={filters.name}
        genreValue={filters.genre}
        genres={genres}
        onNameChange={setNameFilter}
        onGenreChange={setGenreFilter}
        onClear={handleClear}
        onSubmit={() => applyFilters()}
      />

      <div className="view-toggle" role="group" aria-label="View mode">
        <button
          type="button"
          className={viewMode === 'card' ? 'toggle-button is-active' : 'toggle-button'}
          onClick={() => setViewMode('card')}
          aria-pressed={viewMode === 'card'}
        >
          Card view
        </button>
        <button
          type="button"
          className={viewMode === 'list' ? 'toggle-button is-active' : 'toggle-button'}
          onClick={() => setViewMode('list')}
          aria-pressed={viewMode === 'list'}
        >
          List view
        </button>
      </div>

      {status === 'loading' && <LoadingState label="Loading games..." />}
      {status === 'error' && <ErrorState message={error} />}

      {status === 'success' && games.length === 0 && (
        <p className="empty-state">No games match the current filters.</p>
      )}

      {status === 'success' && games.length > 0 && (
        <>
          {renderPagination()}
          <VideogameList games={games} variant={viewMode} />
          {renderPagination()}
        </>
      )}
    </section>
  )
}

export default HomeView
