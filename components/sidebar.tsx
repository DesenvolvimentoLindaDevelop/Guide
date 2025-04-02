import React from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";
import { Home, MapPin, PanelBottom, User, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Link
              href={"#"}
              className="flex size-9 shrink-0 items-center justify-center bg-primary text-primary-foreground
                    rounded-full"
            >
              <User className="size-4" />
              <span className="sr-only">Dashboard Avatar</span>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/home"}
                  className="flex size-9 shrink-0 items-center justify-center text-muted-foreground
                    rounded-lg transition-colors hover:text-foreground"
                >
                  <Home className="size-4" />
                  <span className="sr-only">Início</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Início</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/home/pontos-turisticos"}
                  className="flex size-9 shrink-0 items-center justify-center text-muted-foreground
                    rounded-lg transition-colors hover:text-foreground"
                >
                  <MapPin className="size-4" />
                  <span className="sr-only">Lugares</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Lugares</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/home/usuarios"}
                  className="flex size-9 shrink-0 items-center justify-center text-muted-foreground
                    rounded-lg transition-colors hover:text-foreground"
                >
                  <Users className="size-4" />
                  <span className="sr-only">Usuários</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Usuários</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="sm:hidden flex flex-col">
        <header
          className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background sm:static sm:h-auto
        sm:border-0 sm:bg-transparent"
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button size={"icon"} variant={"outline"} className="sm:hidden">
                <PanelBottom className="size-5" />
                <span className="sr-only">Abrir / fechar menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>Menu</SheetTitle>
              <nav>
                <Link href={"#"}>#</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
    </div>
  );
}
