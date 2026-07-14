import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        `
        rounded-[32px]
        border
        border-white/40
        bg-white/55
        backdrop-blur-3xl
        shadow-[0_10px_40px_rgba(0,0,0,.08)]
        transition-all
        duration-300
        hover:shadow-[0_20px_60px_rgba(0,0,0,.12)]
        `,
        className
      )}
    >
      {children}
    </div>
  );
}