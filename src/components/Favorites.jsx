function Favorites({ favorites, onViewDetails, onToggleFavorite }) {
  if (favorites.length === 0) {
    return (
      <section className="favorites-section">
        <h2>Favorite Movies</h2>
        <p className="empty-text">No favorite movies added yet.</p>
      </section>
    );
  }

  return (
    <section className="favorites-section">
      <h2>Favorite Movies</h2>

      <div className="favorite-list">
        {favorites.map((movie) => (
          <div className="favorite-item" key={movie.imdbID}>
            <span>{movie.Title}</span>

            <div>
              <button onClick={() => onViewDetails(movie.imdbID)}>
                Details
              </button>

              <button
                className="remove-btn"
                onClick={() => onToggleFavorite(movie)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Favorites;