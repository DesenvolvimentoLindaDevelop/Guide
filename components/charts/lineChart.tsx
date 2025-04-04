"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye } from "lucide-react";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartOverviewProps {
  title: string;
}

export default function LineChartOverview({ title }: ChartOverviewProps) {
  const chartData = [
    { month: "Janeiro", desktop: 3 },
    { month: "Fevereiro", desktop: 4 },
    { month: "Março", desktop: 5 },
    { month: "Abril", desktop: 7 },
    { month: "Maio", desktop: 15 },
    { month: "Junho", desktop: 3 },
  ];

  const chartConfig = {
    desktop: { label: "Desktop", color: "#2563eb" },
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
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="desktop" stroke={chartConfig.desktop.color} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
