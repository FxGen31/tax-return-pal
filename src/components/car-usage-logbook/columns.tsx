import { ColumnDef } from "@tanstack/react-table"
import TableCell from "@/components/car-usage-logbook/table-cell";
import { CarUsageLog } from "@/types";

export const carUsageLogbookColumns: ColumnDef<CarUsageLog>[] = [
  {
    accessorKey: "startDate",
    header: "Start Date",
    meta: {
        type: "date"
    },
    cell: TableCell
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    meta: {
        type: "date"
    },
    cell: TableCell
  },
  {
    accessorKey: "startOdometer",
    header: "Start Odometer",
    meta: {
        type: "number"
    },
    cell: TableCell
  },
  {
    accessorKey: "endOdometer",
    header: "End Odometer",
    meta: {
        type: "number"
    },
    cell: TableCell
  },
  {
    accessorKey: "workDistance",
    header: "Work Distance",
    meta: {
        type: "number"
    },
    cell: TableCell
  },
  {
    accessorKey: "personalDistance",
    header: "Personal Distance",
    meta: {
        type: "number"
    },
    cell: TableCell
  },
  {
    accessorKey: "travelReason",
    header: "Travel Reason",
    meta: {
        type: "textarea"
    },
    cell: TableCell
  },
]
