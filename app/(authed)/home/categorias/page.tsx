"use client";

import CategoriesDataTable from "@/components/category-data-table/components/category-data-table";
import { CategoryProps } from "@/components/category-data-table/interfaces/category";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "@/lib/firebaseConfig";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "categories"),
      (snapshot) => {
        const updatedCategories: CategoryProps[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CategoryProps[];

        console.log("Atualizado:", updatedCategories);
        setCategories(updatedCategories);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="sm:ml-14 p-4 flex flex-col h-screen space-y-8 mt-4 md:mt-12 md:px-8 xl:px-12">
      <section className="mt-4 flex items-center gap-4">
        <Link className="flex space-x-1 items-center " href={"/home"}>
          <ChevronLeft className="size-4" />
          <span>Voltar</span>
        </Link>

        <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
          Gerenciar categorias
        </h1>
      </section>
      <section>
        <CategoriesDataTable categories={categories} />
      </section>
    </main>
  );
}
