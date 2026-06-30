function SearchBar({
  searchText,
  setSearchText,
  selectedType,
  setSelectedType,
  onSearch,
}) {
  return (
    <form className="search-section" onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Search movies like Batman, Avengers, Inception..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <select
        value={selectedType}
        onChange={(event) => setSelectedType(event.target.value)}
      >
        <option value="all">All</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="episode">Episodes</option>
      </select>

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;