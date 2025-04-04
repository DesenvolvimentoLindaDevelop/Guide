"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye } from "lucide-react";
import { ChartConfig, ChartContainer } from "../ui/chart";
import {
  Pie,
  PieChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartOverviewProps {
  title: string;
}

export default function PieChartOverview({ title }: ChartOverviewProps) {
  const chartData = [
    { name: "Museu", value: 2 },
    { name: "Parque", value: 3 },
    { name: "Igreja", value: 4 },
    { name: "Castelo", value: 1 },
    { name: "Restaurante", value: 5 },
    { name: "Estádio", value: 1 },
  ];

  const colors = [
    "#2563eb",
    "#60a5fa",
    "#f97316",
    "#22c55e",
    "#eab308",
    "#ec4899",
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
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
