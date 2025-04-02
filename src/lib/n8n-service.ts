// This file provides interfaces and mock implementation for n8n integration
// In a real implementation, you'd replace these with actual API calls

// Interfaces
export interface N8nConfig {
  apiUrl: string;
  apiKey: string;
  workflowId: string;
  videoWorkflowId?: string;
}

export interface FileData {
  id: string;
  name: string;
  type: "image" | "pdf" | "doc" | "video" | "other";
  size: string;
  business: string;
  customer: string;
  date: string;
  processed: boolean;
  path?: string;
}

export interface SortResult {
  success: boolean;
  fileId: string;
  path?: string;
  error?: string;
}

// Mock implementation
class N8nService {
  private config: N8nConfig | null = null;

  configure(config: N8nConfig): void {
    this.config = config;
    console.log("N8n service configured:", config);
  }

  isConfigured(): boolean {
    return !!this.config;
  }

  getConfig(): N8nConfig | null {
    return this.config;
  }

  async testConnection(): Promise<boolean> {
    if (!this.config) return false;

    // In a real implementation, this would make an actual API call to n8n
    console.log("Testing connection to n8n...");
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Connection successful");
        resolve(true);
      }, 1000);
    });
  }

  private isVideoFile(fileName: string): boolean {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return ['mp4', 'mov', 'avi', 'webm'].includes(extension || '');
  }

  async sortFiles(files: File[], business: string, customer: string): Promise<SortResult[]> {
    if (!this.config) throw new Error("N8n service not configured");

    console.log("Sorting files via n8n:", { files, business, customer });
    
    // Group files by type (document or video)
    const documentFiles: File[] = [];
    const videoFiles: File[] = [];
    
    Array.from(files).forEach(file => {
      if (this.isVideoFile(file.name)) {
        videoFiles.push(file);
      } else {
        documentFiles.push(file);
      }
    });
    
    // In a real implementation, this would:
    // 1. Upload the files to a temporary location
    // 2. Trigger the n8n workflow with the files, business, and customer
    // 3. Return the results
    
    const results: SortResult[] = [];
    
    // Process document files
    if (documentFiles.length > 0) {
      console.log(`Processing ${documentFiles.length} document files with workflow ID: ${this.config.workflowId}`);
      // Simulate processing documents
      const docResults = await new Promise<SortResult[]>((resolve) => {
        setTimeout(() => {
          const res = documentFiles.map((file, index) => ({
            success: Math.random() > 0.1, // 90% success rate
            fileId: `doc-${Date.now()}-${index}`,
            path: `/businesses/${business}/${customer}/documents/${file.name}`,
            error: Math.random() > 0.9 ? "Simulated error processing document" : undefined
          }));
          resolve(res);
        }, 1000);
      });
      results.push(...docResults);
    }
    
    // Process video files
    if (videoFiles.length > 0) {
      const workflowId = this.config.videoWorkflowId || this.config.workflowId;
      console.log(`Processing ${videoFiles.length} video files with workflow ID: ${workflowId}`);
      // Simulate processing videos
      const videoResults = await new Promise<SortResult[]>((resolve) => {
        setTimeout(() => {
          const res = videoFiles.map((file, index) => ({
            success: Math.random() > 0.1, // 90% success rate
            fileId: `video-${Date.now()}-${index}`,
            path: `/businesses/${business}/${customer}/videos/${file.name}`,
            error: Math.random() > 0.9 ? "Simulated error processing video" : undefined
          }));
          resolve(res);
        }, 2000); // Videos take longer to process
      });
      results.push(...videoResults);
    }
    
    console.log("Sort results:", results);
    return results;
  }

  async getRecentFiles(limit: number = 10): Promise<FileData[]> {
    if (!this.config) throw new Error("N8n service not configured");
    
    console.log("Getting recent files...");
    
    // Mock implementation with simulated delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockFiles: FileData[] = [
          {
            id: "file-1",
            name: "Invoice_2023.pdf",
            type: "pdf",
            size: "2.4 MB",
            business: "Acme Corp",
            customer: "John Doe",
            date: "2023-09-15",
            processed: true
          },
          {
            id: "file-2",
            name: "Contract_2023.doc",
            type: "doc",
            size: "1.2 MB",
            business: "Globex Industries",
            customer: "Alice Johnson",
            date: "2023-09-14",
            processed: true
          },
          {
            id: "file-3",
            name: "Company_Intro.mp4",
            type: "video",
            size: "15.7 MB",
            business: "Stark Enterprises",
            customer: "Tony Stark",
            date: "2023-09-13",
            processed: true
          },
          {
            id: "file-4",
            name: "Proposal.doc",
            type: "doc",
            size: "0.8 MB",
            business: "Wayne Industries",
            customer: "Bruce Wayne",
            date: "2023-09-12",
            processed: false
          },
          {
            id: "file-5",
            name: "Product_Demo.mov",
            type: "video",
            size: "28.3 MB",
            business: "Umbrella Corporation",
            customer: "Albert Wesker",
            date: "2023-09-11",
            processed: true
          }
        ];
        
        resolve(mockFiles.slice(0, limit));
      }, 800);
    });
  }
}

// Export singleton instance
export const n8nService = new N8nService();

export default n8nService;
