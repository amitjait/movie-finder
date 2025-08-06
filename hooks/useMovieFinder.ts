import { useCallback, useEffect, useState } from "react";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Actors: string;
  Director: string;
  Genre: string;
  Rating: string;
  Runtime: string;
  Released: string;
  imdbRating: string;
  Awards: string;
}

const API_KEY = "b15e4c3d";
const BASE_URL = "https://www.omdbapi.com/";

export const useMovieFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [movieDetailsLoading, setMovieDetailsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const totalPages = Math.ceil(totalResults / 10);

  const searchMovies = useCallback(
    async (term: string, page = 1, type?: string, year?: string) => {
      if (!term.trim()) {
        setMovies([]);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          apikey: API_KEY,
          s: term,
          page: page?.toString(),
        });
        if (type) params.append("type", type);
        if (year) params.append("y", year);

        const response = await fetch(`${BASE_URL}?${params}`);
        const data = await response.json();

        if (data?.Response === "True") {
          setMovies(data?.Search);
          setTotalResults(parseInt(data?.totalResults));
        } else {
          setMovies([]);
          setTotalResults(0);
          setError(data?.Error || "No results found");
        }
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchMovieDetails = async (imdbID: string) => {
    setMovieDetailsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await response.json();
      if (data?.Response === "True") {
        setSelectedMovie(data);
      }
    } catch (err) {
      console.error("Failed to fetch movie details:", err);
    } finally {
      setMovieDetailsLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    fetchMovieDetails(movie?.imdbID);
  };

  const resetFilters = () => {
    setSelectedType("");
    setSelectedYear("");
    setCurrentPage(1);
  };

  // Debounced search on input change
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentPage(1);
      searchMovies(searchTerm, 1, selectedType, selectedYear);
    }, 800);

    return () => clearTimeout(timeout);
  }, [searchTerm, selectedType, selectedYear, searchMovies]);

  // Fetch on page change
  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm, currentPage, selectedType, selectedYear);
    }
  }, [currentPage]);

  return {
    searchTerm,
    setSearchTerm,
    movies,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
    selectedType,
    setSelectedType,
    selectedYear,
    setSelectedYear,
    viewMode,
    setViewMode,
    selectedMovie,
    setSelectedMovie,
    handleMovieClick,
    movieDetailsLoading,
    resetFilters,
    totalResults,
  };
};
