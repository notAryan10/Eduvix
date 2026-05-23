import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-3xl p-6 shadow-sm border border-gray-100",
          hover && "transition-all hover:shadow-md hover:scale-[1.01]",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
