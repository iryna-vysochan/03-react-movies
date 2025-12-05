import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import MovieModal from "./components/MovieModal/MovieModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMassage";
import { fetchMovies } from "./services/movieService";
import type { Movie } from "./types/movie";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query) return;

    async function load() {
      try {
        setError(false);
        setLoading(true);
        setMovies([]);

        const data = await fetchMovies(query);

        if (data.length === 0) {
          toast.error("No movies found for your request.");
        }

        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [query]);

  return (
    <>
      <Toaster position="top-right" />

      <SearchBar onSubmit={setQuery} />

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}


