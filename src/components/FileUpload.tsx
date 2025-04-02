
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { FileUploadZone } from "./FileUploadZone";
import { FileList } from "./FileList";
import { UploadProgress } from "./UploadProgress";

interface FileUploadProps {
  onFilesUploaded?: (files: File[]) => void;
  allowMultiple?: boolean;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  className?: string;
}

export function FileUpload({
  onFilesUploaded,
  allowMultiple = true,
  acceptedTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov,.avi,.webm",
  maxSize = 100, // increased to 100MB for video files
  className
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  
  const processFiles = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the maximum size of ${maxSize}MB`,
          variant: "destructive"
        });
        return false;
      }
      
      // Check file type
      const fileType = `.${file.name.split('.').pop()}`;
      if (!acceptedTypes.includes(fileType)) {
        toast({
          title: "Unsupported file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });
    
    setFiles(prevFiles => [...prevFiles, ...validFiles]);
  };
  
  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  const clearFiles = () => {
    setFiles([]);
  };
  
  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    
    // Simulate API call to n8n
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        if (onFilesUploaded) {
          onFilesUploaded(files);
        }
        
        toast({
          title: "Upload complete",
          description: `Successfully uploaded ${files.length} file${files.length !== 1 ? 's' : ''}`,
        });
        
        setUploading(false);
        setFiles([]);
      }, 500);
    }, 4000);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <FileUploadZone
        onFileSelect={processFiles}
        acceptedTypes={acceptedTypes}
        allowMultiple={allowMultiple}
        maxSize={maxSize}
        uploading={uploading}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      />
      
      <FileList
        files={files}
        uploading={uploading}
        onRemoveFile={removeFile}
        onClearFiles={clearFiles}
        onUploadFiles={uploadFiles}
      />
      
      {files.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <UploadProgress 
            progress={progress} 
            visible={uploading} 
          />
        </div>
      )}
    </div>
  );
}
