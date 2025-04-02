
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { FileImage } from "lucide-react";

interface PhotoThumbnailProps {
  id: string;
  src: string;
  alt: string;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

export function PhotoThumbnail({
  id,
  src,
  alt,
  onClick,
  isSelected = false,
  className
}: PhotoThumbnailProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-200 border hover:border-primary/50 hover:shadow-md cursor-pointer aspect-square",
        isSelected ? "ring-2 ring-primary border-primary" : "border-border/50",
        className
      )}
      onClick={onClick}
    >
      {hasError ? (
        <div className="flex items-center justify-center h-full bg-muted">
          <FileImage className="h-8 w-8 text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className={cn(
            "absolute inset-0 flex items-center justify-center bg-muted/50",
            isLoaded ? "opacity-0" : "opacity-100"
          )}>
            <FileImage className="h-8 w-8 text-muted-foreground animate-pulse" />
          </div>
          <img
            src={src}
            alt={alt}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        </>
      )}
    </Card>
  );
}
