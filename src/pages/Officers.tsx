
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/dashboard/DataTable";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Officer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "on-leave" | "inactive";
  localities: string[];
}

const Officers = () => {
  const { toast } = useToast();
  const [officers, setOfficers] = useState<Officer[]>([
    {
      id: "OFF-001",
      name: "John Wilson",
      email: "john.wilson@water.demo",
      phone: "+1 (555) 123-4567",
      role: "Senior Field Officer",
      status: "active",
      localities: ["Sector A", "Sector B"]
    },
    {
      id: "OFF-002",
      name: "Sarah Johnson",
      email: "sarah.johnson@water.demo",
      phone: "+1 (555) 987-6543",
      role: "Field Officer",
      status: "active",
      localities: ["Sector C"]
    },
    {
      id: "OFF-003",
      name: "Michael Brown",
      email: "michael.brown@water.demo",
      phone: "+1 (555) 456-7890",
      role: "Maintenance Supervisor",
      status: "on-leave",
      localities: ["Sector D", "Sector E"]
    },
    {
      id: "OFF-004",
      name: "Emma Davis",
      email: "emma.davis@water.demo",
      phone: "+1 (555) 234-5678",
      role: "Field Officer",
      status: "active",
      localities: ["Sector F"]
    },
    {
      id: "OFF-005",
      name: "Robert Garcia",
      email: "robert.garcia@water.demo",
      phone: "+1 (555) 876-5432",
      role: "Senior Field Officer",
      status: "inactive",
      localities: ["Sector G"]
    }
  ]);

  const statusColors = {
    active: "bg-green-100 text-green-800 hover:bg-green-200",
    "on-leave": "bg-amber-100 text-amber-800 hover:bg-amber-200",
    inactive: "bg-gray-100 text-gray-800 hover:bg-gray-200"
  };

  const handleAddOfficer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const newOfficer: Officer = {
      id: `OFF-00${officers.length + 1}`,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      role: formData.get('role') as string,
      status: "active",
      localities: [(formData.get('locality') as string) || "Unassigned"]
    };
    
    setOfficers([...officers, newOfficer]);
    
    toast({
      title: "Officer Added",
      description: `${newOfficer.name} has been added successfully.`
    });
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
          {row.getValue("phone")}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "localities",
      header: "Localities",
      cell: ({ row }) => {
        const localities = row.getValue("localities") as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {localities.map((locality) => (
              <Badge key={locality} variant="outline" className="bg-water-50 text-water-800 hover:bg-water-100 border-water-200">
                {locality}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as keyof typeof statusColors;
        return (
          <Badge variant="outline" className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const officer = row.original;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toast({ title: "View Details", description: `Viewing ${officer.name}'s details` })}>
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Edit Officer", description: `Editing ${officer.name}'s profile` })}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Change Status", description: `Changing ${officer.name}'s status` })}>
                  Change Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 pb-8 pt-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Officer Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Officer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleAddOfficer}>
              <DialogHeader>
                <DialogTitle>Add New Officer</DialogTitle>
                <DialogDescription>
                  Add a new officer to the system. They will be assigned to manage water resources.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" name="phone" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select name="role" defaultValue="Field Officer">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Field Officer">Field Officer</SelectItem>
                      <SelectItem value="Senior Field Officer">Senior Field Officer</SelectItem>
                      <SelectItem value="Maintenance Supervisor">Maintenance Supervisor</SelectItem>
                      <SelectItem value="Technical Support">Technical Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="locality" className="text-right">
                    Locality
                  </Label>
                  <Select name="locality">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Assign to locality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sector A">Sector A</SelectItem>
                      <SelectItem value="Sector B">Sector B</SelectItem>
                      <SelectItem value="Sector C">Sector C</SelectItem>
                      <SelectItem value="Sector D">Sector D</SelectItem>
                      <SelectItem value="Sector E">Sector E</SelectItem>
                      <SelectItem value="Sector F">Sector F</SelectItem>
                      <SelectItem value="Sector G">Sector G</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Officer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Officers Directory</CardTitle>
            <CardDescription>
              Manage all officers and their assigned localities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={officers} 
              searchKey="name" 
              searchPlaceholder="Search officers..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Officers;
