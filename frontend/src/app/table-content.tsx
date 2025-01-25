"use client";

import React from "react";
import { DataTable } from "./data-table";
import { api } from "@/trpc/react";
import { columns } from "./columns";

export default function TableContent() {
  const { data } = api.seminar.getList.useQuery();

  if (!data) return null;

  return (
    <main className="px-4 py-8">
      <DataTable data={data.seminars} columns={columns} />
    </main>
  );
}
