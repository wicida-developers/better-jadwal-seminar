import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="px-4 py-8">
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search Input Skeleton */}
        <div className="relative w-full lg:w-1/2">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {/* Last Updated Skeleton */}
          <Skeleton className="h-10 w-full rounded-md" />

          {/* Type Select Skeleton */}
          <Skeleton className="h-10 w-full rounded-md sm:w-[180px]" />

          {/* Major Select Skeleton */}
          <Skeleton className="h-10 w-full rounded-md sm:w-[180px]" />

          {/* Date Picker Skeleton */}
          <Skeleton className="h-10 w-full rounded-md sm:w-[300px]" />
        </div>
      </div>

      {/* Seminar Cards Skeleton */}
      <div className="flex flex-wrap gap-4">
        {[...Array(4)].map((_, idx) => (
          <Card key={idx} className="w-full md:w-[calc(50%-1rem)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-[80%]" />
                <Skeleton className="h-6 w-[60px]" />
              </div>
              <Skeleton className="mt-2 h-4 w-[200px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="mt-1 h-4 w-[100px]" />
              <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
              <div className="mt-2 space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
