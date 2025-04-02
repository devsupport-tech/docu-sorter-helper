
import { N8nConfig } from "@/components/N8nConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderStructureSettings, AdvancedSettings, HelpResources } from "@/components/settings";

const Config = () => {
  return (
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
  );
};

export default Config;
