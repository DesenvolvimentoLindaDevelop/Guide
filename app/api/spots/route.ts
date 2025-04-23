import { NextRequest, NextResponse } from "next/server";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

const db = getFirestore();
const bucket = getStorage().bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!);

const streamToBuffer = async (reader: ReadableStreamDefaultReader): Promise<Buffer> => {
  const chunks: Uint8Array[] = [];
  let done = false;
  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      chunks.push(value);
    }
  }
  return Buffer.concat(chunks);
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString()!;
    const category = formData.get("category")?.toString()!;
    const description = formData.get("description")?.toString()!;
    const videoUrl = formData.get("videoUrl")?.toString() || "";
    const latitude = parseFloat(formData.get("latitude")?.toString()!);
    const longitude = parseFloat(formData.get("longitude")?.toString()!);
    const audio = formData.get("audio")?.toString()!;

    const images = formData.getAll("images") as File[];

    const uploadedImageUrls = await Promise.all(
      images.map(async (image) => {
        const ext = path.extname(image.name);
        const fileName = `images/${randomUUID()}${ext}`;
        const fileBuffer = Buffer.from(await image.arrayBuffer());

        const uuid = uuidv4();
        const fileRef = bucket.file(fileName);

        await fileRef.save(fileBuffer, {
          contentType: image.type,
          metadata: {
            metadata: {
              firebaseStorageDownloadTokens: uuid,
            },
          },
        });

        return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${uuid}`;
      })
    );

    const docRef = await db.collection("tourist-spot").add({
      name,
      category,
      description,
      videoUrl,
      images: uploadedImageUrls,
      audio,
      location: {
        latitude,
        longitude,
      },
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Criado com sucesso", id: docRef.id }, { status: 200 });
  } catch (error) {
    console.error("Erro no POST /api/spots:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
