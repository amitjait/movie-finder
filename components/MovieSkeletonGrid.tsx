import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MovieSkeletonGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Card key={i} className="bg-white border-gray-200 shadow-md">
          <CardContent className="p-4">
            <Skeleton className="w-full h-64 bg-gray-200 mb-4 rounded" />
            <Skeleton className="h-4 bg-gray-200 mb-2" />
            <Skeleton className="h-3 bg-gray-200 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MovieSkeletonGrid;
