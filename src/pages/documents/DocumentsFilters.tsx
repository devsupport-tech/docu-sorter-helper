
import { Search, Folder, Clock, Check, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocumentsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  businessFilter: string;
  setBusinessFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  businesses: string[];
}

const DocumentsFilters = ({
  searchQuery,
  setSearchQuery,
  businessFilter,
  setBusinessFilter,
  statusFilter,
  setStatusFilter,
  businesses,
}: DocumentsFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search documents..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Select value={businessFilter} onValueChange={setBusinessFilter}>
          <SelectTrigger className="w-[180px]">
            <Folder className="mr-2 h-4 w-4" />
            <SelectValue placeholder="All Businesses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Businesses</SelectItem>
            {businesses.map((business) => (
              <SelectItem key={business} value={business}>
                {business}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="processed">
              <div className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                Processed
              </div>
            </SelectItem>
            <SelectItem value="pending">
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                Pending
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DocumentsFilters;
