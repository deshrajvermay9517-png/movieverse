import MovieCard from "./MovieCard";

function MovieList({
  movies,
  onViewDetails,
  onToggleFavorite,
  favorites,
}) {
  return (
    <section className="movie-grid">
      {movies.map((movie) => {
        const isFavorite = favorites.some(
          (favMovie) => favMovie.imdbID === movie.imdbID
        );

        return (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onViewDetails={onViewDetails}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite}
          />
        );
      })}
    </section>
  );
}

export default MovieList;