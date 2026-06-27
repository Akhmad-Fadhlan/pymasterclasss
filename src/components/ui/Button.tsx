import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "disabled";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || variant === "disabled"}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
          // Variants
          {
            "bg-primary text-white hover:bg-blue-700 shadow-md shadow-primary/10 active:scale-[0.98]": variant === "primary",
            "bg-primary/10 text-primary hover:bg-primary/15 active:scale-[0.98]": variant === "secondary",
            "border border-primary text-primary hover:bg-primary/5 active:scale-[0.98]": variant === "outline",
            "text-primary hover:bg-primary/5": variant === "ghost",
            "bg-slate-200 text-slate-400 cursor-not-allowed": variant === "disabled" || disabled,
          },
          // Sizes
          {
            "px-3 py-1.5 text-xs": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-6 py-3.5 text-base": size === "lg",
          },
          // Width
          fullWidth ? "w-full" : "",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
