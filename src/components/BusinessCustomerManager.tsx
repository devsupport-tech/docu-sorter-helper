
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Business, 
  Customer, 
  BusinessTab, 
  CustomerTab 
} from "./business-customer";

interface BusinessCustomerManagerProps {
  initialBusinesses?: Business[];
  initialCustomers?: Customer[];
  onDataChange?: (businesses: Business[], customers: Customer[]) => void;
}

export function BusinessCustomerManager({
  initialBusinesses = [],
  initialCustomers = [],
  onDataChange,
}: BusinessCustomerManagerProps) {
  const [activeTab, setActiveTab] = useState<"businesses" | "customers">("businesses");
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  
  const { toast } = useToast();

  // Load data from localStorage if no initial data provided
  useEffect(() => {
    if (initialBusinesses.length === 0) {
      try {
        const storedBusinesses = localStorage.getItem('businesses');
        if (storedBusinesses) {
          setBusinesses(JSON.parse(storedBusinesses));
        }
      } catch (e) {
        console.error("Failed to load businesses from localStorage", e);
      }
    }

    if (initialCustomers.length === 0) {
      try {
        const storedCustomers = localStorage.getItem('customers');
        if (storedCustomers) {
          setCustomers(JSON.parse(storedCustomers));
        }
      } catch (e) {
        console.error("Failed to load customers from localStorage", e);
      }
    }
  }, [initialBusinesses, initialCustomers]);

  // Save data to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('businesses', JSON.stringify(businesses));
      localStorage.setItem('customers', JSON.stringify(customers));
      
      if (onDataChange) {
        onDataChange(businesses, customers);
      }
    } catch (e) {
      console.error("Failed to save data to localStorage", e);
    }
  }, [businesses, customers, onDataChange]);

  const handleBusinessChange = (updatedBusinesses: Business[]) => {
    setBusinesses(updatedBusinesses);
  };

  const handleCustomerChange = (updatedCustomers: Customer[]) => {
    setCustomers(updatedCustomers);
  };

  return (
    <div className="w-full">
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "businesses" | "customers")}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="businesses" className="mt-4">
          <BusinessTab 
            businesses={businesses} 
            customers={customers}
            onBusinessChange={handleBusinessChange} 
          />
        </TabsContent>
        
        <TabsContent value="customers" className="mt-4">
          <CustomerTab 
            customers={customers} 
            businesses={businesses} 
            onCustomerChange={handleCustomerChange} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
