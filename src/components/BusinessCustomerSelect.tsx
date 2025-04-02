
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Plus, Building, User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Mock data - in a real app, this would come from an API
const businesses = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "Globex Industries" },
  { id: "3", name: "Stark Enterprises" },
  { id: "4", name: "Wayne Industries" },
  { id: "5", name: "Umbrella Corporation" },
];

interface CustomersByBusiness {
  [businessId: string]: { id: string; name: string }[];
}

const customersByBusiness: CustomersByBusiness = {
  "1": [
    { id: "101", name: "John Doe" },
    { id: "102", name: "Jane Smith" },
  ],
  "2": [
    { id: "201", name: "Alice Johnson" },
    { id: "202", name: "Bob Williams" },
  ],
  "3": [
    { id: "301", name: "Tony Stark" },
  ],
  "4": [
    { id: "401", name: "Bruce Wayne" },
  ],
  "5": [
    { id: "501", name: "Albert Wesker" },
    { id: "502", name: "Jill Valentine" },
  ],
};

// Define the business form schema
const businessFormSchema = z.object({
  name: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  address: z.string().optional(),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }).optional(),
  contactPhone: z.string().optional(),
});

// Define the customer form schema
const customerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional(),
  phone: z.string().optional(),
});

interface BusinessCustomerSelectProps {
  onSelect: (business: string, customer: string) => void;
  className?: string;
}

export function BusinessCustomerSelect({ onSelect, className }: BusinessCustomerSelectProps) {
  const [openBusiness, setOpenBusiness] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<{ id: string; name: string } | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<{ id: string; name: string } | null>(null);
  const [newBusinessName, setNewBusinessName] = useState("");
  const [newCustomerName, setNewCustomerName] = useState("");
  const [addingBusiness, setAddingBusiness] = useState(false);
  const [addingCustomer, setAddingCustomer] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  
  const { toast } = useToast();
  
  // Define business form
  const businessForm = useForm<z.infer<typeof businessFormSchema>>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      name: "",
      address: "",
      contactEmail: "",
      contactPhone: "",
    },
  });
  
  // Define customer form
  const customerForm = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  
  const handleBusinessSelect = (business: { id: string; name: string }) => {
    setSelectedBusiness(business);
    setSelectedCustomer(null);
    setOpenBusiness(false);
  };
  
  const handleCustomerSelect = (customer: { id: string; name: string }) => {
    setSelectedCustomer(customer);
    setOpenCustomer(false);
    
    if (selectedBusiness) {
      onSelect(selectedBusiness.name, customer.name);
    }
  };
  
  const handleAddBusiness = () => {
    if (newBusinessName.trim() !== "") {
      const newBusiness = {
        id: `new-${Date.now()}`,
        name: newBusinessName.trim()
      };
      handleBusinessSelect(newBusiness);
      setNewBusinessName("");
      setAddingBusiness(false);
      
      toast({
        title: "Business added",
        description: `Added "${newBusiness.name}" to your businesses`,
      });
    }
  };
  
  const handleAddCustomer = () => {
    if (newCustomerName.trim() !== "" && selectedBusiness) {
      const newCustomer = {
        id: `new-${Date.now()}`,
        name: newCustomerName.trim()
      };
      handleCustomerSelect(newCustomer);
      setNewCustomerName("");
      setAddingCustomer(false);
      
      toast({
        title: "Customer added",
        description: `Added "${newCustomer.name}" to "${selectedBusiness.name}"`,
      });
    }
  };
  
  const onSubmitBusinessForm = (data: z.infer<typeof businessFormSchema>) => {
    const newBusiness = {
      id: `new-${Date.now()}`,
      name: data.name
    };
    
    // In a real app, you would save this to a database
    console.log("Business form data:", data);
    
    handleBusinessSelect(newBusiness);
    setShowBusinessForm(false);
    businessForm.reset();
    
    toast({
      title: "Business added",
      description: `Added "${data.name}" to your businesses`,
    });
  };
  
  const onSubmitCustomerForm = (data: z.infer<typeof customerFormSchema>) => {
    if (!selectedBusiness) {
      toast({
        title: "Error",
        description: "Please select a business first",
        variant: "destructive"
      });
      return;
    }
    
    const newCustomer = {
      id: `new-${Date.now()}`,
      name: data.name
    };
    
    // In a real app, you would save this to a database
    console.log("Customer form data:", data);
    console.log("Associated with business:", selectedBusiness);
    
    handleCustomerSelect(newCustomer);
    setShowCustomerForm(false);
    customerForm.reset();
    
    toast({
      title: "Customer added",
      description: `Added "${data.name}" to "${selectedBusiness.name}"`,
    });
  };

  return (
    <div className={cn("flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4", className)}>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium">
            Business
          </label>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowBusinessForm(true)}
            className="h-6 px-2 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" />
            New Business
          </Button>
        </div>
        <Popover open={openBusiness} onOpenChange={setOpenBusiness}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openBusiness}
              className="w-full justify-between"
            >
              <div className="flex items-center gap-2 truncate">
                {selectedBusiness ? (
                  <>
                    <Building className="h-4 w-4 shrink-0 opacity-50" />
                    <span>{selectedBusiness.name}</span>
                  </>
                ) : (
                  <>
                    <Building className="h-4 w-4 shrink-0 opacity-50" />
                    <span>Select business</span>
                  </>
                )}
              </div>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search business..." />
              <CommandList>
                <CommandEmpty>
                  {addingBusiness ? (
                    <div className="p-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Input 
                          value={newBusinessName}
                          onChange={(e) => setNewBusinessName(e.target.value)}
                          placeholder="Enter business name"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={handleAddBusiness}
                        >
                          Add
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setAddingBusiness(false);
                            setNewBusinessName("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center">
                      <div className="text-sm text-muted-foreground mb-2">
                        No business found
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setAddingBusiness(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add business
                      </Button>
                    </div>
                  )}
                </CommandEmpty>
                <CommandGroup heading="Businesses">
                  {businesses.map((business) => (
                    <CommandItem
                      key={business.id}
                      value={business.name}
                      onSelect={() => handleBusinessSelect(business)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedBusiness?.id === business.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                      {business.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setAddingBusiness(true);
                      setNewBusinessName("");
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add new business
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium">
            Customer
          </label>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              if (!selectedBusiness) {
                toast({
                  title: "Select a business first",
                  description: "You need to select a business before adding a customer",
                });
                return;
              }
              setShowCustomerForm(true);
            }}
            className="h-6 px-2 text-xs"
            disabled={!selectedBusiness}
          >
            <Plus className="h-3 w-3 mr-1" />
            New Customer
          </Button>
        </div>
        <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCustomer}
              className={cn(
                "w-full justify-between",
                !selectedBusiness && "opacity-70 pointer-events-none"
              )}
              disabled={!selectedBusiness}
            >
              <div className="flex items-center gap-2 truncate">
                {selectedCustomer ? (
                  <>
                    <User className="h-4 w-4 shrink-0 opacity-50" />
                    <span>{selectedCustomer.name}</span>
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4 shrink-0 opacity-50" />
                    <span>{selectedBusiness ? "Select customer" : "Select a business first"}</span>
                  </>
                )}
              </div>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search customer..." />
              <CommandList>
                <CommandEmpty>
                  {addingCustomer ? (
                    <div className="p-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Input 
                          value={newCustomerName}
                          onChange={(e) => setNewCustomerName(e.target.value)}
                          placeholder="Enter customer name"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={handleAddCustomer}
                        >
                          Add
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => {
                            setAddingCustomer(false);
                            setNewCustomerName("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center">
                      <div className="text-sm text-muted-foreground mb-2">
                        No customer found
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setAddingCustomer(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add customer
                      </Button>
                    </div>
                  )}
                </CommandEmpty>
                {selectedBusiness && (
                  <>
                    <CommandGroup heading={`Customers (${selectedBusiness.name})`}>
                      {customersByBusiness[selectedBusiness.id]?.map((customer) => (
                        <CommandItem
                          key={customer.id}
                          value={customer.name}
                          onSelect={() => handleCustomerSelect(customer)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCustomer?.id === customer.id
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          {customer.name}
                        </CommandItem>
                      )) || (
                        <CommandItem disabled>
                          No customers found
                        </CommandItem>
                      )}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => {
                          setAddingCustomer(true);
                          setNewCustomerName("");
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add new customer
                      </CommandItem>
                    </CommandGroup>
                  </>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Business Add Form Dialog */}
      <Dialog open={showBusinessForm} onOpenChange={setShowBusinessForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Business</DialogTitle>
            <DialogDescription>
              Enter business details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...businessForm}>
            <form onSubmit={businessForm.handleSubmit(onSubmitBusinessForm)} className="space-y-4">
              <FormField
                control={businessForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter business name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={businessForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Business address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={businessForm.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={businessForm.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowBusinessForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Business
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Customer Add Form Dialog */}
      <Dialog open={showCustomerForm} onOpenChange={setShowCustomerForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              {selectedBusiness && `Adding customer for ${selectedBusiness.name}.`} Enter customer details below.
            </DialogDescription>
          </DialogHeader>
          <Form {...customerForm}>
            <form onSubmit={customerForm.handleSubmit(onSubmitCustomerForm)} className="space-y-4">
              <FormField
                control={customerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={customerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={customerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCustomerForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Customer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
