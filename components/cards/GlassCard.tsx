"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={clsx(
        "glass rounded-[32px] p-6 shadow-xl transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}