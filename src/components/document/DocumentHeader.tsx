
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { FileType, getFileIcon } from "@/utils/fileIcons";

interface DocumentHeaderProps {
  name: string;
  type: FileType;
  size: string;
}

export function DocumentHeader({ name, type, size }: DocumentHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        {getFileIcon(type)}
        <div className="space-y-1 text-left">
          <h3 className="font-medium truncate max-w-[180px]">
            {name}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground gap-2">
            <span>{size}</span>
            <span>•</span>
            <span className="capitalize">{type}</span>
          </div>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1 hover:bg-secondary">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Download</DropdownMenuItem>
          <DropdownMenuItem>Move</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
