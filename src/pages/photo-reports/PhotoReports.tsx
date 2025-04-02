
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { PhotoReportForm, PhotoReportFormData } from "@/components/photo/PhotoReportForm";
import { PhotoReportData, PhotoReportDetails } from "@/components/photo/PhotoReportDetails";
import { photoReportService } from "@/lib/photo-report-service";
import { Plus, FileImage } from "lucide-react";

const PhotoReports = () => {
  const [activeTab, setActiveTab] = useState<"view" | "create">("view");
  const [reports, setReports] = useState<PhotoReportData[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin, isLoggedIn } = useAdminAuth();
  const { toast } = useToast();
  
  // Load reports on component mount
  useEffect(() => {
    const loadedReports = photoReportService.getReports();
    setReports(loadedReports);
    
    // If there are reports and none is selected, select the first one
    if (loadedReports.length > 0 && !selectedReportId) {
      setSelectedReportId(loadedReports[0].id);
    }
  }, [selectedReportId]);
  
  // Handle report selection
  const handleSelectReport = (reportId: string) => {
    setSelectedReportId(reportId);
  };
  
  // Handle new report creation
  const handleCreateReport = async (data: PhotoReportFormData) => {
    setIsLoading(true);
    
    try {
      const newReport = await photoReportService.createReport(data);
      
      toast({
        title: "Photo report created",
        description: "Your photo report has been created successfully"
      });
      
      // Update reports list and select the new report
      setReports([newReport, ...reports]);
      setSelectedReportId(newReport.id);
      setActiveTab("view");
    } catch (error) {
      toast({
        title: "Error creating report",
        description: "There was an error creating your photo report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle adding a note to a report
  const handleAddNote = (reportId: string, content: string) => {
    const newNote = photoReportService.addNote(reportId, content);
    
    if (newNote) {
      toast({
        title: "Note added",
        description: "Your note has been added to the report"
      });
      
      // Refresh reports
      setReports(photoReportService.getReports());
    } else {
      toast({
        title: "Error adding note",
        description: "There was an error adding your note. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Handle updating a note
  const handleUpdateNote = (reportId: string, noteId: string, content: string) => {
    const updatedNote = photoReportService.updateNote(reportId, noteId, content);
    
    if (updatedNote) {
      toast({
        title: "Note updated",
        description: "Your note has been updated"
      });
      
      // Refresh reports
      setReports(photoReportService.getReports());
    } else {
      toast({
        title: "Error updating note",
        description: "There was an error updating your note. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Handle deleting a note
  const handleDeleteNote = (reportId: string, noteId: string) => {
    const success = photoReportService.deleteNote(reportId, noteId);
    
    if (success) {
      toast({
        title: "Note deleted",
        description: "Your note has been deleted from the report"
      });
      
      // Refresh reports
      setReports(photoReportService.getReports());
    } else {
      toast({
        title: "Error deleting note",
        description: "There was an error deleting your note. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Find the selected report
  const selectedReport = selectedReportId
    ? reports.find(report => report.id === selectedReportId)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 pt-24 pb-16 max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Photo Reports</h1>
            <p className="text-muted-foreground mt-2">
              Create and manage photo reports with notes
            </p>
          </div>
          
          <Button onClick={() => setActiveTab("create")}>
            <Plus className="h-4 w-4 mr-2" />
            New Photo Report
          </Button>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as "view" | "create")}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="view">View Reports</TabsTrigger>
            <TabsTrigger value="create">Create Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="view" className="animate-fade-in space-y-6">
            {reports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Reports</h3>
                    
                    <div className="space-y-2">
                      {reports.map(report => (
                        <Card
                          key={report.id}
                          className={`p-3 cursor-pointer hover:bg-muted transition-colors ${
                            selectedReportId === report.id ? "bg-muted border-primary" : ""
                          }`}
                          onClick={() => handleSelectReport(report.id)}
                        >
                          <div className="font-medium truncate">{report.title}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {report.business} • {report.customer}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(report.date).toLocaleDateString()}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 lg:col-span-3">
                  {selectedReport ? (
                    <PhotoReportDetails
                      report={selectedReport}
                      onAddNote={handleAddNote}
                      onUpdateNote={handleUpdateNote}
                      onDeleteNote={handleDeleteNote}
                    />
                  ) : (
                    <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-lg border border-dashed">
                      <div className="text-center p-6">
                        <FileImage className="h-12 w-12 mx-auto text-muted-foreground opacity-40" />
                        <h3 className="mt-4 text-lg font-medium">No report selected</h3>
                        <p className="text-muted-foreground mt-1">
                          Select a report from the list to view its details
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-xl glass-panel p-8">
                <div className="text-center py-12">
                  <FileImage className="h-16 w-16 mx-auto text-muted-foreground opacity-40" />
                  <h2 className="mt-6 text-xl font-medium">No photo reports yet</h2>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Create your first photo report by clicking the "Create Report" tab
                    or the "New Photo Report" button.
                  </p>
                  <Button 
                    className="mt-6" 
                    onClick={() => setActiveTab("create")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Report
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="create" className="animate-fade-in">
            <Card className="p-6">
              <h2 className="text-xl font-medium mb-6">Create New Photo Report</h2>
              <PhotoReportForm 
                onSubmit={handleCreateReport}
                isLoading={isLoading}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PhotoReports;
