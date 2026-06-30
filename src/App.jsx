import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import { getMovieDetails, searchMovies } from "./api/omdb";

function App() {
  const [searchText, setSearchText] = useState("batman");
  const [activeQuery, setActiveQuery] = useState("batman");
  const [selectedType, setSelectedType] = useState("all");

  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteMovies");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  async function fetchMovies(query, type, pageNumber) {
    try {
      setLoading(true);
      setError("");
      setMovieDetails(null);

      const data = await searchMovies({
        query,
        type,
        page: pageNumber,
      });

      setMovies(data.Search || []);
      setTotalResults(Number(data.totalResults || 0));
      setPage(pageNumber);
      setActiveQuery(query);
    } catch (error) {
      setMovies([]);
      setTotalResults(0);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();

    const trimmedSearch = searchText.trim();

    if (trimmedSearch.length < 2) {
      setError("Please enter at least 2 characters.");
      return;
    }

    fetchMovies(trimmedSearch, selectedType, 1);
  }

  async function handleViewDetails(imdbID) {
    try {
      setDetailsLoading(true);
      setError("");

      const data = await getMovieDetails(imdbID);
      setMovieDetails(data);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setDetailsLoading(false);
    }
  }

  function handleToggleFavorite(movie) {
    const alreadyFavorite = favorites.some(
      (favMovie) => favMovie.imdbID === movie.imdbID
    );

    if (alreadyFavorite) {
      const updatedFavorites = favorites.filter(
        (favMovie) => favMovie.imdbID !== movie.imdbID
      );

      setFavorites(updatedFavorites);
    } else {
      const favoriteMovie = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type,
        Poster: movie.Poster,
      };

      setFavorites([...favorites, favoriteMovie]);
    }
  }

  function handleNextPage() {
    const totalPages = Math.ceil(totalResults / 10);

    if (page < totalPages) {
      fetchMovies(activeQuery, selectedType, page + 1);
    }
  }

  function handlePreviousPage() {
    if (page > 1) {
      fetchMovies(activeQuery, selectedType, page - 1);
    }
  }

  useEffect(() => {
    fetchMovies("batman", "all", 1);
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
  }, [favorites]);

  const totalPages = Math.ceil(totalResults / 10);

  const isSelectedMovieFavorite =
    movieDetails &&
    favorites.some((movie) => movie.imdbID === movieDetails.imdbID);

  return (
    <div>
      <Navbar favoriteCount={favorites.length} />

      <main className="container">
        <section className="hero">
          <h2>Find Your Favorite Movies</h2>
          <p>
            Search movies, series, and episodes using the OMDb API. View full
            details and save your favorite titles.
          </p>
        </section>

        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          onSearch={handleSearch}
        />

        {error && <p className="error-message">{error}</p>}

        {detailsLoading && <p className="loading-text">Loading details...</p>}

        <MovieDetails
          movieDetails={movieDetails}
          onClose={() => setMovieDetails(null)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isSelectedMovieFavorite}
        />

        <section className="result-info">
          <h2>Search Results</h2>
          <p>
            Showing results for: <strong>{activeQuery}</strong>
          </p>
        </section>

        {loading ? (
          <p className="loading-text">Loading movies...</p>
        ) : (
          <MovieList
            movies={movies}
            onViewDetails={handleViewDetails}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        )}

        {movies.length > 0 && (
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 1}>
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button onClick={handleNextPage} disabled={page === totalPages}>
              Next
            </button>
          </div>
        )}

        <Favorites
          favorites={favorites}
          onViewDetails={handleViewDetails}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>
    </div>
  );
}

export default App;