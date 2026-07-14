"use client";

import GlassCard from "@/components/ui/GlassCard";
import { Bell } from "lucide-react";
import DateTime from "./DateTime";

export default function Header() {
  const hour = new Date().getHours();

  let greeting = "Good Morning ☀️";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon 🌤️";
  } else if (hour >= 17 && hour < 20) {
    greeting = "Good Evening 🌇";
  } else if (hour >= 20 || hour < 5) {
    greeting = "Good Night 🌙";
  }

  return (
    <header className="px-6 pt-6">

      {/* Header Card */}
      <GlassCard className="px-6 py-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-[0.25em] text-soft">
              TODAY
            </p>

            <h1 className="mt-1 text-4xl font-black">
              {greeting}
            </h1>

          </div>

          <button
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white/10
              backdrop-blur-xl
              transition
              hover:scale-105
            "
          >
            <Bell size={20} />
          </button>

        </div>

      </GlassCard>

      {/* Clock Card */}
      <div className="mt-4">
        <DateTime />
      </div>

    </header>
  );
}