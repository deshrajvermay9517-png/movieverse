function MovieCard({
  movie,
  onViewDetails,
  onToggleFavorite,
  isFavorite,
}) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <article className="movie-card">
      <img src={poster} alt={`${movie.Title} poster`} />

      <div className="movie-card-body">
        <h3>{movie.Title}</h3>

        <p>
          <strong>Year:</strong> {movie.Year}
        </p>

        <p>
          <strong>Type:</strong> {movie.Type}
        </p>

        <div className="movie-actions">
          <button onClick={() => onViewDetails(movie.imdbID)}>
            View Details
          </button>

          <button
            className={isFavorite ? "remove-btn" : "secondary-btn"}
            onClick={() => onToggleFavorite(movie)}
          >
            {isFavorite ? "Remove" : "Favorite"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;