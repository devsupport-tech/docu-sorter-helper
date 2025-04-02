
import React from "react";
import { FolderIcon, Calendar } from "lucide-react";

interface DocumentInfoProps {
  business: string;
  customer: string;
  date: string;
}

export function DocumentInfo({ business, customer, date }: DocumentInfoProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs">
        <FolderIcon className="h-3 w-3 text-muted-foreground" />
        <span className="text-muted-foreground">
          {business} / {customer}
        </span>
      </div>
      
      <div className="flex items-center gap-2 text-xs">
        <Calendar className="h-3 w-3 text-muted-foreground" />
        <span className="text-muted-foreground">{date}</span>
      </div>
    </div>
  );
}
