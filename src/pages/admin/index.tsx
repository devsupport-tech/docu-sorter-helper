
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentFiles from './RecentFiles';
import Config from './Config';
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Simple auth check for demo purposes
const useAdminAuth = () => {
  // This would normally check a real auth system
  // For demo, we'll use localStorage
  const isAdmin = localStorage.getItem("userRole") === "admin";
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  return { isAdmin, isLoggedIn };
};

const AdminPanel = () => {
  const { isAdmin, isLoggedIn } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!isLoggedIn || !isAdmin) {
      toast({
        title: "Access denied",
        description: "You must be logged in as an admin to view this page",
        variant: "destructive"
      });
      navigate("/");
      return;
    }
  }, [isLoggedIn, isAdmin, toast, navigate]);

  if (!isLoggedIn || !isAdmin) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 pt-24 pb-16 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-medium">Admin Panel</h1>
              <p className="text-muted-foreground mt-1">
                Manage files and application settings
              </p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="recent-files" className="w-full animate-fade-in">
          <TabsList className="mb-8">
            <TabsTrigger value="recent-files">Recent Files</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent-files" className="mt-0">
            <RecentFiles />
          </TabsContent>
          
          <TabsContent value="configuration" className="mt-0">
            <Config />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
