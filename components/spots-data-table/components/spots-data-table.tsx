"use client";

import { ColumnDef } from "@tanstack/react-table"
import { TouristsSpotsProps } from "../interfaces/spot";
import { DataTable } from "..";
import { ArrowUpDown, Delete, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";
import { useState } from "react";

interface Props {
  spots: TouristsSpotsProps[];
}

export default function SpotsDataTable({spots}: Props) {
  const [spotToDelete, setSpotToDelete] = useState<string | null>(null);

  async function deleteSpot(id: string) {
    if (!id) return;
    
    try {
      await deleteDoc(doc(database, "tourist-spot", id));
      toast.success("Ponto turístico deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar Ponto turístico:", error);
      toast.error("Erro ao deletar Ponto turístico.");
    } finally {
      setSpotToDelete(null);
    }
  }

  const columns: ColumnDef<TouristsSpotsProps>[] = [
    {
      accessorKey: "id",
      sortingFn: (rowA, rowB, columnId) => {
        return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
      },
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
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({row}) => {
        return <div className="max-w-[300px] overflow-hidden truncate">{row.getValue("description")}</div>
      }
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Categoria
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({row}) => {
        return <div>{row.getValue("category")}</div>
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const router = useRouter();
        const spotId = row.getValue("id") as string;
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(`/home/pontos-turisticos/editar/${row.getValue("id")}`)}>
                Editar <Pencil className="ml-auto"/>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSpotToDelete(spotId)}>
                Deletar <Delete className="ml-auto"/>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={spots}/>
      
      <AlertDialog open={!!spotToDelete} onOpenChange={() => setSpotToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tens certeza que deseja excluir este sítio? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => spotToDelete && deleteSpot(spotToDelete)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}