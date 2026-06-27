import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "glass-dark" | "flat" | "outline";
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = "glass",
  hoverable = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden p-6 transition-all duration-300",
        {
          "glass-card": variant === "glass",
          "glass-dark": variant === "glass-dark",
          "bg-white shadow-sm border border-slate-100": variant === "flat",
          "border border-slate-200 bg-transparent": variant === "outline",
        },
        hoverable
          ? "hover:translate-y-[-4px] hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
          : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
