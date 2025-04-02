
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AdvancedSettings = () => {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>
          Configure advanced options for document sorting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="ocr" />
          <Label htmlFor="ocr">
            Enable OCR for document content extraction
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="autoTag" defaultChecked />
          <Label htmlFor="autoTag">
            Automatically tag documents based on content
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="compression" defaultChecked />
          <Label htmlFor="compression">
            Compress files before storage
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="backup" />
          <Label htmlFor="backup">
            Keep backup of original files
          </Label>
        </div>
        
        <div className="space-y-2 pt-4">
          <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
          <Input
            id="maxFileSize"
            type="number"
            defaultValue="25"
            min="1"
            max="100"
          />
        </div>
        
        <div className="pt-4">
          <Button>
            Save Advanced Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettings;
