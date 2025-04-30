
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
import { MoreHorizontal, MapPin, FileEdit, Search, AlertTriangle } from "lucide-react";
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
  const { toast } = useToast();
  
  const filteredReports = maintenanceData.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
  const criticalReports = maintenanceData.filter(report => report.severity === "critical").length;
  const highPriorityReports = maintenanceData.filter(report => report.severity === "high").length;

  return (
    <div className="space-y-6 pb-8 pt-2 animate-fade-in">
      <h1 className="text-3xl font-bold">Maintenance Reports</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-2xl text-amber-700">{pendingReports}</CardTitle>
              <CardDescription className="text-amber-900">Pending Reports</CardDescription>
            </div>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </CardHeader>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-2xl text-blue-700">{inProgressReports}</CardTitle>
              <CardDescription className="text-blue-900">In Progress</CardDescription>
            </div>
            <FileEdit className="h-5 w-5 text-blue-500" />
          </CardHeader>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-2xl text-red-700">{criticalReports}</CardTitle>
              <CardDescription className="text-red-900">Critical Issues</CardDescription>
            </div>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </CardHeader>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-2xl text-orange-700">{highPriorityReports}</CardTitle>
              <CardDescription className="text-orange-900">High Priority</CardDescription>
            </div>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </CardHeader>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle>Maintenance Reports</CardTitle>
            <CardDescription>Track and manage maintenance activities</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
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
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.id}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{report.title}</div>
                      <div className="text-muted-foreground line-clamp-1">{report.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
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
                    <Badge variant="outline" className={statusColors[report.status]}>
                      {report.status === "in-progress" ? "In Progress" : report.status.charAt(0).toUpperCase() + report.status.slice(1)}
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
                        <DropdownMenuItem onClick={() => handleAction("Viewed", report.id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Updated", report.id)}>
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("Reassigned", report.id)}>
                          Reassign Team
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
