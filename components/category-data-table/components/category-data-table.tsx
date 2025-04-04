"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CategoryProps } from "../interfaces/category";
import { DataTable } from "..";
import { ArrowUpDown, Delete, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import { database } from "@/lib/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
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
import { useState } from "react";

async function deleteCategory(id: string) {
  if (!id) return;

  try {
    await deleteDoc(doc(database, "categories", id));
    toast.success("Categoria deletada com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    toast.error("Erro ao deletar categoria.");
  }
}

const columns: ColumnDef<CategoryProps>[] = [
  {
    accessorKey: "id",
    sortingFn: (rowA, rowB, columnId) => {
      return Number(rowA.getValue(columnId)) - Number(rowB.getValue(columnId));
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Categoria
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const categoryId = row.getValue("id") as string;
      const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setCategoryToDelete(categoryId)}>
                Deletar <Delete className="ml-auto" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tens certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => categoryToDelete && deleteCategory(categoryToDelete)}
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];

interface Props {
  categories: CategoryProps[];
}

export default function CategoriesDataTable({ categories }: Props) {
  return <DataTable columns={columns} data={categories} />;
}
