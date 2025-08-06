import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface MovieCardProps {
  movie: Movie;
  viewMode: "grid" | "list";
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, viewMode, onClick }) => {
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop";

  return (
    <Card
      key={movie.imdbID}
      onClick={() => onClick(movie)}
      className={`bg-white border-gray-200 hover:bg-gray-50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 shadow-md ${
        viewMode === "list" ? "flex flex-row" : ""
      }`}
    >
      <CardContent
        className={`p-0 ${viewMode === "list" ? "flex flex-row w-full" : ""}`}
      >
        <div className={viewMode === "list" ? "w-32 flex-shrink-0" : ""}>
          <img
            src={poster}
            alt={movie.Title}
            className={`w-full object-cover rounded-t-lg ${
              viewMode === "list" ? "h-32 rounded-l-lg rounded-t-none" : "h-64"
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&fit=crop";
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {movie.Title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              {movie.Type}
            </Badge>
            <span className="text-gray-500 text-sm">{movie.Year}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
