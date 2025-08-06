import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import React from "react";

type MovieDetailsDialogProps = {
  selectedMovie: any; // You can replace `any` with a proper Movie type if you have one
  setSelectedMovie: (movie: any | null) => void;
  movieDetailsLoading: boolean;
};

const MovieDetailsDialog: React.FC<MovieDetailsDialogProps> = ({
  selectedMovie,
  setSelectedMovie,
  movieDetailsLoading,
}) => {
  return (
    <Dialog open={!!selectedMovie} onOpenChange={() => setSelectedMovie(null)}>
      <DialogContent className="max-w-4xl bg-white border-gray-200 text-gray-900 max-h-[90vh] overflow-y-auto">
        {movieDetailsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          selectedMovie && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedMovie.Title}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <img
                    src={
                      selectedMovie.Poster !== "N/A"
                        ? selectedMovie.Poster
                        : "https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
                    }
                    alt={selectedMovie.Title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      {selectedMovie.Type}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-gray-300 text-gray-700"
                    >
                      {selectedMovie.Year}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-gray-300 text-gray-700"
                    >
                      {selectedMovie.Runtime}
                    </Badge>
                    {selectedMovie.imdbRating !== "N/A" && (
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                        ⭐ {selectedMovie.imdbRating}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-blue-600">
                      Plot
                    </h4>
                    <p className="text-gray-700">{selectedMovie.Plot}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-1 text-blue-600">
                        Director
                      </h4>
                      <p className="text-gray-700">{selectedMovie.Director}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-blue-600">
                        Released
                      </h4>
                      <p className="text-gray-700">{selectedMovie.Released}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-blue-600">
                        Genre
                      </h4>
                      <p className="text-gray-700">{selectedMovie.Genre}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-blue-600">
                        Rating
                      </h4>
                      <p className="text-gray-700">{selectedMovie.Rating}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-blue-600">Cast</h4>
                    <p className="text-gray-700">{selectedMovie.Actors}</p>
                  </div>

                  {selectedMovie.Awards !== "N/A" && (
                    <div>
                      <h4 className="font-semibold mb-2 text-blue-600">
                        Awards
                      </h4>
                      <p className="text-gray-700">{selectedMovie.Awards}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsDialog;
