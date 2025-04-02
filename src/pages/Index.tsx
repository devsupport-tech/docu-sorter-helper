
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { BusinessCustomerSelect } from "@/components/BusinessCustomerSelect";
import { BusinessCustomerManager } from "@/components/BusinessCustomerManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Simple auth check for demo purposes - same as in Header
const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    setIsAdmin(localStorage.getItem("userRole") === "admin");
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);
  
  return { isAdmin, isLoggedIn };
};

const Index = () => {
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const { isAdmin, isLoggedIn } = useAdminAuth();
  const { toast } = useToast();

  // Ensure non-admins can't access the manage tab
  useEffect(() => {
    if (activeTab === "manage" && (!isLoggedIn || !isAdmin)) {
      setActiveTab("upload");
      toast({
        title: "Access Restricted",
        description: "You need to be logged in as an admin to manage businesses and customers.",
        variant: "destructive"
      });
    }
  }, [activeTab, isLoggedIn, isAdmin, toast]);

  const handleBusinessCustomerSelect = (business: string, customer: string) => {
    setSelectedBusiness(business);
    setSelectedCustomer(customer);
  };

  const handleFilesUploaded = (files: File[]) => {
    // For demo purposes, we'll simulate processing the files
    toast({
      title: "Files received",
      description: `${files.length} file(s) sent for processing`
    });
    
    // After a brief delay, show success
    setTimeout(() => {
      toast({
        title: "Processing complete",
        description: "Files have been sorted and stored"
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 pt-24 pb-16 max-w-screen-xl mx-auto">
        <div className="space-y-8 animate-fade-in">
          <section>
            <Tabs 
              defaultValue="upload" 
              value={activeTab}
              onValueChange={(value) => {
                // Only allow manage tab if user is logged in and admin
                if (value === "manage" && (!isLoggedIn || !isAdmin)) {
                  toast({
                    title: "Access Restricted",
                    description: "You need to be logged in as an admin to manage businesses and customers.",
                    variant: "destructive"
                  });
                  return;
                }
                setActiveTab(value);
              }}
              className="w-full"
            >
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="upload">Upload Documents</TabsTrigger>
                {isLoggedIn && isAdmin && (
                  <TabsTrigger value="manage">Manage Businesses</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="upload" className="mt-6">
                <div className="rounded-xl glass-panel p-6 md:p-8">
                  <h2 className="text-xl font-medium mb-4">Upload Files</h2>
                  <BusinessCustomerSelect 
                    onSelect={handleBusinessCustomerSelect}
                    className="mb-6"
                  />
                  <FileUpload
                    onFilesUploaded={handleFilesUploaded}
                  />
                </div>
              </TabsContent>

              {isLoggedIn && isAdmin && (
                <TabsContent value="manage" className="mt-6">
                  <div className="rounded-xl glass-panel p-6 md:p-8">
                    <h2 className="text-xl font-medium mb-4">Manage Businesses & Customers</h2>
                    <BusinessCustomerManager />
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
