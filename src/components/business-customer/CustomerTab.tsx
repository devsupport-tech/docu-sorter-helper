
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { CustomerTable } from "./CustomerTable";
import { CustomerForm } from "./CustomerForm";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Business, Customer } from "./types";

interface CustomerTabProps {
  customers: Customer[];
  businesses: Business[];
  onCustomerChange: (updatedCustomers: Customer[]) => void;
}

export function CustomerTab({ customers, businesses, onCustomerChange }: CustomerTabProps) {
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState<{
    show: boolean;
    id: string;
    name: string;
  } | null>(null);

  const { toast } = useToast();

  const handleAddCustomer = () => {
    if (businesses.length === 0) {
      toast({
        title: "No businesses available",
        description: "Please add a business first before adding customers",
        variant: "destructive",
      });
      return;
    }
    setEditingCustomer(null);
    setShowCustomerDialog(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowCustomerDialog(true);
  };

  const handleSaveCustomer = (data: any) => {
    if (editingCustomer) {
      const updatedCustomers = customers.map(c => 
        c.id === editingCustomer.id ? {
          ...c,
          name: data.name,
          businessId: data.businessId,
          email: data.email,
          phone: data.phone
        } : c
      );
      onCustomerChange(updatedCustomers);
      toast({
        title: "Customer updated",
        description: `${data.name} has been updated`,
      });
    } else {
      const newCustomer: Customer = {
        id: `cust-${Date.now()}`,
        name: data.name,
        businessId: data.businessId,
        email: data.email,
        phone: data.phone
      };
      onCustomerChange([...customers, newCustomer]);
      toast({
        title: "Customer added",
        description: `${data.name} has been added`,
      });
    }
    setShowCustomerDialog(false);
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (id: string, name: string) => {
    setDeleteConfirmDialog({
      show: true,
      id,
      name
    });
  };

  const confirmDeleteCustomer = () => {
    if (!deleteConfirmDialog) return;
    
    onCustomerChange(customers.filter(c => c.id !== deleteConfirmDialog.id));
    toast({
      title: "Customer deleted",
      description: `Customer has been removed`,
    });
    setDeleteConfirmDialog(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button 
          onClick={handleAddCustomer}
          disabled={businesses.length === 0}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <ScrollArea className="h-[400px] w-full rounded-md border">
        <CustomerTable 
          customers={customers} 
          businesses={businesses}
          onEdit={handleEditCustomer} 
          onDelete={handleDeleteCustomer} 
        />
      </ScrollArea>

      <Dialog open={showCustomerDialog} onOpenChange={setShowCustomerDialog}>
        <DialogContent>
          <CustomerForm 
            onSave={handleSaveCustomer} 
            onCancel={() => {
              setShowCustomerDialog(false);
              setEditingCustomer(null);
            }}
            customer={editingCustomer || undefined}
            businesses={businesses}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={!!deleteConfirmDialog?.show}
        onOpenChange={(open) => !open && setDeleteConfirmDialog(null)}
        itemName={deleteConfirmDialog?.name || ""}
        onConfirm={confirmDeleteCustomer}
        onCancel={() => setDeleteConfirmDialog(null)}
      />
    </>
  );
}
