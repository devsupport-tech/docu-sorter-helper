
import { v4 as uuidv4 } from "uuid";
import { PhotoNoteData } from "@/components/photo/PhotoNote";
import { PhotoReportData } from "@/components/photo/PhotoReportDetails";

// Mock service for managing photo reports
class PhotoReportService {
  private readonly storageKey = "photo-reports";
  
  // Get all photo reports
  getReports(): PhotoReportData[] {
    const storedData = localStorage.getItem(this.storageKey);
    if (!storedData) return [];
    
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing photo reports from localStorage:", error);
      return [];
    }
  }
  
  // Get a single report by ID
  getReportById(id: string): PhotoReportData | null {
    const reports = this.getReports();
    return reports.find(report => report.id === id) || null;
  }
  
  // Create a new photo report
  createReport(data: {
    title: string;
    description: string;
    business: string;
    customer: string;
    photos: File[];
  }): Promise<PhotoReportData> {
    return new Promise((resolve) => {
      // Create photo URLs
      const photoPromises = data.photos.map(photo => this.createPhotoUrl(photo));
      
      Promise.all(photoPromises).then(photos => {
        const newReport: PhotoReportData = {
          id: uuidv4(),
          title: data.title,
          description: data.description,
          business: data.business,
          customer: data.customer,
          date: new Date().toISOString(),
          photos,
          notes: []
        };
        
        const reports = this.getReports();
        reports.unshift(newReport);
        this.saveReports(reports);
        
        resolve(newReport);
      });
    });
  }
  
  // Add a note to a report
  addNote(reportId: string, content: string): PhotoNoteData | null {
    const reports = this.getReports();
    const reportIndex = reports.findIndex(report => report.id === reportId);
    
    if (reportIndex === -1) return null;
    
    const newNote: PhotoNoteData = {
      id: uuidv4(),
      content,
      createdAt: new Date().toISOString()
    };
    
    reports[reportIndex].notes.unshift(newNote);
    this.saveReports(reports);
    
    return newNote;
  }
  
  // Update a note
  updateNote(reportId: string, noteId: string, content: string): PhotoNoteData | null {
    const reports = this.getReports();
    const reportIndex = reports.findIndex(report => report.id === reportId);
    
    if (reportIndex === -1) return null;
    
    const noteIndex = reports[reportIndex].notes.findIndex(note => note.id === noteId);
    
    if (noteIndex === -1) return null;
    
    reports[reportIndex].notes[noteIndex] = {
      ...reports[reportIndex].notes[noteIndex],
      content,
      updatedAt: new Date().toISOString()
    };
    
    this.saveReports(reports);
    
    return reports[reportIndex].notes[noteIndex];
  }
  
  // Delete a note
  deleteNote(reportId: string, noteId: string): boolean {
    const reports = this.getReports();
    const reportIndex = reports.findIndex(report => report.id === reportId);
    
    if (reportIndex === -1) return false;
    
    reports[reportIndex].notes = reports[reportIndex].notes.filter(note => note.id !== noteId);
    this.saveReports(reports);
    
    return true;
  }
  
  // Helper method to save reports to localStorage
  private saveReports(reports: PhotoReportData[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(reports));
  }
  
  // Helper method to create a photo URL
  private createPhotoUrl(photo: File): Promise<{ id: string; url: string; name: string }> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      const id = uuidv4();
      
      reader.onload = (event) => {
        resolve({
          id,
          url: event.target?.result as string,
          name: photo.name
        });
      };
      
      reader.readAsDataURL(photo);
    });
  }
}

// Export singleton instance
export const photoReportService = new PhotoReportService();

export default photoReportService;
