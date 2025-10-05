import type { HTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

export function Card({
  children,
  className,
  ...rest
}: PropsWithChildren<{ className?: string } & HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={clsx(
        "rounded-lg bg-card shadow-lg relative overflow-hidden",
        className
      )}
      {...rest}
    >
      {/* Accent border */}
      <div className="absolute top-0 left-0 h-1 w-full bg-accent"></div>
      <div className="p-4 pt-5">
        {children}
      </div>
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "mb-3 flex items-center justify-between gap-3",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("text-sm text-foreground leading-relaxed", className)}>
      {children}
    </div>
  );
}