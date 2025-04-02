
import React from "react";
import { Button } from "@/components/ui/button";
import { X, FileText, Video } from "lucide-react";

interface FileListProps {
  files: File[];
  uploading: boolean;
  onRemoveFile: (index: number) => void;
  onClearFiles: () => void;
  onUploadFiles: () => void;
}

export function FileList({
  files,
  uploading,
  onRemoveFile,
  onClearFiles,
  onUploadFiles
}: FileListProps) {
  if (files.length === 0) return null;
  
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['mp4', 'mov', 'avi', 'webm'].includes(extension || '')) {
      return <Video className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/50 px-4 py-2 border-b">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">
            Files ({files.length})
          </h4>
          {!uploading && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearFiles}
            >
              Clear All
            </Button>
          )}
        </div>
      </div>
      
      <div className="divide-y max-h-[280px] overflow-y-auto">
        {files.map((file, index) => (
          <div 
            key={`${file.name}-${index}`} 
            className="flex items-center justify-between py-2 px-4 hover:bg-muted/30"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex-shrink-0">
                {getFileIcon(file.name)}
              </div>
              <div className="truncate">
                <div className="text-sm truncate">{file.name}</div>
                <div className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
            
            {!uploading && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-6 w-6"
                onClick={() => onRemoveFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      
      {!uploading && (
        <div className="bg-muted/50 px-4 py-3 border-t">
          <Button 
            className="w-full" 
            onClick={onUploadFiles}
          >
            Upload {files.length} file{files.length !== 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
}
