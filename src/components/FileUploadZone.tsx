
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadZoneProps {
  onFileSelect: (files: File[]) => void;
  acceptedTypes: string;
  allowMultiple: boolean;
  maxSize: number;
  uploading: boolean;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export function FileUploadZone({
  onFileSelect,
  acceptedTypes,
  allowMultiple,
  maxSize,
  uploading,
  isDragging,
  setIsDragging
}: FileUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    onFileSelect(droppedFiles);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      onFileSelect(selectedFiles);
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 transition-all duration-200 text-center",
        isDragging 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/50 hover:bg-secondary/50",
        uploading && "opacity-50 pointer-events-none"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleFileDrop}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="rounded-full bg-secondary p-3 mb-2">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Drag & drop files here</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Drop your documents or videos to upload. We'll automatically sort them for you.
        </p>
        
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          Select Files
        </Button>
        
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden"
          multiple={allowMultiple}
          accept={acceptedTypes}
          onChange={handleFileChange}
          disabled={uploading}
        />
        
        <div className="text-xs text-muted-foreground mt-2">
          Accepted formats: PDF, DOC, DOCX, JPG, PNG, MP4, MOV, AVI, WEBM up to {maxSize}MB
        </div>
      </div>
    </div>
  );
}
