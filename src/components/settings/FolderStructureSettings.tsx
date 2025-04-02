
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const FolderStructureSettings = () => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Folder Structure</CardTitle>
        <CardDescription>
          Configure how your documents are organized in folders
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rootFolder">Root Folder</Label>
          <Input
            id="rootFolder"
            placeholder="/documents"
            defaultValue="/documents"
          />
          <p className="text-xs text-muted-foreground">
            The root folder where all documents will be stored
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="folderStructure">Folder Structure</Label>
          <Input
            id="folderStructure"
            placeholder="/{business}/{customer}"
            defaultValue="/{business}/{customer}"
          />
          <p className="text-xs text-muted-foreground">
            The structure for organizing files. Available variables: {"{business}"}, {"{customer}"}, {"{year}"}, {"{month}"}, {"{day}"}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fileNaming">File Naming</Label>
          <Input
            id="fileNaming"
            placeholder="{original}"
            defaultValue="{original}"
          />
          <p className="text-xs text-muted-foreground">
            How files should be named. Available variables: {"{original}"}, {"{date}"}, {"{business}"}, {"{customer}"}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Switch id="duplicateHandling" defaultChecked />
          <Label htmlFor="duplicateHandling">
            Append version number to duplicate files
          </Label>
        </div>
        
        <div className="pt-4">
          <Button>
            Save Folder Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FolderStructureSettings;
