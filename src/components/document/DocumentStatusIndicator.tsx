
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface DocumentStatusIndicatorProps {
  processed: boolean;
  className?: string;
}

export function DocumentStatusIndicator({ 
  processed, 
  className 
}: DocumentStatusIndicatorProps) {
  return (
    <>
      <Badge 
        variant={processed ? "secondary" : "outline"}
        className={cn(
          "text-xs",
          processed ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400" : "",
          className
        )}
      >
        {processed ? "Processed" : "Pending"}
      </Badge>
      
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-1 transition-all duration-300",
        processed ? "bg-green-500" : "bg-amber-500",
      )} />
    </>
  );
}
