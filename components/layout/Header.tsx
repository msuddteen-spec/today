"use client";

import { useEffect, useState } from "react";
import { Bell, CalendarDays, Clock3, Sun, Leaf } from "lucide-react";

export default function Header() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = now.toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="px-6 pt-8">
      {/* Notification */}
      <div className="flex justify-end">
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/70 shadow-lg backdrop-blur-xl transition hover:scale-105">
          <Bell size={20} />
        </button>
      </div>

      {/* Logo */}
      <div className="mt-4 text-center">
        <h1 className="text-5xl font-black tracking-tight">
          วันนี้
        </h1>

        <p className="mt-2 text-slate-500">
          รู้ก่อน...ออกจากบ้าน
        </p>
      </div>

      {/* Dynamic Capsule */}
      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-xs rounded-[32px] border border-white/40 bg-white/70 p-5 shadow-xl backdrop-blur-2xl">

          <div className="flex items-center gap-3">
            <Clock3 className="text-indigo-500" size={18} />
            <span className="text-sm font-semibold">{time}</span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <CalendarDays className="text-blue-500" size={18} />
            <span className="text-sm">{date}</span>
          </div>

          <div className="my-4 h-px bg-slate-200" />

          <div className="flex items-center gap-3">
            <Sun className="text-yellow-500" size={18} />
            <span className="text-sm">32°C</span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <Leaf className="text-green-500" size={18} />
            <span className="text-sm">AQI 42 ดี</span>
          </div>

        </div>
      </div>
    </header>
  );
}