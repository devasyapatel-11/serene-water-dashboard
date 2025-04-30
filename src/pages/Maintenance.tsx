
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MoreHorizontal, 
  MapPin, 
  FileEdit, 
  Search, 
  AlertTriangle, 
  Wrench, 
  CheckCircle, 
  Clock, 
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceReport {
  id: string;
  title: string;
  description: string;
  reportedBy: string;
  locality: string;
  reportDate: string;
  status: "pending" | "in-progress" | "resolved";
  severity: "low" | "medium" | "high" | "critical";
  assignedTo: string;
}

const maintenanceData: MaintenanceReport[] = [
  {
    id: "MAINT-001",
    title: "Pipe Leakage",
    description: "Water pipe leaking on main street corner",
    reportedBy: "Officer Johnson",
    locality: "Sector A",
    reportDate: "2025-04-25",
    status: "pending",
    severity: "medium",
    assignedTo: "Maintenance Team A"
  },
  {
    id: "MAINT-002",
    title: "Broken Water Meter",
    description: "Customer's water meter damaged and needs replacement",
    reportedBy: "Sarah Johnson",
    locality: "Sector B",
    reportDate: "2025-04-24",
    status: "in-progress",
    severity: "low",
    assignedTo: "Maintenance Team B"
  },
  {
    id: "MAINT-003",
    title: "Main Pipeline Burst",
    description: "Major pipeline burst affecting multiple households",
    reportedBy: "Officer Davis",
    locality: "Sector C",
    reportDate: "2025-04-24",
    status: "in-progress",
    severity: "critical",
    assignedTo: "Emergency Response Team"
  },
  {
    id: "MAINT-004",
    title: "Water Quality Issue",
    description: "Multiple reports of discolored water from households",
    reportedBy: "Quality Control Team",
    locality: "Sector B",
    reportDate: "2025-04-23",
    status: "in-progress",
    severity: "high",
    assignedTo: "Water Quality Team"
  },
  {
    id: "MAINT-005",
    title: "Valve Replacement",
    description: "Scheduled valve replacement for improved water flow",
    reportedBy: "System Engineer",
    locality: "Sector D",
    reportDate: "2025-04-22",
    status: "pending",
    severity: "low",
    assignedTo: "Maintenance Team C"
  },
  {
    id: "MAINT-006",
    title: "Damaged Hydrant",
    description: "Fire hydrant damaged in traffic accident",
    reportedBy: "Fire Department",
    locality: "Sector A",
    reportDate: "2025-04-21",
    status: "resolved",
    severity: "high",
    assignedTo: "Maintenance Team A"
  },
  {
    id: "MAINT-007",
    title: "Reservoir Maintenance",
    description: "Scheduled cleaning and inspection of reservoir",
    reportedBy: "Operations Manager",
    locality: "Sector C",
    reportDate: "2025-04-20",
    status: "resolved",
    severity: "medium",
    assignedTo: "Reservoir Team"
  }
];

export default function Maintenance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  // Filter reports based on search term and active tab
  const filteredReports = maintenanceData
    .filter(report => 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(report => {
      if (activeTab === "all") return true;
      return report.status === activeTab;
    });
  
  const statusColors = {
    pending: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    "in-progress": "bg-blue-100 text-blue-800 hover:bg-blue-200",
    resolved: "bg-green-100 text-green-800 hover:bg-green-200"
  };

  const severityColors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800", 
    critical: "bg-red-100 text-red-800"
  };

  const handleAction = (action: string, id: string) => {
    toast({
      title: `Maintenance Report ${action}`,
      description: `Report ${id} has been ${action.toLowerCase()}.`,
    });
  };

  // Count reports by status and severity
  const pendingReports = maintenanceData.filter(report => report.status === "pending").length;
  const inProgressReports = maintenanceData.filter(report => report.status === "in-progress").length;
  const resolvedReports = maintenanceData.filter(report => report.status === "resolved").length;
  const criticalReports = maintenanceData.filter(report => report.severity === "critical").length;
  const highPriorityReports = maintenanceData.filter(report => report.severity === "high").length;

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'in-progress': return <Wrench className="h-4 w-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 pb-8 pt-2 animate-fade-in">
      <div className="bg-blue-500 -mx-8 px-8 py-6 mb-6 text-white">
        <h1 className="text-3xl font-bold">Maintenance Reports</h1>
        <p className="mt-2 opacity-90">Manage and track water system maintenance issues</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="lg:col-span-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Maintenance Overview</h2>
                <p className="text-blue-100">Track and resolve maintenance issues across the water system network</p>
              </div>
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <Badge className="bg-white text-blue-600 hover:bg-blue-50">Total: {maintenanceData.length}</Badge>
                <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-300">Pending: {pendingReports}</Badge>
                <Badge className="bg-blue-300 text-blue-900 hover:bg-blue-200">In Progress: {inProgressReports}</Badge>
                <Badge className="bg-green-400 text-green-900 hover:bg-green-300">Resolved: {resolvedReports}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      
        <Card className="bg-white shadow-md border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-500">{pendingReports}</CardTitle>
              <CardDescription>Pending Issues</CardDescription>
            </div>
            <div className="rounded-full bg-amber-100 p-3">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
        </Card>
        
        <Card className="bg-white shadow-md border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-500">{inProgressReports}</CardTitle>
              <CardDescription>In Progress</CardDescription>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Wrench className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
        </Card>
        
        <Card className="bg-white shadow-md border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-500">{resolvedReports}</CardTitle>
              <CardDescription>Resolved Issues</CardDescription>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
        </Card>
        
        <Card className="bg-white shadow-md border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-500">{criticalReports}</CardTitle>
              <CardDescription>Critical Issues</CardDescription>
            </div>
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
        </Card>
        
        <Card className="bg-white shadow-md border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-500">{highPriorityReports}</CardTitle>
              <CardDescription>High Priority</CardDescription>
            </div>
            <div className="rounded-full bg-orange-100 p-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
        </Card>
      </div>
      
      <Card className="shadow-md border-blue-100">
        <CardHeader className="bg-blue-50 flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle className="text-blue-700">Maintenance Tickets</CardTitle>
            <CardDescription>Track and manage maintenance activities</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8 border-blue-200 focus-visible:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="border-blue-200">
              <Filter className="h-4 w-4 text-blue-600" />
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">New Report</Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="px-6 pt-4 border-b border-blue-100">
              <TabsList className="bg-blue-50 p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
                  All Reports
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
                  Pending
                </TabsTrigger>
                <TabsTrigger value="in-progress" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
                  In Progress
                </TabsTrigger>
                <TabsTrigger value="resolved" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
                  Resolved
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-blue-50">
                    <TableRow className="hover:bg-blue-50/80">
                      <TableHead>ID</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Date Reported</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-blue-50/30">
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{report.title}</div>
                              <div className="text-muted-foreground line-clamp-1">{report.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-blue-500" />
                              <span>{report.locality}</span>
                            </div>
                          </TableCell>
                          <TableCell>{report.assignedTo}</TableCell>
                          <TableCell>{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={severityColors[report.severity]}>
                              {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(report.status)}
                              <Badge variant="outline" className={statusColors[report.status]}>
                                {report.status === "in-progress" ? "In Progress" : report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white border-blue-100">
                                <DropdownMenuItem onClick={() => handleAction("Viewed", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction("Updated", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  Update Status
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction("Reassigned", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  Reassign Team
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                          No reports found matching your search criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="m-0">
              {/* Content is filtered by tab state in the JSX above */}
              <div className="rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-blue-50">
                    <TableRow className="hover:bg-blue-50/80">
                      <TableHead>ID</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Date Reported</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-blue-50/30">
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{report.title}</div>
                              <div className="text-muted-foreground line-clamp-1">{report.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-blue-500" />
                              <span>{report.locality}</span>
                            </div>
                          </TableCell>
                          <TableCell>{report.assignedTo}</TableCell>
                          <TableCell>{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={severityColors[report.severity]}>
                              {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(report.status)}
                              <Badge variant="outline" className={statusColors[report.status]}>
                                {report.status === "in-progress" ? "In Progress" : report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white border-blue-100">
                                <DropdownMenuItem onClick={() => handleAction("Viewed", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction("Updated", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  Update Status
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction("Reassigned", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  Reassign Team
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                          No pending reports found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="in-progress" className="m-0">
              {/* Content is filtered by tab state in the JSX above */}
              <div className="rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-blue-50">
                    <TableRow className="hover:bg-blue-50/80">
                      <TableHead>ID</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Date Reported</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-blue-50/30">
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{report.title}</div>
                              <div className="text-muted-foreground line-clamp-1">{report.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-blue-500" />
                              <span>{report.locality}</span>
                            </div>
                          </TableCell>
                          <TableCell>{report.assignedTo}</TableCell>
                          <TableCell>{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={severityColors[report.severity]}>
                              {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(report.status)}
                              <Badge variant="outline" className={statusColors[report.status]}>
                                {report.status === "in-progress" ? "In Progress" : report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white border-blue-100">
                                <DropdownMenuItem onClick={() => handleAction("Viewed", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction("Updated", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  Update Status
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction("Reassigned", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  Reassign Team
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                          No in-progress reports found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="resolved" className="m-0">
              {/* Content is filtered by tab state in the JSX above */}
              <div className="rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-blue-50">
                    <TableRow className="hover:bg-blue-50/80">
                      <TableHead>ID</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Date Reported</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-blue-50/30">
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{report.title}</div>
                              <div className="text-muted-foreground line-clamp-1">{report.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-blue-500" />
                              <span>{report.locality}</span>
                            </div>
                          </TableCell>
                          <TableCell>{report.assignedTo}</TableCell>
                          <TableCell>{new Date(report.reportDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={severityColors[report.severity]}>
                              {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(report.status)}
                              <Badge variant="outline" className={statusColors[report.status]}>
                                {report.status === "in-progress" ? "In Progress" : report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-blue-50">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white border-blue-100">
                                <DropdownMenuItem onClick={() => handleAction("Viewed", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction("Reopened", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  Reopen Issue
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction("Archived", report.id)} className="hover:bg-blue-50 hover:text-blue-700 cursor-pointer">
                                  Archive
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                          No resolved reports found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
