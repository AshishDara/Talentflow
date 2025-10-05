import type { SelectHTMLAttributes } from "react";
import { clsx } from "clsx";

export default function Select({
  className,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={clsx(
        "rounded-md border border-border px-2 py-1.5 text-sm shadow-sm transition-colors duration-200",
        "bg-card text-foreground",
        "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    />
  );
}