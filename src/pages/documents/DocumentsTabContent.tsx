
import React from "react";
import { FileData } from "@/lib/n8n-service";
import { TabsContent } from "@/components/ui/tabs";
import { BusinessCustomerManager } from "@/components/BusinessCustomerManager";
import DocumentsFilters from "./DocumentsFilters";
import DocumentsTabs from "./DocumentsTabs";

interface DocumentsTabContentProps {
  activeTab: "documents" | "management";
  documents: FileData[];
  filteredDocuments: FileData[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  businessFilter: string;
  setBusinessFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  businesses: string[];
  isAdmin: boolean;
  isLoggedIn: boolean;
}

const DocumentsTabContent = ({
  activeTab,
  documents,
  filteredDocuments,
  isLoading,
  searchQuery,
  setSearchQuery,
  businessFilter,
  setBusinessFilter,
  statusFilter,
  setStatusFilter,
  businesses,
  isAdmin,
  isLoggedIn
}: DocumentsTabContentProps) => {
  return (
    <>
      <TabsContent value="documents" className="mt-0">
        <DocumentsFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          businessFilter={businessFilter}
          setBusinessFilter={setBusinessFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          businesses={businesses}
        />
        
        <div className="mt-6">
          <DocumentsTabs
            documents={documents}
            filteredDocuments={filteredDocuments}
            isLoading={isLoading}
            searchQuery={searchQuery}
            businessFilter={businessFilter}
            statusFilter={statusFilter}
            clearFilters={() => {
              setSearchQuery("");
              setBusinessFilter("all");
              setStatusFilter("all");
            }}
          />
        </div>
      </TabsContent>
      
      {isLoggedIn && isAdmin && (
        <TabsContent value="management" className="mt-0">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-medium mb-4">Business & Customer Management</h2>
            <p className="text-muted-foreground mb-6">
              Add, edit, or delete businesses and customers. These will be available when uploading documents.
            </p>
            <BusinessCustomerManager />
          </div>
        </TabsContent>
      )}
    </>
  );
};

export default DocumentsTabContent;
