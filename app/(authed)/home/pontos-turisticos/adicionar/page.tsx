"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { database, storage } from "@/lib/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  title: string;
}

async function addDataToFireStone(data: any) {
  try {
    const docRef = await addDoc(collection(database, "tourist-spot"), data);
    console.log("Documento salvo com ID:", docRef.id);
  } catch (error) {
    console.error("Erro ao salvar no Firestore:", error);
  }
}

export default function AddTouristSpot() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, "categories"));
        const fetchedCategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !description || !latitude || !longitude) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const loadingToast = toast.loading("A enviar dados...");
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(storageRef, image);
          return getDownloadURL(storageRef);
        })
      );

      let audioUrl = "";
      if (audioFile) {
        const audioRef = ref(storage, `audios/${audioFile.name}`);
        await uploadBytes(audioRef, audioFile);
        audioUrl = await getDownloadURL(audioRef);
      }

      const data = {
        name,
        category,
        description,
        images: imageUrls,
        audio: audioUrl,
        videoUrl: videoUrl,
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      };

      await addDataToFireStone(data);
      toast.dismiss(loadingToast);
      toast.success("Enviado com sucesso!");
      router.push("/home/pontos-turisticos");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      toast.error("Erro ao enviar dados.");
    }
  };

  return (
    <main className="sm:ml-14 p-4 flex flex-col h-screen items-center space-y-5 md:px-8 xl:px-12">
      <Card className="text-lg sm:text-xl text-gray-800 select-none mt-4 md:mt-12 w-full max-w-[1400px]">
        <CardHeader>
          <div className="flex flex-col justify-center sm:flex-row sm:items-center sm:justify-start gap-4">
            <Button variant="outline" className="cursor-pointer w-fit">
              <Link
                className="flex space-x-1 items-center"
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do local</label>
                <Input
                  placeholder="Digite o nome do local"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.title}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Latitude</label>
                <Input
                  type="number"
                  step="any"
                  placeholder="Digite a latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Longitude</label>
                <Input
                  type="number"
                  step="any"
                  placeholder="Digite a longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Descrição do local
                </label>
                <Textarea
                  placeholder="Digite uma descrição detalhada do local"
                  className="min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">URL do vídeo</label>
                <Input
                  type="url"
                  placeholder="Digite a URL do vídeo (YouTube, Vimeo, etc.)"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Imagens</label>
                <div
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Clique para fazer upload das imagens
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG até 10MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {images.map((img, index) => (
                      <div key={`image-${index}`} className="relative group">
                        <div className="aspect-square relative rounded-lg overflow-hidden">
                          <Image
                            src={URL.createObjectURL(img)}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 cursor-pointer" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Áudio guia</label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                  />
                  {audioFile && (
                    <span className="text-sm text-gray-600">
                      {audioFile.name}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-8 mx-auto w-full max-w-[290px] flex"
            >
              Registrar local
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
