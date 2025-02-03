"use client";

import React, { useMemo } from "react";
import { api } from "@/trpc/react";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import usePaginateParams from "@/hooks/use-paginate-params";
import { useTablePagination } from "@/hooks/use-table-pagination";
import { PaginatedDataTable } from "@/components/paginated-data-table";

export default function TableContent() {
  const { query, page, pageSize } = usePaginateParams({});

  const queryParams = useMemo(
    () => ({
      query,
      page,
      pageSize,
    }),
    [query, page, pageSize],
  );

  const [lastUpdated, status] = api.seminar.getLastUpdated.useSuspenseQuery();

  const { data, isPending } = api.seminar.paginate.useQuery(queryParams);

  const { tableData, paginationProps } = useTablePagination({
    data: {
      data: data?.data ?? [],
      currentPage: page,
      pageSize: pageSize,
    },
    isPending,
    page,
    limit: pageSize,
  });

  if (!data) return null;

  return (
    <main className="px-4 py-8">
      {/* Last Updated */}
      <div className="mb-4 w-fit rounded-md bg-muted px-4 py-2 text-muted-foreground">
        {status.isPending ? (
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
      <PaginatedDataTable
        columns={columns}
        data={tableData}
        pagination={paginationProps}
        isLoading={isPending}
      />
    </main>
  );
}
