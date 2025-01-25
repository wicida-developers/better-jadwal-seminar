"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQueryState } from "nuqs";
import { LayoutGrid, Table } from "lucide-react";

export function ViewToggle() {
  const [view, setView] = useQueryState<"card" | "table">("view", {
    parse: (value) => value as "card" | "table",
    serialize: (value) => value,
    defaultValue: "card",
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LayoutGrid
            className={`h-[1.2rem] w-[1.2rem] transition-all ${view === "card" ? "block" : "hidden"}`}
          />
          <Table
            className={`h-[1.2rem] w-[1.2rem] transition-all ${view === "table" ? "block" : "hidden"}`}
          />
          <span className="sr-only">Toggle view</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setView("card")}>
          Card
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setView("table")}>
          Table
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
