
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileData } from "@/lib/n8n-service";
import { Check } from "lucide-react";
import DocumentsGrid from "./DocumentsGrid";
import EmptyDocumentsState from "./EmptyDocumentsState";

interface DocumentsTabsProps {
  documents: FileData[];
  filteredDocuments: FileData[];
  isLoading: boolean;
  searchQuery: string;
  businessFilter: string;
  statusFilter: string;
  clearFilters: () => void;
}

const DocumentsTabs = ({
  documents,
  filteredDocuments,
  isLoading,
  searchQuery,
  businessFilter,
  statusFilter,
  clearFilters,
}: DocumentsTabsProps) => {
  const pendingDocuments = documents.filter(doc => !doc.processed);
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="all">All Documents</TabsTrigger>
        <TabsTrigger value="recent">Recently Added</TabsTrigger>
        <TabsTrigger value="processing">Processing</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        {isLoading ? (
          <DocumentsGrid isLoading />
        ) : filteredDocuments.length > 0 ? (
          <DocumentsGrid documents={filteredDocuments} />
        ) : (
          <EmptyDocumentsState 
            hasFilters={Boolean(searchQuery || businessFilter !== "all" || statusFilter !== "all")}
            clearFilters={clearFilters}
          />
        )}
      </TabsContent>
      
      <TabsContent value="recent" className="mt-0">
        <DocumentsGrid documents={recentDocuments} />
      </TabsContent>
      
      <TabsContent value="processing" className="mt-0">
        {pendingDocuments.length > 0 ? (
          <DocumentsGrid documents={pendingDocuments} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-muted/30 rounded-lg border border-dashed">
            <Check className="h-16 w-16 text-green-500 opacity-80" />
            <h3 className="mt-4 text-xl font-medium">No documents in processing</h3>
            <p className="text-muted-foreground mt-1 mb-6">
              All your documents have been processed
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default DocumentsTabs;
