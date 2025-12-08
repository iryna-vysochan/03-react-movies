import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  if (!query.trim()) return [];

  const config = {
    params: {
      query,
      include_adult: false,
      page: 1,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const res = await axios.get<FetchMoviesResponse>(BASE_URL, config);

  return res.data.results;
}

