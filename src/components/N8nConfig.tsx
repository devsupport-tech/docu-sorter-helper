
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Server } from "lucide-react";
import { n8nService, type N8nConfig as N8nConfigType } from "@/lib/n8n-service";

export function N8nConfig() {
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [documentWorkflowId, setDocumentWorkflowId] = useState("");
  const [videoWorkflowId, setVideoWorkflowId] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"untested" | "success" | "failure">("untested");
  const { toast } = useToast();
  
  useEffect(() => {
    // Load saved configuration if available
    const config = n8nService.getConfig();
    if (config) {
      setApiUrl(config.apiUrl);
      setApiKey(config.apiKey);
      setDocumentWorkflowId(config.workflowId);
      if (config.videoWorkflowId) {
        setVideoWorkflowId(config.videoWorkflowId);
      }
      setConnectionStatus("untested");
    }
  }, []);
  
  const handleSaveConfig = async () => {
    if (!apiUrl || !apiKey || !documentWorkflowId) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const config: N8nConfigType = {
      apiUrl,
      apiKey,
      workflowId: documentWorkflowId,
      videoWorkflowId: videoWorkflowId || undefined
    };
    
    n8nService.configure(config);
    
    toast({
      title: "Configuration saved",
      description: "n8n integration has been configured"
    });
    
    await testConnection();
  };
  
  const testConnection = async () => {
    setIsTesting(true);
    setConnectionStatus("untested");
    
    try {
      const result = await n8nService.testConnection();
      setConnectionStatus(result ? "success" : "failure");
      
      toast({
        title: result ? "Connection successful" : "Connection failed",
        description: result 
          ? "Successfully connected to n8n" 
          : "Could not connect to n8n. Please check your configuration",
        variant: result ? "default" : "destructive"
      });
    } catch (error) {
      setConnectionStatus("failure");
      
      toast({
        title: "Connection error",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          n8n Configuration
        </CardTitle>
        <CardDescription>
          Configure your n8n instance to automate document and video sorting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiUrl">n8n API URL</Label>
          <Input
            id="apiUrl"
            placeholder="https://your-n8n-instance.com"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            The base URL of your n8n instance (e.g., https://your-n8n-instance.com)
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Your n8n API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Your n8n API key for authentication
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="documentWorkflowId">Document Workflow ID</Label>
          <Input
            id="documentWorkflowId"
            placeholder="123456"
            value={documentWorkflowId}
            onChange={(e) => setDocumentWorkflowId(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            The ID of the document sorting workflow in your n8n instance
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="videoWorkflowId">Video Workflow ID (Optional)</Label>
          <Input
            id="videoWorkflowId"
            placeholder="123457"
            value={videoWorkflowId}
            onChange={(e) => setVideoWorkflowId(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            The ID of the video sorting workflow in your n8n instance (if different from document workflow)
          </p>
        </div>
        
        {connectionStatus !== "untested" && (
          <div className={`flex items-center gap-2 p-3 rounded-md text-sm ${
            connectionStatus === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}>
            {connectionStatus === "success" ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>
              {connectionStatus === "success" 
                ? "Successfully connected to n8n" 
                : "Failed to connect to n8n. Please check your configuration."
              }
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={testConnection}
          disabled={isTesting || !apiUrl || !apiKey || !documentWorkflowId}
        >
          Test Connection
        </Button>
        <Button 
          onClick={handleSaveConfig}
          disabled={isTesting || !apiUrl || !apiKey || !documentWorkflowId}
        >
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}
