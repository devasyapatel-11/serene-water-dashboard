
import { Users, Database, Gauge, Inbox } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import WaterLevelChart from "@/components/dashboard/WaterLevelChart";
import WaterUsageChart from "@/components/dashboard/WaterUsageChart";
import StatusCard from "@/components/dashboard/StatusCard";
import RequestsTable from "@/components/dashboard/RequestsTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WaterVisualization from "@/components/3d/WaterVisualization";

const Index = () => {
  // Sample data for charts and metrics
  const waterLevelData = [
    { name: "Jan", value: 85 },
    { name: "Feb", value: 78 },
    { name: "Mar", value: 72 },
    { name: "Apr", value: 65 },
    { name: "May", value: 60 },
    { name: "Jun", value: 55 },
    { name: "Jul", value: 50 },
    { name: "Aug", value: 45 },
    { name: "Sep", value: 42 },
    { name: "Oct", value: 55 },
    { name: "Nov", value: 70 },
    { name: "Dec", value: 80 }
  ];
  
  const waterUsageData = [
    { name: "Sector A", usage: 4500 },
    { name: "Sector B", usage: 3800 },
    { name: "Sector C", usage: 5200 },
    { name: "Sector D", usage: 2700 },
    { name: "Sector E", usage: 4100 },
    { name: "Sector F", usage: 3300 }
  ];

  const reservoirData = [
    { name: "Main", value: 65, color: "#4dabf5" },
    { name: "Sector A", value: 85, color: "#33c3f0" },
    { name: "Sector B", value: 45, color: "#f87171" },
    { name: "Sector C", value: 72, color: "#60a5fa" }
  ];

  const recentRequests = [
    {
      id: "REQ-001",
      customerId: "CUST-123",
      customerName: "John Wilson",
      requestType: "New Connection",
      status: "pending" as const,
      date: "2025-04-25",
      locality: "Sector A"
    },
    {
      id: "REQ-002",
      customerId: "CUST-456",
      customerName: "Sarah Johnson",
      requestType: "Maintenance",
      status: "in-progress" as const,
      date: "2025-04-24",
      locality: "Sector B"
    },
    {
      id: "REQ-003",
      customerId: "CUST-789",
      customerName: "Michael Brown",
      requestType: "Disconnection",
      status: "resolved" as const,
      date: "2025-04-22",
      locality: "Sector C"
    },
    {
      id: "REQ-004",
      customerId: "CUST-101",
      customerName: "Emma Davis",
      requestType: "Water Quality Issue",
      status: "in-progress" as const,
      date: "2025-04-21",
      locality: "Sector B"
    },
    {
      id: "REQ-005",
      customerId: "CUST-112",
      customerName: "Robert Garcia",
      requestType: "Billing Dispute",
      status: "pending" as const,
      date: "2025-04-20",
      locality: "Sector D"
    }
  ];

  return (
    <div className="space-y-6 pb-8 pt-2 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Customers" 
          value="4,289" 
          icon={Users} 
          trend={{ value: 12, isPositive: true }} 
        />
        <MetricCard 
          title="Reservoirs" 
          value="8" 
          icon={Database}
        />
        <MetricCard 
          title="Water Meters" 
          value="4,156" 
          icon={Gauge} 
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard 
          title="Pending Requests" 
          value="42" 
          icon={Inbox} 
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Reservoir Levels</CardTitle>
            <CardDescription>Average water level across all reservoirs</CardDescription>
          </CardHeader>
          <CardContent>
            <WaterLevelChart 
              title="" 
              data={waterLevelData} 
            />
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <StatusCard 
            title="Main Reservoir" 
            value={65} 
            max={100} 
            label="%" 
            type="warning"
          />
          <StatusCard 
            title="Sector A Supply" 
            value={85} 
            max={100} 
            label="%" 
            type="success"
          />
          <StatusCard 
            title="Sector B Supply" 
            value={45} 
            max={100} 
            label="%" 
            type="danger"
          />
          <StatusCard 
            title="Sector C Supply" 
            value={72} 
            max={100} 
            label="%" 
            type="info"
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Supply Requests</CardTitle>
            <CardDescription>Latest customer requests and status</CardDescription>
          </CardHeader>
          <CardContent>
            <RequestsTable data={recentRequests} />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Water Usage by Sector</CardTitle>
            <CardDescription>Monthly usage in kiloliters</CardDescription>
          </CardHeader>
          <CardContent>
            <WaterUsageChart
              title=""
              data={waterUsageData}
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Real-time Reservoir Levels</CardTitle>
          <CardDescription>3D visualization of current water levels</CardDescription>
        </CardHeader>
        <CardContent>
          <WaterVisualization data={reservoirData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
