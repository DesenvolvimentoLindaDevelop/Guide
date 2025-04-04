'use client';

import { ColumnDef } from "@tanstack/react-table"
import { User } from "../interfaces/user";
import { DataTable } from "..";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";


const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({row}) => {
        return <div>{row.getValue("id")}</div>
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({row}) => {
        return <div>{row.getValue("name")}</div>
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({row}) => {
        return <div>{row.getValue("email")}</div>
    }
  }
]

interface Props {
    users: User[];
}

export default function UsersDataTable({users}: Props) {
    return <DataTable columns={columns} data={users}/>
}
