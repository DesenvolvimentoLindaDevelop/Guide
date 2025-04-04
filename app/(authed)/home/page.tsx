"use client";

import CardRender from "@/components/cards";
import { CategoryProps } from "@/components/category-data-table/interfaces/category";
import ChartOverview from "@/components/charts/barChart";
import LineChartComponent from "@/components/charts/lineChart";
import PieChartOverview from "@/components/charts/pieChart";
import { TouristsSpotsProps } from "@/components/spots-data-table/interfaces/spot";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { database } from "@/lib/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { AlignLeft, MapPin, MapPinCheck, MapPinPlusInside, Users } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function AuthedHome() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [spot, setSpot] = useState<TouristsSpotsProps[]>([]);

  useEffect(() => {
    const unsubscribeCategories = onSnapshot(
      collection(database, "categories"),
      (snapshot) => {
        setCategories(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as CategoryProps[]
        );
      }
    );

    const unsubscribeTouristSpots = onSnapshot(
      collection(database, "touristSpots"),
      (snapshot) => {
        const updatedSpots: TouristsSpotsProps[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TouristsSpotsProps[];

        console.log("Atualizado:", updatedSpots);
        setSpot(updatedSpots);
      }
    );

    return () => {
      unsubscribeCategories();
      unsubscribeTouristSpots();
    };
  }, []);
  return (
    <main className="sm:ml-14 p-4 mt-4 sm:mt-12 xl:p-12 xl:mt-0">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <CardRender
          title="Total de sítios"
          description="Total de sítios cadastrados"
          content={spot.length}
          icon={MapPinCheck}
        />
        <CardRender
          title="Total de usuários"
          description="Total de usuários cadastrados"
          content={300}
          icon={Users}
        />
        <CardRender
          title="Total de categorias"
          description="Total de categorias registradas"
          content={categories.length}
          icon={AlignLeft}
        />
        <CardRender
          title="Últimos sítios cadastrados"
          description="Sítios cadastrados na última semana"
          content={4}
          icon={MapPinPlusInside}
        />
      </section>
      <section className="flex flex-col mt-8 gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
        <ChartOverview title="Sítios cadastrados nos últimos meses" />
        <ChartOverview title="Categorias com mais cadastros" />
        <LineChartComponent title="Sítios cadastrados nos últimos meses" />
        <PieChartOverview title="Categorias com mais registos" />
      </section>
    </main>
  );
}
