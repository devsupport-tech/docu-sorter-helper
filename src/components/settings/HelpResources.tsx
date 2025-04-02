
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HelpResources = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Help & Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <h3 className="text-sm font-medium mb-2">n8n Workflow Setup</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Learn how to create an n8n workflow for document sorting
          </p>
          <Button variant="outline" size="sm" className="w-full">
            View Guide
          </Button>
        </div>
        
        <div className="rounded-lg bg-muted p-4">
          <h3 className="text-sm font-medium mb-2">Folder Structure Tips</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Best practices for organizing your documents
          </p>
          <Button variant="outline" size="sm" className="w-full">
            View Guide
          </Button>
        </div>
        
        <div className="rounded-lg bg-muted p-4">
          <h3 className="text-sm font-medium mb-2">Troubleshooting</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Solutions for common issues
          </p>
          <Button variant="outline" size="sm" className="w-full">
            View Guide
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpResources;
