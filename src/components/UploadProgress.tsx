
import React from "react";
import { Progress } from "@/components/ui/progress";

interface UploadProgressProps {
  progress: number;
  visible: boolean;
}

export function UploadProgress({ progress, visible }: UploadProgressProps) {
  if (!visible) return null;

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center justify-between text-sm mb-1">
        <span>Uploading...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
