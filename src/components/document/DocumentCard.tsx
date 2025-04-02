
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { DocumentHeader } from "./DocumentHeader";
import { DocumentInfo } from "./DocumentInfo";
import { DocumentStatusIndicator } from "./DocumentStatusIndicator";
import { FileType } from "@/utils/fileIcons";

export interface DocumentCardProps {
  id: string;
  name: string;
  type: FileType;
  size: string;
  business: string;
  customer: string;
  date: string;
  processed?: boolean;
  className?: string;
}

export function DocumentCard({
  id,
  name,
  type,
  size,
  business,
  customer,
  date,
  processed = false,
  className
}: DocumentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-200 border border-border/50 hover:border-primary/50 hover:shadow-md",
        isHovered ? "bg-secondary/50" : "bg-card",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <DocumentHeader name={name} type={type} size={size} />
        <DocumentInfo business={business} customer={customer} date={date} />
        
        <div className="mt-3 flex items-center justify-between">
          <DocumentStatusIndicator 
            processed={processed} 
            className={cn(isHovered ? "opacity-100" : "opacity-50")}
          />
        </div>
      </div>
      
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-1 transition-all duration-300",
        processed ? "bg-green-500" : "bg-amber-500",
        isHovered ? "opacity-100" : "opacity-50"
      )} />
    </Card>
  );
}
