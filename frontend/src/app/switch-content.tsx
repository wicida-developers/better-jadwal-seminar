"use client";

import React from "react";
import TableContent from "./table-content";
import MainContent from "./main-content";

export const dynamic = "force-dynamic";

interface SwitchContentProps {
  view: "card" | "table";
}

export default function SwitchContent({ view }: SwitchContentProps) {
  if (view === "table") {
    return <TableContent />;
  }

  return <MainContent />;
}
