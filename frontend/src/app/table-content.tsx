"use client";

import React from "react";
import { DataTable } from "./data-table";
import { api } from "@/trpc/react";
import { columns } from "./columns";

export default function TableContent() {
  const { data } = api.seminar.getList.useInfiniteQuery(
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
      <DataTable
        data={data.pages.flatMap((page) => page.data)}
        columns={columns}
      />
    </main>
  );
}
