
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PhotoNote, PhotoNoteData } from "./PhotoNote";
import { PhotoThumbnail } from "./PhotoThumbnail";
import { PhotoViewer } from "./PhotoViewer";
import { FileImage, Plus } from "lucide-react";

export interface PhotoReportData {
  id: string;
  title: string;
  description: string;
  business: string;
  customer: string;
  date: string;
  photos: {
    id: string;
    url: string;
    name: string;
  }[];
  notes: PhotoNoteData[];
}

interface PhotoReportDetailsProps {
  report: PhotoReportData;
  onAddNote: (reportId: string, content: string) => void;
  onUpdateNote: (reportId: string, noteId: string, content: string) => void;
  onDeleteNote: (reportId: string, noteId: string) => void;
}

export function PhotoReportDetails({
  report,
  onAddNote,
  onUpdateNote,
  onDeleteNote
}: PhotoReportDetailsProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [newNote, setNewNote] = useState("");
  
  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };
  
  const handleCloseViewer = () => {
    setSelectedPhotoIndex(null);
  };
  
  const handleNextPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < report.photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };
  
  const handlePreviousPhoto = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(report.id, newNote.trim());
      setNewNote("");
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{report.title}</h3>
            <div className="text-sm text-muted-foreground">
              {report.business} • {report.customer} • {new Date(report.date).toLocaleDateString()}
            </div>
          </div>
          
          {report.description && (
            <div className="pt-2 border-t">
              <p className="whitespace-pre-wrap">{report.description}</p>
            </div>
          )}
        </div>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Photos</h3>
        {report.photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {report.photos.map((photo, index) => (
              <PhotoThumbnail
                key={photo.id}
                id={photo.id}
                src={photo.url}
                alt={photo.name}
                onClick={() => handlePhotoClick(index)}
                isSelected={selectedPhotoIndex === index}
              />
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 border border-dashed rounded-lg p-8 text-center">
            <FileImage className="h-12 w-12 mx-auto text-muted-foreground opacity-40" />
            <h3 className="mt-4 text-lg font-medium">No photos</h3>
            <p className="text-muted-foreground mt-1">This report doesn't have any photos yet</p>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notes</h3>
        
        <Card className="p-4">
          <Textarea
            placeholder="Add a new note to this report..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            className="mt-3" 
            onClick={handleAddNote}
            disabled={!newNote.trim()}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Note
          </Button>
        </Card>
        
        {report.notes.length > 0 ? (
          <div className="space-y-4">
            {report.notes.map((note) => (
              <PhotoNote
                key={note.id}
                note={note}
                onUpdate={(noteId, content) => onUpdateNote(report.id, noteId, content)}
                onDelete={(noteId) => onDeleteNote(report.id, noteId)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 border border-dashed rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium">No notes yet</h3>
            <p className="text-muted-foreground mt-1">
              Add notes to provide additional context or observations about this report
            </p>
          </div>
        )}
      </div>
      
      {selectedPhotoIndex !== null && report.photos[selectedPhotoIndex] && (
        <PhotoViewer
          src={report.photos[selectedPhotoIndex].url}
          alt={report.photos[selectedPhotoIndex].name}
          onClose={handleCloseViewer}
          onNext={selectedPhotoIndex < report.photos.length - 1 ? handleNextPhoto : undefined}
          onPrevious={selectedPhotoIndex > 0 ? handlePreviousPhoto : undefined}
          hasNext={selectedPhotoIndex < report.photos.length - 1}
          hasPrevious={selectedPhotoIndex > 0}
        />
      )}
    </div>
  );
}
