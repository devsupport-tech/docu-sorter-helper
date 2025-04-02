
import { Folder, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyDocumentsStateProps {
  hasFilters: boolean;
  clearFilters: () => void;
}

const EmptyDocumentsState = ({ hasFilters, clearFilters }: EmptyDocumentsStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-muted/30 rounded-lg border border-dashed">
      <Folder className="h-16 w-16 text-muted-foreground opacity-40" />
      <h3 className="mt-4 text-xl font-medium">No documents found</h3>
      <p className="text-muted-foreground mt-1 mb-6 text-center max-w-md">
        {hasFilters
          ? "Try adjusting your search or filters"
          : "Upload your first document to get started"}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {hasFilters && (
          <Button 
            variant="outline"
            onClick={clearFilters}
          >
            Clear Filters
          </Button>
        )}
        <Button asChild>
          <Link to="/">
            <FilePlus className="mr-2 h-4 w-4" />
            Upload Document
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EmptyDocumentsState;
