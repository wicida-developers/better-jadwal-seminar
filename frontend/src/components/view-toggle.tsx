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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ViewToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const view = searchParams.get("view") ?? "card";

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
            router.push(pathname + "?" + createQueryString("view", "card"));
            window.location.reload();
          }}
        >
          Card
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push(pathname + "?" + createQueryString("view", "table"));
            window.location.reload();
          }}
        >
          Table
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
