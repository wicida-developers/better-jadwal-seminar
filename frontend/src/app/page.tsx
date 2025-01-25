"use client";

import { Toaster } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  FileCheck,
  FileText,
  GraduationCap,
  UserIcon,
  X,
} from "lucide-react";
import {
  endOfDay,
  format,
  isWithinInterval,
  parseISO,
  startOfDay,
} from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { api } from "@/trpc/react";
import { Major, SeminarType } from "@/types/api-response.types";
import { cn } from "@/lib/utils";
import { type DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { MajorsList, seminarTypes } from "@/lib/constants";
import { parseAsString, useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import SeminarCard from "@/components/seminar-card";

export default function Home() {
  const [seminars, ctx] = api.seminar.getList.useSuspenseQuery();
  const [query, setQuery] = useQueryState<string>("query", parseAsString);

  const [date = { from: undefined, to: undefined }, setDate] =
    useQueryState<DateRange>("date", {
      parse: (value) => {
        const [from, to] = value.split(",");
        return {
          from: from ? new Date(from) : undefined,
          to: to ? new Date(to) : undefined,
        };
      },
      serialize: (value) =>
        `${value?.from?.toISOString() ?? ""},${value?.to?.toISOString() ?? ""}`,
    });

  const [type, setType] = useQueryState<SeminarType | undefined>("type", {
    parse: (value) => value as SeminarType,
    serialize: (value) => value ?? "",
  });

  const [major = undefined, setMajor] = useQueryState<Major | undefined>(
    "major",
    {
      parse: (value) => value as Major,
      serialize: (value) => value ?? "",
    },
  );

  const filteredSeminars = seminars
    .filter((seminar) => {
      // Filter by date
      if (date?.from) {
        const seminarDate = parseISO(format(seminar.datetime, "yyyy-MM-dd"));
        const start = startOfDay(date.from);
        const end = date.to ? endOfDay(date.to) : endOfDay(date.from);

        if (!isWithinInterval(seminarDate, { start, end })) {
          return false;
        }
      }

      // Filter by search query
      if (query) {
        const searchableText = [
          seminar.title,
          seminar.studentName,
          ...seminar.advisors,
          ...seminar.examiners,
        ]
          .join(" ")
          .toLowerCase();
        if (!searchableText.includes(query.toLowerCase())) {
          return false;
        }
      }

      // Filter by major
      if (major && seminar.major !== major) {
        return false;
      }

      // Filter by seminar type
      if (type && seminar.seminarType !== type) {
        return false;
      }

      return true;
    })
    .sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
    );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="bg-primary-foreground flex items-center justify-between px-4 py-6 text-white">
        <div className="">
          <h1 className="text-left text-3xl font-bold">Jadwal Seminar</h1>
        </div>
        <ModeToggle />
      </header>
      <main className="px-4 py-8">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="relative w-1/2">
            <Input
              type="text"
              placeholder="Search seminar..."
              value={query ?? ""}
              onChange={handleSearch}
              className="border-input bg-background h-10 w-full rounded-md border px-3 pl-10 text-sm"
            />
            {query ? (
              <button
                onClick={() => setQuery(null)}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              >
                <X className="text-muted-foreground h-4 w-4" />
              </button>
            ) : (
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground h-4 w-4"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={type ?? ""}
              onValueChange={(value) => setType(value as SeminarType)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  {seminarTypes.map((major) => (
                    <SelectItem key={major} value={major}>
                      {major}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              value={major ?? ""}
              onValueChange={(value) => setMajor(value as Major)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a major" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Major</SelectLabel>
                  {MajorsList.map((major) => (
                    <SelectItem key={major} value={major}>
                      {major}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "flex-1 justify-start text-left font-normal sm:w-[300px]",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pilih tanggal seminar</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date ?? undefined}
                  onSelect={(value) => setDate(value ?? null)}
                  numberOfMonths={2}
                  className="hidden sm:block"
                />
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date ?? undefined}
                  onSelect={(value) => setDate(value ?? null)}
                  numberOfMonths={1}
                  className="sm:hidden"
                />
              </PopoverContent>
            </Popover>
            {(date?.from ?? major) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  void setDate(null);
                  void setMajor(null);
                }}
                className="h-10 w-10"
              >
                <span className="sr-only">Hapus filter</span>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* List Seminar Card */}
        <div className="flex flex-wrap gap-4">
          {filteredSeminars.map((seminar, idx) => (
            <SeminarCard key={idx} idx={idx} seminar={seminar} />
          ))}
        </div>

        {ctx.isPending && (
          <Card className="mt-4">
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="mt-2 h-4 w-[250px]" />
              <Skeleton className="mt-2 h-4 w-[200px]" />
            </CardContent>
          </Card>
        )}

        <Toaster />
      </main>
    </div>
  );
}
