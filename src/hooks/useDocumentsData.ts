
import { useState, useEffect, useCallback } from "react";
import { n8nService, FileData } from "@/lib/n8n-service";
import { toast } from "./use-toast";

export const useDocumentsData = () => {
  const [documents, setDocuments] = useState<FileData[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<FileData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [businessFilter, setBusinessFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Fetch documents function (can be called to refresh)
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    
    try {
      const files = await n8nService.getRecentFiles(20);
      setDocuments(files);
      setFilteredDocuments(files);
      return files;
    } catch (error) {
      console.error("Error fetching documents:", error);
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : "Failed to fetch documents");
      setDocuments([]);
      setFilteredDocuments([]);
      
      toast({
        title: "Error loading documents",
        description: error instanceof Error ? error.message : "Failed to fetch documents",
        variant: "destructive"
      });
      
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Fetch documents on load
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);
  
  // Apply filters when they change
  useEffect(() => {
    let filtered = [...documents];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        doc => 
          doc.name.toLowerCase().includes(query) ||
          doc.business.toLowerCase().includes(query) ||
          doc.customer.toLowerCase().includes(query)
      );
    }
    
    // Apply business filter
    if (businessFilter !== "all") {
      filtered = filtered.filter(doc => doc.business === businessFilter);
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(doc => {
        if (statusFilter === "processed") return doc.processed;
        if (statusFilter === "pending") return !doc.processed;
        return true;
      });
    }
    
    setFilteredDocuments(filtered);
  }, [searchQuery, businessFilter, statusFilter, documents]);
  
  // Extract unique businesses for filter
  const businesses = Array.from(new Set(documents.map(doc => doc.business)));
  
  // Reset all filters
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setBusinessFilter("all");
    setStatusFilter("all");
  }, []);
  
  return {
    documents,
    filteredDocuments,
    isLoading,
    isError,
    errorMessage,
    searchQuery,
    setSearchQuery,
    businessFilter,
    setBusinessFilter,
    statusFilter,
    setStatusFilter,
    businesses,
    fetchDocuments,
    resetFilters
  };
};
