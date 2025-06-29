
import React from "react";

export default function BookCardSkeleton() {
  return (
    <div className="w-[200px] h-auto bg-white rounded-lg p-3 shadow animate-pulse space-y-2">
      <div className="w-full aspect-[2/3] bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mt-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="flex flex-wrap gap-1 mt-1">
        <div className="h-4 w-12 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-16 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
