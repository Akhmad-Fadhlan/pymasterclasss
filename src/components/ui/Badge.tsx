import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "selesai" | "berjalan" | "tertunda" | "dibatalkan" | "baru" | "default";
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = "default", children, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-200",
        {
          "bg-emerald-50 text-emerald-600 border-emerald-200/60": variant === "selesai",
          "bg-blue-50 text-blue-600 border-blue-200/60": variant === "berjalan",
          "bg-amber-50 text-amber-600 border-amber-200/60": variant === "tertunda",
          "bg-rose-50 text-rose-600 border-rose-200/60": variant === "dibatalkan",
          "bg-purple-50 text-purple-600 border-purple-200/60": variant === "baru",
          "bg-slate-100 text-slate-700 border-slate-200": variant === "default",
        },
        className
      )}
      {...props}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full", {
          "bg-emerald-500": variant === "selesai",
          "bg-blue-500": variant === "berjalan",
          "bg-amber-500": variant === "tertunda",
          "bg-rose-500": variant === "dibatalkan",
          "bg-purple-500": variant === "baru",
          "bg-slate-500": variant === "default",
        })}
      />
      {children}
    </span>
  );
};
