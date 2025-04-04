"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye } from "lucide-react";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface ChartOverviewProps {
  title: string;
}

export default function ChartOverview({ title }: ChartOverviewProps) {
  const chartData = [
    { month: "Sé do Porto", desktop: 186, mobile: 80 },
    { month: "Ponte Luís I", desktop: 305, mobile: 200 },
    { month: "Palácio da Bolsa", desktop: 237, mobile: 120 },
    { month: "Igreja dos Clérigos", desktop: 73, mobile: 190 },
    { month: "São Bento", desktop: 209, mobile: 130 },
    { month: "Estádio do Dragão", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle>{title}</CardTitle>
          <Eye className="ml-auto size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
