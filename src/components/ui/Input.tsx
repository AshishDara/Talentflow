import type { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

export default function Input({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm shadow-sm transition-colors duration-200",
        "bg-white text-gray-900 placeholder-gray-500",
        "focus:outline-none focus:ring-2 focus:ring-gray-900/50 focus:border-gray-900",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...rest}
    />
  );
}