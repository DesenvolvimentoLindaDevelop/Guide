import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AddTouristSpot() {
  return (
    <main className="sm:ml-14 p-4 flex flex-col space-y-5">
      <Card className="text-lg sm:text-xl text-gray-800 select-none mt-4 md:mt-12">
        <CardHeader>
          <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:justify-start gap-4">
            <Button className="cursor-pointer w-fit">
              <Link
                className="flex space-x-1 items-center "
                href={"../pontos-turisticos"}
              >
                <ChevronLeft className="size-4" />
                <span>Voltar</span>
              </Link>
            </Button>
            <CardTitle>Adicionar novo ponto turístico</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md">
              <Input placeholder="Nome do local" />
              <Input placeholder="Descrição do local" />
              <Input placeholder="Imagens" />
              <Input placeholder="Audio" />
              <Input placeholder="Categoria" />
            </div>
            <Button className="mt-8 mx-auto w-full max-w-[290px] flex">
              Registar local
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
