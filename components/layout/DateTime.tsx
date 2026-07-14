"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

export default function DateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = now.toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <GlassCard className="rounded-[36px] p-6 text-center">

      <p className="text-sm text-soft">
        {date}
      </p>

      <h2 className="mt-3 text-7xl font-black">
        {time}
      </h2>

    </GlassCard>
  );
}