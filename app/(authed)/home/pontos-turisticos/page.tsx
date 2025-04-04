"use client";

import TouristsSpotsCard from "@/components/tourist-spots-card";
import { ChevronLeft, Columns2, Plus, Rows4 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import data from "@/components/spots-data-table/data.json";
import SpotsDataTable from "@/components/spots-data-table/components/spots-data-table";
import { Button } from "@/components/ui/button";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "@/lib/firebaseConfig";

interface TouristsSpotsProps {
  audio: string;
  id: string;
  description: string;
  category: string;
  images: string[];
  location: {
    latitude: number;
    longitute: number
  };
  name: string;
  videoUrl: string;
}

export default function TouristsSpots() {
  const [viewOption, setViewOption] = useState(false);
  const [spot, setSpot] = useState<TouristsSpotsProps[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "touristSpots"), (snapshot) => {
      const updatedSpots: TouristsSpotsProps[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TouristsSpotsProps[];

      console.log("Atualizado:", updatedSpots);
      setSpot(updatedSpots);
    });

    return () => unsubscribe();
  }, []);
  return (
    <main className="sm:ml-14 p-4 flex flex-col space-y-8 mt-4 md:mt-12 md:px-8 xl:px-12">
      <section className="mt-4 flex items-center gap-4">
        <Link className="flex space-x-1 items-center " href={"/home"}>
          <ChevronLeft className="size-4" />
          <span>Voltar</span>
        </Link>

        <h1 className="text-lg sm:text-2xl font-bold text-gray-800">Pontos turisticos registados</h1>

        <Button onClick={() => setViewOption(!viewOption)} className="ml-auto transition-all">
          Visualizar
          {viewOption ? <Rows4 className="size-4"/> : <Columns2 className="size-4"/>}
        </Button>
      </section>

      <Link
        className="w-fit flex space-x-1 items-center cursor-pointer bg-primary-foreground hover:bg-primary hover:text-gray-100 p-2 transition-colors rounded-md"
        href={"/home/pontos-turisticos/adicionar"}
      >
        <Plus className="size-4" />
        <span className="font-semibold">Adicionar ponto turístico</span>{" "}
      </Link>

      {viewOption ? (
        <section className="">
          <TouristsSpotsCard />
          
        </section>
      ) : (
        <section>
          <SpotsDataTable spots={spot} />
        </section>
      )}
    </main>
  );
}
