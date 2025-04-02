import TouristsSpotsCard from "@/components/tourist-spots-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TouristsSpots() {
  return (
    <main className="sm:ml-14 p-4 flex flex-col space-y-5 mt-4 md:mt-12">
      <section className="mt-4 flex items-center gap-4">
        
          <Link
            className="flex space-x-1 items-center "
            href={"/home"}
          >
            <ChevronLeft className="size-4" />
            <span>Voltar</span>
          </Link>
        

          <Link
            className="flex space-x-1 items-center cursor-pointer bg-primary-foreground hover:bg-primary hover:text-gray-100 p-2 transition-colors rounded-md"
            href={"/home/pontos-turisticos/adicionar-ponto-turistico"}
          >
            <Plus className="size-4" />
            <span className="font-semibold">Adicionar ponto turístico</span>{" "}
          </Link>

      </section>
      <section className="flex flex-col sm:grid sm:grid-cols-2 gap-8">
        <TouristsSpotsCard />
        <TouristsSpotsCard />
      </section>
    </main>
  );
}
