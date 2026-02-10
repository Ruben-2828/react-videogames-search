function FilterBar({
  nameValue,
  genreValue,
  genres,
  onNameChange,
  onGenreChange,
  onClear,
  onSubmit,
}) {
  const hasFilters = nameValue.trim().length > 0 || genreValue !== 'all'

  const handleSubmit = (event) => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit()
    }
  }

  return (
    <form className="filter-bar" onSubmit={handleSubmit}>
      <label className="filter-field">
        <span>Search by name</span>
        <input
          type="search"
          placeholder="e.g. Hades"
          value={nameValue}
          onChange={(event) => onNameChange(event.target.value)}
        />
      </label>
      <label className="filter-field">
        <span>Genre</span>
        <select
          value={genreValue}
          onChange={(event) => onGenreChange(event.target.value)}
        >
          <option value="all">All genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="primary-button">
        Apply filters
      </button>
      <button
        type="button"
        className="ghost-button"
        onClick={onClear}
        disabled={!hasFilters}
      >
        Clear filters
      </button>
    </form>
  )
}

export default FilterBar
