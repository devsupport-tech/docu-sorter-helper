
import { Header } from "@/components/Header";
import { N8nConfig } from "@/components/N8nConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FolderStructureSettings from "@/components/settings/FolderStructureSettings";
import AdvancedSettings from "@/components/settings/AdvancedSettings";
import HelpResources from "@/components/settings/HelpResources";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 pt-24 pb-16 max-w-screen-xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-medium">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your document sorting application
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in">
            <Tabs defaultValue="n8n" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="n8n">n8n Integration</TabsTrigger>
                <TabsTrigger value="folders">Folder Structure</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              <TabsContent value="n8n" className="mt-0">
                <N8nConfig />
              </TabsContent>
              
              <TabsContent value="folders" className="mt-0">
                <FolderStructureSettings />
              </TabsContent>
              
              <TabsContent value="advanced" className="mt-0">
                <AdvancedSettings />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6 animate-fade-in delay-100">
            <HelpResources />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
