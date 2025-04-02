
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit, Save, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PhotoNoteData {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

interface PhotoNoteProps {
  note: PhotoNoteData;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export function PhotoNote({
  note,
  onUpdate,
  onDelete,
  className
}: PhotoNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  
  const handleSave = () => {
    if (content.trim()) {
      onUpdate(note.id, content);
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    setContent(note.content);
    setIsEditing(false);
  };
  
  const formattedDate = new Date(note.updatedAt || note.createdAt).toLocaleString();

  return (
    <div className={cn("border rounded-md p-4", className)}>
      {isEditing ? (
        <div className="space-y-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[100px]"
            placeholder="Enter your note..."
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="whitespace-pre-wrap">{note.content}</div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-3.5 w-3.5 mr-1" />
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDelete(note.id)}
              >
                <Trash className="h-3.5 w-3.5 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
