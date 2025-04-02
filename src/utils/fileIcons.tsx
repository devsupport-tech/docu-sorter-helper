
import React from "react";
import { 
  FileIcon, 
  Film,
  PlayCircle
} from "lucide-react";

export type FileType = "pdf" | "doc" | "image" | "video" | "other";

export function getFileIcon(type: FileType) {
  switch (type) {
    case "pdf":
      return <FileIcon className="h-10 w-10 text-red-500" />;
    case "doc":
      return <FileIcon className="h-10 w-10 text-blue-500" />;
    case "image":
      return <FileIcon className="h-10 w-10 text-green-500" />;
    case "video":
      return (
        <div className="relative">
          <Film className="h-10 w-10 text-purple-500" />
          <PlayCircle className="absolute bottom-0 right-0 h-4 w-4 text-purple-700 bg-white rounded-full" />
        </div>
      );
    default:
      return <FileIcon className="h-10 w-10 text-gray-500" />;
  }
}
