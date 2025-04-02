
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { BusinessTable } from "./BusinessTable";
import { BusinessForm } from "./BusinessForm";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Business, Customer } from "./types";

interface BusinessTabProps {
  businesses: Business[];
  customers: Customer[];
  onBusinessChange: (updatedBusinesses: Business[]) => void;
}

export function BusinessTab({ businesses, customers, onBusinessChange }: BusinessTabProps) {
  const [showBusinessDialog, setShowBusinessDialog] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState<{
    show: boolean;
    id: string;
    name: string;
  } | null>(null);

  const { toast } = useToast();

  const handleAddBusiness = () => {
    setEditingBusiness(null);
    setShowBusinessDialog(true);
  };

  const handleEditBusiness = (business: Business) => {
    setEditingBusiness(business);
    setShowBusinessDialog(true);
  };

  const handleSaveBusiness = (data: any) => {
    if (editingBusiness) {
      const updatedBusinesses = businesses.map(b => 
        b.id === editingBusiness.id ? { 
          ...b,
          name: data.name,
          address: data.address,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone
        } : b
      );
      onBusinessChange(updatedBusinesses);
      toast({
        title: "Business updated",
        description: `${data.name} has been updated`,
      });
    } else {
      const newBusiness: Business = {
        id: `bus-${Date.now()}`,
        name: data.name,
        address: data.address,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone
      };
      onBusinessChange([...businesses, newBusiness]);
      toast({
        title: "Business added",
        description: `${data.name} has been added`,
      });
    }
    setShowBusinessDialog(false);
    setEditingBusiness(null);
  };

  const handleDeleteBusiness = (id: string, name: string) => {
    setDeleteConfirmDialog({
      show: true,
      id,
      name
    });
  };

  const confirmDeleteBusiness = () => {
    if (!deleteConfirmDialog) return;
    
    const id = deleteConfirmDialog.id;
    const associatedCustomers = customers.filter(c => c.businessId === id);
    
    if (associatedCustomers.length > 0) {
      toast({
        title: "Cannot delete business",
        description: `This business has ${associatedCustomers.length} customer(s) associated. Remove them first.`,
        variant: "destructive",
      });
      setDeleteConfirmDialog(null);
      return;
    }
    
    onBusinessChange(businesses.filter(b => b.id !== id));
    toast({
      title: "Business deleted",
      description: `Business has been removed`,
    });
    setDeleteConfirmDialog(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button onClick={handleAddBusiness}>
          <Plus className="h-4 w-4 mr-2" />
          Add Business
        </Button>
      </div>

      <ScrollArea className="h-[400px] w-full rounded-md border">
        <BusinessTable 
          businesses={businesses} 
          onEdit={handleEditBusiness} 
          onDelete={handleDeleteBusiness} 
        />
      </ScrollArea>

      <Dialog open={showBusinessDialog} onOpenChange={setShowBusinessDialog}>
        <DialogContent>
          <BusinessForm 
            onSave={handleSaveBusiness} 
            onCancel={() => {
              setShowBusinessDialog(false);
              setEditingBusiness(null);
            }}
            business={editingBusiness || undefined}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={!!deleteConfirmDialog?.show}
        onOpenChange={(open) => !open && setDeleteConfirmDialog(null)}
        itemName={deleteConfirmDialog?.name || ""}
        onConfirm={confirmDeleteBusiness}
        onCancel={() => setDeleteConfirmDialog(null)}
      />
    </>
  );
}
