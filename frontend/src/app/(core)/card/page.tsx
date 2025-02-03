import React, { Suspense } from "react";
import MainContent from "./main-content";

export default function CardPage() {
  return (
    <Suspense>
      <MainContent />
    </Suspense>
  );
}
