
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
import { Gauge, History, LineChart, MoreHorizontal, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WaterMeter {
  id: string;
  customerId: string;
  customerName: string;
  serialNumber: string;
  installDate: string;
  lastReading: number;
  lastReadingDate: string;
  status: "active" | "inactive" | "maintenance";
  locality: string;
}

const waterMetersData: WaterMeter[] = [
  {
    id: "METER-001",
    customerId: "CUST-001",
    customerName: "John Wilson",
    serialNumber: "WM5872463",
    installDate: "2023-08-15",
    lastReading: 1284,
    lastReadingDate: "2025-04-01",
    status: "active",
    locality: "Sector A"
  },
  {
    id: "METER-002",
    customerId: "CUST-002",
    customerName: "Sarah Johnson",
    serialNumber: "WM6723914",
    installDate: "2023-09-20",
    lastReading: 956,
    lastReadingDate: "2025-04-01",
    status: "active",
    locality: "Sector B"
  },
  {
    id: "METER-003",
    customerId: "CUST-003",
    customerName: "Michael Brown",
    serialNumber: "WM7891234",
    installDate: "2023-07-05",
    lastReading: 2105,
    lastReadingDate: "2025-04-01",
    status: "maintenance",
    locality: "Sector C"
  },
  {
    id: "METER-004",
    customerId: "CUST-004",
    customerName: "Emma Davis",
    serialNumber: "WM4567823",
    installDate: "2023-11-12",
    lastReading: 684,
    lastReadingDate: "2025-04-01",
    status: "active",
    locality: "Sector B"
  },
  {
    id: "METER-005",
    customerId: "CUST-005",
    customerName: "Robert Garcia",
    serialNumber: "WM3459872",
    installDate: "2024-01-25",
    lastReading: 325,
    lastReadingDate: "2025-04-01",
    status: "inactive",
    locality: "Sector D"
  },
  {
    id: "METER-006",
    customerId: "CUST-006",
    customerName: "Jennifer Lopez",
    serialNumber: "WM9081276",
    installDate: "2023-10-02",
    lastReading: 1452,
    lastReadingDate: "2025-04-01",
    status: "active",
    locality: "Sector A"
  }
];

// Sample usage data for the selected meter
const usageData = [
  { month: 'Nov', usage: 85 },
  { month: 'Dec', usage: 92 },
  { month: 'Jan', usage: 97 },
  { month: 'Feb', usage: 102 },
  { month: 'Mar', usage: 110 },
  { month: 'Apr', usage: 105 },
];

export default function WaterMeters() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMeter, setSelectedMeter] = useState<WaterMeter | null>(null);
  const { toast } = useToast();
  
  const filteredMeters = waterMetersData.filter(meter => 
    meter.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meter.locality.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const statusColors = {
    active: "bg-green-100 text-green-800 hover:bg-green-200",
    inactive: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    maintenance: "bg-amber-100 text-amber-800 hover:bg-amber-200"
  };

  const handleAction = (action: string, meter: WaterMeter) => {
    setSelectedMeter(meter);
    toast({
      title: `Meter ${action}`,
      description: `Meter ${meter.id} has been ${action.toLowerCase()}.`,
    });
  };

  // Calculate stats
  const totalMeters = waterMetersData.length;
  const activeMeters = waterMetersData.filter(meter => meter.status === "active").length;
  const totalConsumption = waterMetersData.reduce((sum, meter) => sum + meter.lastReading, 0);
  const avgConsumption = Math.round(totalConsumption / activeMeters);

  return (
    <div className="space-y-6 pb-8 pt-2 animate-fade-in">
      <h1 className="text-3xl font-bold">Water Meter Monitoring</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle>Total Meters</CardTitle>
              <CardDescription>{totalMeters}</CardDescription>
            </div>
            <Gauge className="h-6 w-6 text-blue-600" />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle>Active Meters</CardTitle>
              <CardDescription>{activeMeters}</CardDescription>
            </div>
            <Gauge className="h-6 w-6 text-green-600" />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle>Total Consumption</CardTitle>
              <CardDescription>{totalConsumption} kL</CardDescription>
            </div>
            <LineChart className="h-6 w-6 text-blue-600" />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle>Avg. Consumption</CardTitle>
              <CardDescription>{avgConsumption} kL</CardDescription>
            </div>
            <LineChart className="h-6 w-6 text-amber-600" />
          </CardHeader>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <div>
              <CardTitle>Water Meters</CardTitle>
              <CardDescription>Monitor water meters and readings</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search meters..."
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
                  <TableHead>Meter ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Last Reading</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMeters.map((meter) => (
                  <TableRow key={meter.id}>
                    <TableCell className="font-medium">{meter.id}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{meter.customerName}</div>
                        <div className="text-muted-foreground">{meter.locality}</div>
                      </div>
                    </TableCell>
                    <TableCell>{meter.serialNumber}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{meter.lastReading} kL</div>
                        <div className="text-muted-foreground">{new Date(meter.lastReadingDate).toLocaleDateString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[meter.status]}>
                        {meter.status.charAt(0).toUpperCase() + meter.status.slice(1)}
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
                          <DropdownMenuItem onClick={() => handleAction("Selected", meter)}>
                            View Usage
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("Updated", meter)}>
                            Update Reading
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction("Flagged for Maintenance", meter)}>
                            Flag for Maintenance
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
        
        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
            <CardDescription>
              {selectedMeter ? 
                `${selectedMeter.customerName}'s consumption` : 
                "Select a meter to see detailed usage"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {selectedMeter ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={usageData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="usage" 
                      stroke="#0ea5e9" 
                      fillOpacity={1} 
                      fill="url(#colorUsage)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <History className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Select a meter to view usage history</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
