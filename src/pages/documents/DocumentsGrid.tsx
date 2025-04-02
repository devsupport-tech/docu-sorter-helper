
import { DocumentCard } from "@/components/document";
import { FileData } from "@/lib/n8n-service";

interface DocumentsGridProps {
  documents?: FileData[];
  isLoading?: boolean;
}

const DocumentsGrid = ({ documents = [], isLoading = false }: DocumentsGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i} 
            className="bg-card rounded-lg border border-border/50 h-[200px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          id={document.id}
          name={document.name}
          type={document.type}
          size={document.size}
          business={document.business}
          customer={document.customer}
          date={document.date}
          processed={document.processed}
        />
      ))}
    </div>
  );
};

export default DocumentsGrid;
