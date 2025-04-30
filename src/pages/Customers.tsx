
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Search, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  locality: string;
  officerName: string;
  joinDate: string;
  status: "active" | "inactive" | "pending";
}

const customersData: Customer[] = [
  {
    id: "CUST-001",
    name: "John Wilson",
    email: "john.wilson@example.com",
    phone: "(555) 123-4567",
    locality: "Sector A",
    officerName: "Michael Johnson",
    joinDate: "2024-01-15",
    status: "active"
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 987-6543",
    locality: "Sector B",
    officerName: "Emily Davis",
    joinDate: "2024-02-20",
    status: "active"
  },
  {
    id: "CUST-003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "(555) 456-7890",
    locality: "Sector C",
    officerName: "Michael Johnson",
    joinDate: "2024-03-05",
    status: "inactive"
  },
  {
    id: "CUST-004",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "(555) 234-5678",
    locality: "Sector B",
    officerName: "Emily Davis",
    joinDate: "2024-03-12",
    status: "active"
  },
  {
    id: "CUST-005",
    name: "Robert Garcia",
    email: "robert.garcia@example.com",
    phone: "(555) 876-5432",
    locality: "Sector D",
    officerName: "James Wilson",
    joinDate: "2024-03-25",
    status: "pending"
  },
  {
    id: "CUST-006",
    name: "Jennifer Lopez",
    email: "jennifer.lopez@example.com",
    phone: "(555) 345-6789",
    locality: "Sector A",
    officerName: "Michael Johnson",
    joinDate: "2024-04-02",
    status: "active"
  },
  {
    id: "CUST-007",
    name: "William Taylor",
    email: "william.taylor@example.com",
    phone: "(555) 654-3210",
    locality: "Sector C",
    officerName: "James Wilson",
    joinDate: "2024-04-10",
    status: "active"
  }
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const filteredCustomers = customersData.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.locality.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const statusColors = {
    active: "bg-green-100 text-green-800 hover:bg-green-200",
    inactive: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    pending: "bg-amber-100 text-amber-800 hover:bg-amber-200"
  };

  const handleAction = (action: string, id: string) => {
    toast({
      title: `Customer ${action}`,
      description: `Customer ID ${id} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div className="space-y-6 pb-8 pt-2 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer Directory</h1>
        <Button className="flex gap-2 items-center">
          <UserPlus className="h-4 w-4" />
          <span>Add Customer</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle>Customer List</CardTitle>
            <CardDescription>Manage customers and their details</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Locality</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{customer.email}</div>
                      <div className="text-muted-foreground">{customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.locality}</TableCell>
                  <TableCell>{customer.officerName}</TableCell>
                  <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[customer.status]}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction("Viewed", customer.id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Edited", customer.id)}>
                          Edit Information
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Deactivated", customer.id)}>
                          Deactivate Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
