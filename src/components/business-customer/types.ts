
export interface Business {
  id: string;
  name: string;
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface Customer {
  id: string;
  businessId: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface BusinessCustomerManagerProps {
  initialBusinesses?: Business[];
  initialCustomers?: Customer[];
  onDataChange?: (businesses: Business[], customers: Customer[]) => void;
}
