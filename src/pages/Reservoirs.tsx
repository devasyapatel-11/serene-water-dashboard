
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WaterLevelChart from "@/components/dashboard/WaterLevelChart";
import { Bell, AlertTriangle, Droplet, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import UpdateWaterLevelForm from "@/components/reservoirs/UpdateWaterLevelForm";
import GenerateBillsForm from "@/components/billing/GenerateBillsForm";

interface Reservoir {
  id: string;
  name: string;
  capacity: number;
  currentLevel: number;
  sectors: string[];
  status: 'operational' | 'maintenance' | 'critical';
  lastUpdated: string;
  history: {
    name: string;
    value: number;
  }[];
}

const Reservoirs = () => {
  const { toast } = useToast();
  const [reservoirs, setReservoirs] = useState<Reservoir[]>([
    {
      id: "RES-001",
      name: "North Ridge Reservoir",
      capacity: 5000,
      currentLevel: 3250,
      sectors: ["Sector A", "Sector B"],
      status: 'operational',
      lastUpdated: "2025-04-30 08:15:22",
      history: [
        { name: "Week 1", value: 80 },
        { name: "Week 2", value: 75 },
        { name: "Week 3", value: 70 },
        { name: "Week 4", value: 65 }
      ]
    },
    {
      id: "RES-002",
      name: "East Valley Reservoir",
      capacity: 3500,
      currentLevel: 1500,
      sectors: ["Sector C", "Sector D"],
      status: 'critical',
      lastUpdated: "2025-04-30 08:10:15",
      history: [
        { name: "Week 1", value: 60 },
        { name: "Week 2", value: 55 },
        { name: "Week 3", value: 48 },
        { name: "Week 4", value: 42 }
      ]
    },
    {
      id: "RES-003",
      name: "South Lake Storage",
      capacity: 4200,
      currentLevel: 3600,
      sectors: ["Sector E"],
      status: 'operational',
      lastUpdated: "2025-04-30 08:05:47",
      history: [
        { name: "Week 1", value: 88 },
        { name: "Week 2", value: 86 },
        { name: "Week 3", value: 85 },
        { name: "Week 4", value: 85 }
      ]
    },
    {
      id: "RES-004",
      name: "West Basin",
      capacity: 2800,
      currentLevel: 1900,
      sectors: ["Sector F", "Sector G"],
      status: 'maintenance',
      lastUpdated: "2025-04-30 07:55:32",
      history: [
        { name: "Week 1", value: 68 },
        { name: "Week 2", value: 67 },
        { name: "Week 3", value: 66 },
        { name: "Week 4", value: 67 }
      ]
    }
  ]);
  
  // Dialog state for water level update
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedReservoir, setSelectedReservoir] = useState<Reservoir | null>(null);
  
  // Dialog state for generating bills
  const [generateBillsDialogOpen, setGenerateBillsDialogOpen] = useState(false);

  const handleAlertClick = (reservoirName: string) => {
    toast({
      title: "Alert Settings Updated",
      description: `Alert threshold updated for ${reservoirName}.`
    });
  };

  // Handle updating reservoir water level
  const handleUpdateLevel = (id: string, newLevel: number) => {
    setReservoirs(prev => prev.map(reservoir => 
      reservoir.id === id ? {
        ...reservoir,
        currentLevel: newLevel,
        lastUpdated: new Date().toLocaleString(),
        // Add a new history point
        history: [
          ...reservoir.history,
          { name: `Week ${reservoir.history.length + 1}`, value: Math.round((newLevel / reservoir.capacity) * 100) }
        ].slice(-4) // Keep only the last 4 weeks
      } : reservoir
    ));
  };

  const openUpdateDialog = (reservoir: Reservoir) => {
    setSelectedReservoir(reservoir);
    setUpdateDialogOpen(true);
  };

  const getStatusBadge = (status: 'operational' | 'maintenance' | 'critical') => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Operational</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Maintenance</Badge>;
      case 'critical':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center">
            <AlertTriangle className="w-3 h-3 mr-1" /> Critical
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6 pb-8 pt-2 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reservoir Management</h1>
        <div className="flex gap-3">
          <Button
            onClick={() => setGenerateBillsDialogOpen(true)}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Generate Bills
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Detailed View</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reservoirs.map((reservoir) => {
              const percentage = (reservoir.currentLevel / reservoir.capacity) * 100;
              return (
                <Card key={reservoir.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{reservoir.name}</CardTitle>
                      {getStatusBadge(reservoir.status)}
                    </div>
                    <CardDescription>
                      {reservoir.sectors.join(', ')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between font-medium">
                        <span>Water Level</span>
                        <span className="text-water-600">{percentage.toFixed(1)}%</span>
                      </div>
                      <Progress 
                        value={percentage} 
                        className={`h-2 ${
                          percentage < 30 ? 'bg-red-500' : 
                          percentage < 60 ? 'bg-amber-500' : 'bg-green-500'
                        }`} 
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{reservoir.currentLevel} kL</span>
                        <span>{reservoir.capacity} kL</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Updated: {reservoir.lastUpdated}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="gap-1"
                      onClick={() => openUpdateDialog(reservoir)}
                    >
                      <Droplet className="h-3 w-3" />
                      Update Level
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Historical Water Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-4">
                <Select defaultValue="RES-001">
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select reservoir" />
                  </SelectTrigger>
                  <SelectContent>
                    {reservoirs.map((reservoir) => (
                      <SelectItem key={reservoir.id} value={reservoir.id}>
                        {reservoir.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <WaterLevelChart
                  title="Past 4 Weeks"
                  data={reservoirs[0].history}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reservoir Details</CardTitle>
              <CardDescription>In-depth information about each reservoir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {reservoirs.map((reservoir) => (
                  <div key={reservoir.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold mb-4">{reservoir.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="space-y-2">
                          <div className="grid grid-cols-2">
                            <span className="text-sm text-muted-foreground">ID:</span>
                            <span className="text-sm">{reservoir.id}</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-sm text-muted-foreground">Total Capacity:</span>
                            <span className="text-sm">{reservoir.capacity} kL</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-sm text-muted-foreground">Current Level:</span>
                            <span className="text-sm">{reservoir.currentLevel} kL</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-sm text-muted-foreground">Percentage:</span>
                            <span className="text-sm">{((reservoir.currentLevel / reservoir.capacity) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <span className="text-sm">{getStatusBadge(reservoir.status)}</span>
                          </div>
                          <div className="grid grid-cols-2">
                            <span className="text-sm text-muted-foreground">Last Updated:</span>
                            <span className="text-sm">{reservoir.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Sectors Supplied:</h4>
                        <div className="flex flex-wrap gap-2">
                          {reservoir.sectors.map((sector) => (
                            <Badge key={sector} variant="outline" className="bg-water-50 text-water-800 border-water-200">
                              {sector}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>Set up alerts for critical reservoir levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {reservoirs.map((reservoir) => (
                  <div key={reservoir.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <h3 className="text-lg font-semibold">{reservoir.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Current level: {((reservoir.currentLevel / reservoir.capacity) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Alert at" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10% level</SelectItem>
                          <SelectItem value="20">20% level</SelectItem>
                          <SelectItem value="30">30% level</SelectItem>
                          <SelectItem value="40">40% level</SelectItem>
                          <SelectItem value="50">50% level</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleAlertClick(reservoir.name)}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Dialog for updating water level */}
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Water Level</DialogTitle>
            <DialogDescription>
              Adjust the current water level for this reservoir.
            </DialogDescription>
          </DialogHeader>
          
          {selectedReservoir && (
            <UpdateWaterLevelForm
              reservoirId={selectedReservoir.id}
              reservoirName={selectedReservoir.name}
              currentLevel={selectedReservoir.currentLevel}
              capacity={selectedReservoir.capacity}
              onClose={() => setUpdateDialogOpen(false)}
              onUpdateLevel={handleUpdateLevel}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Dialog for generating bills */}
      <Dialog open={generateBillsDialogOpen} onOpenChange={setGenerateBillsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Bills</DialogTitle>
            <DialogDescription>
              Create bills for water usage by sector.
            </DialogDescription>
          </DialogHeader>
          
          <GenerateBillsForm onClose={() => setGenerateBillsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reservoirs;
