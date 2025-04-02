import Image from "next/image";
import UserAuth from "../components/user-auth";

export default function Home() {
  return (
    <main className="flex flex-1 h-full w-full items-center justify-center p-12">
      <section className="w-2/3">
      <div>
        TEST
      </div>
      </section>
      <section className="w-1/3">
    <div className="flex flex-col items-center w-full">
      <h1>Login de Administrador</h1>
      <UserAuth />
    </div>
      </section>
    </main>
  );
}
