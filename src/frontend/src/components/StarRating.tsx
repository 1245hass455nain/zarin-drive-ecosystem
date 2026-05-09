import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-8 h-8" };

export function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <fieldset
      className={cn("flex gap-1 border-none p-0 m-0", className)}
      aria-label="Star rating"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          className={cn(
            "transition-smooth",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110",
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= display
                ? "fill-primary text-primary"
                : "fill-muted text-muted-foreground",
            )}
          />
        </button>
      ))}
    </fieldset>
  );
}
