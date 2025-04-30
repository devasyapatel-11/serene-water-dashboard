
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
import { FileText, MoreHorizontal, Receipt, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Bill {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "paid" | "overdue" | "pending";
}

const billsData: Bill[] = [
  {
    id: "BILL-001",
    customerId: "CUST-001",
    customerName: "John Wilson",
    amount: 78.50,
    issueDate: "2025-04-01",
    dueDate: "2025-04-15",
    status: "paid"
  },
  {
    id: "BILL-002",
    customerId: "CUST-002",
    customerName: "Sarah Johnson",
    amount: 102.25,
    issueDate: "2025-04-01",
    dueDate: "2025-04-15",
    status: "pending"
  },
  {
    id: "BILL-003",
    customerId: "CUST-003",
    customerName: "Michael Brown",
    amount: 65.00,
    issueDate: "2025-03-01",
    dueDate: "2025-03-15",
    status: "overdue"
  },
  {
    id: "BILL-004",
    customerId: "CUST-004",
    customerName: "Emma Davis",
    amount: 95.75,
    issueDate: "2025-04-01",
    dueDate: "2025-04-15",
    status: "pending"
  },
  {
    id: "BILL-005",
    customerId: "CUST-005",
    customerName: "Robert Garcia",
    amount: 110.50,
    issueDate: "2025-04-01",
    dueDate: "2025-04-15",
    status: "paid"
  },
  {
    id: "BILL-006",
    customerId: "CUST-006",
    customerName: "Jennifer Lopez",
    amount: 87.25,
    issueDate: "2025-03-01",
    dueDate: "2025-03-15",
    status: "overdue"
  },
  {
    id: "BILL-007",
    customerId: "CUST-007",
    customerName: "William Taylor",
    amount: 92.00,
    issueDate: "2025-04-01",
    dueDate: "2025-04-15",
    status: "pending"
  }
];

export default function Billing() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const filteredBills = billsData.filter(bill => 
    bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.customerId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const statusColors = {
    paid: "bg-green-100 text-green-800 hover:bg-green-200",
    pending: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    overdue: "bg-red-100 text-red-800 hover:bg-red-200"
  };

  const handleAction = (action: string, id: string) => {
    toast({
      title: `Bill ${action}`,
      description: `Bill ${id} has been ${action.toLowerCase()}.`,
    });
  };

  // Calculate stats
  const totalBills = billsData.length;
  const pendingBills = billsData.filter(bill => bill.status === "pending").length;
  const overdueBills = billsData.filter(bill => bill.status === "overdue").length;
  const paidBills = billsData.filter(bill => bill.status === "paid").length;
  const totalRevenue = billsData.reduce((sum, bill) => sum + bill.amount, 0).toFixed(2);

  return (
    <div className="space-y-6 pb-8 pt-2 animate-fade-in">
      <h1 className="text-3xl font-bold">Billing Management</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Bills</CardDescription>
            <CardTitle className="text-4xl">{totalBills}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-4xl text-amber-600">{pendingBills}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Overdue</CardDescription>
            <CardTitle className="text-4xl text-red-600">{overdueBills}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Paid</CardDescription>
            <CardTitle className="text-4xl text-green-600">{paidBills}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl">${totalRevenue}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle>Billing Records</CardTitle>
            <CardDescription>Manage customer bills and payments</CardDescription>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bills..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="flex gap-2 items-center">
              <FileText className="h-4 w-4" />
              <span>Generate Bills</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.id}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{bill.customerName}</div>
                      <div className="text-muted-foreground">{bill.customerId}</div>
                    </div>
                  </TableCell>
                  <TableCell>${bill.amount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(bill.issueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[bill.status]}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
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
                        <DropdownMenuItem onClick={() => handleAction("Viewed", bill.id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Marked as Paid", bill.id)}>
                          Mark as Paid
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Receipt Generated", bill.id)}>
                          Generate Receipt
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
