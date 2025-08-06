"use client";

import { Search, Filter, Grid, List, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMovieFinder } from "@/hooks/useMovieFinder";
import MovieDetailsDialog from "@/components/MovieDetailsDialog";
import MovieCard from "@/components/MovieCard";
import MovieSkeletonGrid from "@/components/MovieSkeletonGrid";
import MovieSkeletonList from "@/components/MovieSkeletonList";
import FullPageLoader from "@/components/FullPageLoader";

export default function Home() {
  const {
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
  } = useMovieFinder();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MovieFinder
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Discover your next favorite movie or series
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-8 border border-gray-200 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 mb-6 w-full">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for movies, series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 items-center justify-start lg:justify-center">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 text-sm">Filters:</span>
            </div>

            <Select
              value={selectedType}
              onValueChange={(value) =>
                setSelectedType(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-full sm:w-32 bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="movie">Movie</SelectItem>
                <SelectItem value="series">Series</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full sm:w-24 bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              min="1900"
              max="2025"
            />

            {(selectedType || selectedYear) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-600">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Results */}
        {loading ? (
          viewMode === "grid" ? (
            <MovieSkeletonGrid />
          ) : (
            <MovieSkeletonList />
          )
        ) : movies.length > 0 ? (
          <>
            {/* Results Count */}
            <div className="mb-4 sm:mb-6">
              <p className="text-gray-600 text-sm sm:text-base">
                Showing {(currentPage - 1) * 10 + 1}-
                {Math.min(currentPage * 10, totalResults)} of {totalResults}{" "}
                results
              </p>
            </div>

            {/* Movie Cards */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
                  : "space-y-4 mb-8"
              }
            >
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  viewMode={viewMode}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center flex-wrap items-center gap-2 mb-8">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </Button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let startPage = Math.max(
                      1,
                      Math.min(
                        currentPage - 2,
                        totalPages - 4 > 0 ? totalPages - 4 : 1
                      )
                    );
                    const pageNum = startPage + i;
                    if (pageNum > totalPages) return null;
                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10 text-gray-700 border-gray-300 hover:bg-gray-50"
                        style={
                          currentPage === pageNum ? { color: "white" } : {}
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : searchTerm && !loading ? (
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start your search
            </h3>
            <p className="text-gray-600">
              Enter a movie or series name to get started
            </p>
          </div>
        )}

        {/* Movie Details Modal */}
        <MovieDetailsDialog
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          movieDetailsLoading={movieDetailsLoading}
        />

        {movieDetailsLoading && <FullPageLoader />}
      </div>
    </div>
  );
}
