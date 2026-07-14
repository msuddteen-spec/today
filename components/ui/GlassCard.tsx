"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import useToday from "@/hooks/useToday";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: Props) {
  const { sunrise, sunset } = useToday();

  const now = Math.floor(Date.now() / 1000);

  const isNight =
    sunrise &&
    sunset &&
    (now < sunrise || now > sunset);

  return (
    <div
      className={clsx(
        "rounded-[30px] border backdrop-blur-2xl transition-all duration-500",

        isNight
          ? `
            bg-slate-900/35
            border-white/10
            shadow-[0_15px_45px_rgba(0,0,0,.45)]
            text-white
          `
          : `
            bg-white/35
            border-white/35
            shadow-[0_15px_45px_rgba(130,180,255,.18)]
            text-slate-900
          `,

        className
      )}
    >
      {children}
    </div>
  );
}