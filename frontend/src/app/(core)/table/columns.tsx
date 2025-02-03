import { type Seminar } from "@/types/api-response.types";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const columns: ColumnDef<Seminar>[] = [
  {
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Nama",
    id: "nama",
    accessorKey: "studentName",
  },
  {
    header: "Tipe",
    accessorKey: "seminarType",
  },
  {
    header: "Judul",
    accessorKey: "title",
  },
  {
    header: "Pembimbing",
    accessorKey: "advisors",
  },
  {
    header: "Penguji",
    accessorKey: "examiners",
  },
  {
    header: "Tanggal",
    accessorKey: "datetime",
    cell: ({ row }) =>
      format(row.original.datetime, "PPP", {
        locale: id,
      }),
  },
  {
    header: "Jam",
    accessorKey: "time",
    cell: ({ row }) =>
      format(row.original.datetime, "HH:mm", {
        locale: id,
      }),
  },
  {
    header: "Ruangan",
    accessorKey: "room",
  },
];
