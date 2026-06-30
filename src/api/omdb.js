const API_BASE_URL = "https://www.omdbapi.com/";

function getApiKey() {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  if (!apiKey) {
    throw new Error("OMDb API key is missing. Please add VITE_OMDB_API_KEY in .env file.");
  }

  return apiKey;
}

export async function searchMovies({ query, type = "all", page = 1 }) {
  const apiKey = getApiKey();

  const params = new URLSearchParams({
    apikey: apiKey,
    s: query,
    page: String(page),
  });

  if (type !== "all") {
    params.set("type", type);
  }

  const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No movies found.");
  }

  return data;
}

export async function getMovieDetails(imdbID) {
  const apiKey = getApiKey();

  const params = new URLSearchParams({
    apikey: apiKey,
    i: imdbID,
    plot: "full",
  });

  const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie details not found.");
  }

  return data;
}