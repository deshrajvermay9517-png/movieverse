function MovieDetails({ movieDetails, onClose, onToggleFavorite, isFavorite }) {
  if (!movieDetails) {
    return null;
  }

  const poster =
    movieDetails.Poster && movieDetails.Poster !== "N/A"
      ? movieDetails.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <section className="details-section">
      <div className="details-card">
        <img src={poster} alt={`${movieDetails.Title} poster`} />

        <div className="details-content">
          <div className="details-header">
            <h2>{movieDetails.Title}</h2>
            <button className="close-btn" onClick={onClose}>
              X
            </button>
          </div>

          <p>
            <strong>Year:</strong> {movieDetails.Year}
          </p>

          <p>
            <strong>Genre:</strong> {movieDetails.Genre}
          </p>

          <p>
            <strong>Director:</strong> {movieDetails.Director}
          </p>

          <p>
            <strong>Actors:</strong> {movieDetails.Actors}
          </p>

          <p>
            <strong>IMDb Rating:</strong> {movieDetails.imdbRating}
          </p>

          <p>
            <strong>Runtime:</strong> {movieDetails.Runtime}
          </p>

          <p>
            <strong>Plot:</strong> {movieDetails.Plot}
          </p>

          <button
            className={isFavorite ? "remove-btn" : "secondary-btn"}
            onClick={() => onToggleFavorite(movieDetails)}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;