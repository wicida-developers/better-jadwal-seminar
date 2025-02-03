import TableContent from "@/app/(core)/table/table-content";
import { api, HydrateClient } from "@/trpc/server";
import React from "react";

export default function TablePage() {
  void api.seminar.getLastUpdated.prefetch();

  return (
    <HydrateClient>
      <TableContent />
    </HydrateClient>
  );
}
