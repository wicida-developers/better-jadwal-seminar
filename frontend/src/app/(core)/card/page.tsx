import MainContent from "@/app/(core)/card/main-content";
import { api, HydrateClient } from "@/trpc/server";
import React from "react";

export default function CardPage() {
  void api.seminar.getLastUpdated.prefetch();
  void api.seminar.getList.prefetch();

  return (
    <HydrateClient>
      <MainContent />
    </HydrateClient>
  );
}
