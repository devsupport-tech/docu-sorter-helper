
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useDocumentsData } from "@/hooks/useDocumentsData";
import DocumentsHeader from "./DocumentsHeader";
import DocumentsTabContent from "./DocumentsTabContent";

const Documents = () => {
  const [activeTab, setActiveTab] = useState<"documents" | "management">("documents");
  const { isAdmin, isLoggedIn } = useAdminAuth();
  const { toast } = useToast();
  
  const { 
    documents,
    filteredDocuments,
    isLoading,
    searchQuery,
    setSearchQuery,
    businessFilter,
    setBusinessFilter,
    statusFilter,
    setStatusFilter,
    businesses
  } = useDocumentsData();
  
  // Redirect non-logged in users or non-admins if they try to access management tab
  useEffect(() => {
    if (activeTab === "management" && (!isLoggedIn || !isAdmin)) {
      setActiveTab("documents");
      toast({
        title: "Access Restricted",
        description: "You need to be logged in as an admin to manage businesses and customers.",
        variant: "destructive"
      });
    }
  }, [activeTab, isLoggedIn, isAdmin, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 pt-24 pb-16 max-w-screen-xl mx-auto">
        <DocumentsHeader 
          isAdmin={isAdmin}
          isLoggedIn={isLoggedIn}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <div className="space-y-6 animate-fade-in">
          <Tabs value={activeTab} onValueChange={(value) => {
            // Only allow management tab if user is logged in and admin
            if (value === "management" && (!isLoggedIn || !isAdmin)) {
              toast({
                title: "Access Restricted",
                description: "You need to be logged in as an admin to manage businesses and customers.",
                variant: "destructive"
              });
              return;
            }
            setActiveTab(value as "documents" | "management");
          }}>
            <TabsList className="mb-6">
              <TabsTrigger value="documents">Document Library</TabsTrigger>
              {isLoggedIn && isAdmin && (
                <TabsTrigger value="management">Business & Customer Management</TabsTrigger>
              )}
            </TabsList>
            
            <DocumentsTabContent
              activeTab={activeTab}
              documents={documents}
              filteredDocuments={filteredDocuments}
              isLoading={isLoading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              businessFilter={businessFilter}
              setBusinessFilter={setBusinessFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              businesses={businesses}
              isAdmin={isAdmin}
              isLoggedIn={isLoggedIn}
            />
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Documents;
