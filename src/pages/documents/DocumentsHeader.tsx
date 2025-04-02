
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FilePlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentsHeaderProps {
  isAdmin: boolean;
  isLoggedIn: boolean;
  activeTab: "documents" | "management";
  setActiveTab: (tab: "documents" | "management") => void;
}

const DocumentsHeader = ({ 
  isAdmin, 
  isLoggedIn, 
  activeTab, 
  setActiveTab 
}: DocumentsHeaderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-medium">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Manage and browse all your documents
          </p>
        </div>
      </div>
      
      <div className="flex gap-2">
        {isLoggedIn && isAdmin && (
          <Button 
            variant={activeTab === "management" ? "default" : "outline"}
            onClick={() => setActiveTab("management")}
          >
            <Users className="mr-2 h-4 w-4" />
            Manage Businesses
          </Button>
        )}
        <Button asChild>
          <Link to="/">
            <FilePlus className="mr-2 h-4 w-4" />
            Upload New Document
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DocumentsHeader;
