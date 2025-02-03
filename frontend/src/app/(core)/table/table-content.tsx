"use client";

import React from "react";
import { DataTable } from "./data-table";
import { api } from "@/trpc/react";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function TableContent() {
  const { data: lastUpdated, isPending } =
    api.seminar.getLastUpdated.useQuery();

  const { data } = api.seminar.paginate.useInfiniteQuery(
    {
      page: 1,
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.meta.page < lastPage.meta.pageCount
          ? lastPage.meta.page + 1
          : undefined,
    },
  );

  if (!data) return null;

  return (
    <main className="px-4 py-8">
      {/* Last Updated */}
      <div className="mb-4 w-fit rounded-md bg-muted px-4 py-2 text-muted-foreground">
        {isPending ? (
          <Skeleton className="h-5 w-64" />
        ) : (
          lastUpdated && (
            <p className="text-sm">
              Terakhir diupdate:{" "}
              {format(new Date(lastUpdated ?? ""), "PPpp", {
                locale: id,
              })}
            </p>
          )
        )}
      </div>
      <DataTable
        data={data.pages.flatMap((page) => page.data)}
        columns={columns}
      />
    </main>
  );
}
