import Image from "next/image";
import UserAuth from "../components/user-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <div className="w-full flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <LockKeyhole className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Login de Administrador</CardTitle>
          <CardDescription>
            Entre com suas credenciais para acessar o painel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuth />
        </CardContent>
      </Card>
    </main>
  );
}
