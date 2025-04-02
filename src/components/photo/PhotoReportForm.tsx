
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "@/components/FileUpload";

interface PhotoReportFormProps {
  onSubmit: (data: PhotoReportFormData) => void;
  isLoading?: boolean;
}

export interface PhotoReportFormData {
  title: string;
  description: string;
  business: string;
  customer: string;
  photos: File[];
}

export function PhotoReportForm({
  onSubmit,
  isLoading = false
}: PhotoReportFormProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const { toast } = useToast();
  
  const form = useForm<PhotoReportFormData>({
    defaultValues: {
      title: "",
      description: "",
      business: "",
      customer: "",
      photos: []
    }
  });
  
  const handleFormSubmit = (data: PhotoReportFormData) => {
    if (photos.length === 0) {
      toast({
        title: "No photos selected",
        description: "Please upload at least one photo for the report",
        variant: "destructive"
      });
      return;
    }
    
    // Pass form data with photos to parent component
    onSubmit({
      ...data,
      photos
    });
  };
  
  const handlePhotosUploaded = (files: File[]) => {
    // Filter to only accept image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Invalid files detected",
        description: "Only image files are allowed for photo reports",
        variant: "destructive"
      });
    }
    
    setPhotos(imageFiles);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter report title" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="business"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter business name" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter customer name" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter report description" 
                    {...field} 
                    disabled={isLoading}
                    className="min-h-[100px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <FormLabel>Upload Photos</FormLabel>
            <FileUpload
              onFilesUploaded={handlePhotosUploaded}
              allowMultiple={true}
              acceptedTypes=".jpg,.jpeg,.png,.webp,.heic,.heif"
              maxSize={20}
              className="mt-1"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isLoading}
          >
            Create Photo Report
          </Button>
        </form>
      </Form>
    </div>
  );
}
