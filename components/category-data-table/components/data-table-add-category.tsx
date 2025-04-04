"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { collection, addDoc } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";
import { toast } from "react-toastify";

export function DataTableAddCategory() {
  const [categoryTitle, setCategoryTitle] = useState("");

  async function addCategory() {
    if (!categoryTitle.trim()) return;

    try {
      const loadingToast = toast.loading("A enviar categoria...")
      await addDoc(collection(database, "categories"), {
        title: categoryTitle,
        createdAt: new Date(),
      });

      toast.dismiss(loadingToast);
      toast.success("Categoria adicionada com sucesso!")

      setCategoryTitle("");
      console.log("Categoria adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
    }
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 px-2">
            Adicionar categoria
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[250px] p-2">
          <div className="p-2">
            <Input
              placeholder="Categoria"
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value)}
              onPointerDown={(e) => e.stopPropagation()}
            />
          </div>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            onClick={addCategory}
            className="cursor-pointer justify-center font-bold rounded-md px-2"
          >
            Adicionar categoria
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
