"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, Table } from "lucide-react";
import { useRouter } from "next/navigation";
import cookies from "js-cookie";

export function ViewToggle() {
  const router = useRouter();

  // Get or set view preference in cookie
  const setView = (value: string) => {
    cookies.set("view", value, { expires: 365 });
    return value;
  };

  const view = cookies.get("view") ?? setView("card");

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
        <DropdownMenuItem
          onClick={() => {
            setView("card");
            router.push("/card");
          }}
        >
          Card
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setView("table");
            router.push("/table");
          }}
        >
          Table
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
