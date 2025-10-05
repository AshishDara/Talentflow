import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  asChild?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  className,
  variant = "primary",
  asChild = false,
  size = "md",
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const base =
    "inline-flex items-center justify-center rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:cursor-not-allowed disabled:opacity-50";

  const variants: Record<Variant, string> = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-700",
    secondary:
      "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
    ghost:
      "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const buttonClassName = clsx(base, variants[variant], sizes[size], className);

  if (asChild) {
    return <div className={buttonClassName}>{children}</div>;
  }

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  );
}