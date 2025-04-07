"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CirclePause, CirclePlay, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import useSound from "use-sound";
import { database } from "@/lib/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
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
import { toast } from "react-toastify";

interface TouristSpot {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  audio: string;
}

export default function TouristsSpotsCard() {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [playingSpotId, setPlayingSpotId] = useState<string | null>(null);
  const [touristSpots, setTouristSpots] = useState<TouristSpot[]>([]);
  const [spotToDelete, setSpotToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchTouristSpots = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(database, "tourist-spot")
        );
        const spots: TouristSpot[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TouristSpot[];
        setTouristSpots(spots);
      } catch (error) {
        console.error("Erro ao buscar pontos turísticos:", error);
      }
    };

    fetchTouristSpots();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/home/pontos-turisticos/editar/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(database, "tourist-spot", id));
      setTouristSpots((spots) => spots.filter((spot) => spot.id !== id));
      toast.success("Ponto turístico excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir ponto turístico:", error);
      toast.error("Erro ao excluir ponto turístico");
    } finally {
      setSpotToDelete(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {touristSpots.map((spot) => (
          <Card key={spot.id} className="flex flex-col h-full group relative">
            <CardHeader className="flex-none">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg sm:text-xl text-gray-800 select-none line-clamp-1">
                  {spot.name}
                </CardTitle>
                <span className="font-semibold text-sm px-2 py-1 bg-gray-100 rounded-full">
                  {spot.category}
                </span>
              </div>
              <CardDescription className="line-clamp-2 h-12">
                {spot.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Carousel
                  setApi={setApi}
                  className="w-full h-full"
                  opts={{
                    loop: true,
                    align: "start",
                  }}
                >
                  <CarouselContent>
                    {spot.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-[4/3] w-full">
                          <img
                            src={image}
                            alt={`Imagem de ${spot.name}`}
                            className="object-cover w-full h-full rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                {/* Overlay with edit button on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => handleEdit(spot.id)}
                  >
                    <Pencil className="h-8 w-8" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
                  onClick={() => setSpotToDelete(spot.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog
        open={!!spotToDelete}
        onOpenChange={() => setSpotToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este ponto turístico? Esta ação não
              pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => spotToDelete && handleDelete(spotToDelete)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
