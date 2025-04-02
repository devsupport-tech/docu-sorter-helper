
import { useState, useEffect } from "react";
import { DocumentCard } from "@/components/document";
import { useToast } from "@/hooks/use-toast";
import { FolderIcon } from "lucide-react";
import { n8nService, FileData } from "@/lib/n8n-service";

const RecentFiles = () => {
  const [recentFiles, setRecentFiles] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecentFiles = async () => {
      try {
        const files = await n8nService.getRecentFiles(20);
        setRecentFiles(files);
      } catch (error) {
        console.error("Error fetching recent files:", error);
        toast({
          title: "Error",
          description: "Failed to fetch recent files",
          variant: "destructive"
        });
        setRecentFiles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentFiles();
  }, [toast]);

  return (
    <div className="space-y-8 animate-fade-in">
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-card rounded-lg border border-border/50 h-[160px] animate-pulse"
              />
            ))
          ) : recentFiles.length > 0 ? (
            recentFiles.map((file) => (
              <DocumentCard
                key={file.id}
                id={file.id}
                name={file.name}
                type={file.type}
                size={file.size}
                business={file.business}
                customer={file.customer}
                date={file.date}
                processed={file.processed}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-10 bg-muted/30 rounded-lg border border-dashed">
              <FolderIcon className="h-12 w-12 text-muted-foreground opacity-40" />
              <h3 className="mt-4 text-lg font-medium">No files yet</h3>
              <p className="text-muted-foreground mt-1">
                No files have been uploaded yet
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecentFiles;
