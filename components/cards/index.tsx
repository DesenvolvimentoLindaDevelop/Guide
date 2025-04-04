import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon, LucideIcon } from "lucide-react";

interface CardsRenderProps {
  title: string;
  description: string;
  content: string | number;
  icon: LucideIcon;
}

export default function CardRender({
  title,
  description,
  content,
  icon: Icon,
}: CardsRenderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
            {title}
          </CardTitle>
          <Icon className="size-4 ml-auto" />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-base sm:text-lg font-bold">{content}</p>
      </CardContent>
    </Card>
  );
}
