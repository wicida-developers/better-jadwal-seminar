import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function SeminarCardLoader() {
  return (
    <div className="flex w-full flex-wrap gap-4">
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
  );
}
