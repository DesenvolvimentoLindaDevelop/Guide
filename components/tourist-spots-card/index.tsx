"use client"

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { CirclePause, CirclePlay, MapPin } from "lucide-react";
import { imagesProject } from "@/lib/images-project";
import Image from "next/image";
import { Button } from "../ui/button";
import useSound from "use-sound";

export default function TouristsSpotsCard() {
    const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false) // Estado para controlar a reprodução

  const [play, { stop }] = useSound("https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3")


  const togglePlay = () => {
    if (isPlaying) {
      stop(); // Para o áudio
    } else {
      play(); // Toca o áudio
    }
    setIsPlaying(!isPlaying); // Atualiza o estado
  };

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
            Igreja dos Clérigos
          </CardTitle>
          <span className="font-semibold ml-auto">Monumento</span>
        </div>
        <CardDescription>
        A Igreja e Torre dos Clérigos (século XVIII) é um notável conjunto arquitetónico situado na cidade do Porto, Portugal, sendo considerado o cartão-postal dessa cidade.
        </CardDescription>
      </CardHeader>
      <CardContent>
      <Carousel setApi={setApi} opts={{loop: true}}>
      <CarouselContent>
        {imagesProject.map((image) => (
            <CarouselItem key={image} className="flex w-full items-center justify-center">
                <Image src={`/projects/${image}.jpg`} width={300} height={300} alt={image}/>
            </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
    <div className="flex items-center justify-between">
        <Button className="mt-4 bg-transparent border-none shadow-none cursor-pointer hover:bg-transparent" onClick={() => togglePlay()}>
            {isPlaying ? <CirclePause className="size-8 text-gray-800" /> : <CirclePlay className="size-8 text-gray-800" />}
        </Button>
    </div>
      </CardContent>
    </Card>
  );
}
