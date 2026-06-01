"use client";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  value: string | number;
}

export default function DashboardStatCard({
  title,
  value,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="mt-3 text-3xl font-bold">
          {value}
        </h3>
      </CardContent>
    </Card>
  );
}