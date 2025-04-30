
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RequestsTable from "@/components/dashboard/RequestsTable";
import { Request } from "@/components/dashboard/RequestsTable";

const requestsData: Request[] = [
  {
    id: "REQ-001",
    customerId: "CUST-123",
    customerName: "John Wilson",
    requestType: "New Connection",
    status: "pending",
    date: "2025-04-25",
    locality: "Sector A"
  },
  {
    id: "REQ-002",
    customerId: "CUST-456",
    customerName: "Sarah Johnson",
    requestType: "Maintenance",
    status: "in-progress",
    date: "2025-04-24",
    locality: "Sector B"
  },
  {
    id: "REQ-003",
    customerId: "CUST-789",
    customerName: "Michael Brown",
    requestType: "Disconnection",
    status: "resolved",
    date: "2025-04-22",
    locality: "Sector C"
  },
  {
    id: "REQ-004",
    customerId: "CUST-101",
    customerName: "Emma Davis",
    requestType: "Water Quality Issue",
    status: "in-progress",
    date: "2025-04-21",
    locality: "Sector B"
  },
  {
    id: "REQ-005",
    customerId: "CUST-112",
    customerName: "Robert Garcia",
    requestType: "Billing Dispute",
    status: "pending",
    date: "2025-04-20",
    locality: "Sector D"
  },
  {
    id: "REQ-006",
    customerId: "CUST-134",
    customerName: "Jennifer Lopez",
    requestType: "Meter Replacement",
    status: "resolved",
    date: "2025-04-18",
    locality: "Sector A"
  },
  {
    id: "REQ-007",
    customerId: "CUST-178",
    customerName: "William Taylor",
    requestType: "Pipeline Issue",
    status: "closed",
    date: "2025-04-15",
    locality: "Sector C"
  },
  {
    id: "REQ-008",
    customerId: "CUST-201",
    customerName: "Olivia Martinez",
    requestType: "New Connection",
    status: "pending",
    date: "2025-04-23",
    locality: "Sector E"
  },
  {
    id: "REQ-009",
    customerId: "CUST-215",
    customerName: "James Anderson",
    requestType: "Water Pressure Issue",
    status: "in-progress",
    date: "2025-04-22",
    locality: "Sector D"
  },
  {
    id: "REQ-010",
    customerId: "CUST-230",
    customerName: "Sophia Thomas",
    requestType: "Billing Inquiry",
    status: "closed",
    date: "2025-04-18",
    locality: "Sector B"
  }
];

export default function SupplyRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  // Filter requests based on search term and active tab
  const filteredRequests = requestsData
    .filter(request => 
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.locality.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(request => 
      activeTab === "all" || 
      (activeTab === "pending" && request.status === "pending") ||
      (activeTab === "in-progress" && request.status === "in-progress") ||
      (activeTab === "resolved" && request.status === "resolved") ||
      (activeTab === "closed" && request.status === "closed")
    );

  // Calculate counts for each status
  const pendingCount = requestsData.filter(req => req.status === "pending").length;
  const inProgressCount = requestsData.filter(req => req.status === "in-progress").length;
  const resolvedCount = requestsData.filter(req => req.status === "resolved").length;
  const closedCount = requestsData.filter(req => req.status === "closed").length;

  return (
    <div className="space-y-6 pb-8 pt-2 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Supply Requests</h1>
        <Button className="flex gap-2 items-center">
          <Plus className="h-4 w-4" />
          <span>New Request</span>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-amber-700">{pendingCount}</CardTitle>
            <CardDescription className="text-amber-900">Pending Requests</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-blue-700">{inProgressCount}</CardTitle>
            <CardDescription className="text-blue-900">In Progress</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-green-700">{resolvedCount}</CardTitle>
            <CardDescription className="text-green-900">Resolved</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-gray-700">{closedCount}</CardTitle>
            <CardDescription className="text-gray-900">Closed</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Supply Requests</CardTitle>
          <CardDescription>Track and respond to customer supply requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" className="w-[400px]" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
                <TabsTrigger value="closed">Closed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <RequestsTable data={filteredRequests} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredRequests.length} of {requestsData.length} requests
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
