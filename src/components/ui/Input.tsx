import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, helperText, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-[#0F172A] ml-1">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            "glass-input w-full px-4 py-2.5 rounded-xl text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-danger focus:ring-danger/20" : "",
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-xs text-danger font-medium ml-1">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-xs text-slate-500 ml-1">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
