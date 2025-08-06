import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MovieSkeletonList: React.FC = () => {
  return (
    <div className="space-y-4">
      {[...Array(8)].map((_, i) => (
        <Card
          key={i}
          className="flex flex-row items-start gap-4 bg-white border-gray-200 shadow-md p-4"
        >
          <Skeleton className="w-32 h-32 bg-gray-200 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4 bg-gray-200" />
            <Skeleton className="h-4 w-1/2 bg-gray-200" />
            <Skeleton className="h-3 w-1/3 bg-gray-200" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MovieSkeletonList;
