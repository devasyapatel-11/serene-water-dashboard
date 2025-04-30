
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SidebarComponent
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Database,
  Gauge,
  Calendar,
  Inbox,
  Wrench,
  MessageSquare
} from "lucide-react";
import Water3DLogo from "@/components/3d/Water3DLogo";

export default function Sidebar() {
  const location = useLocation();
  
  // Menu items for the sidebar
  const menuItems = [
    { title: "Dashboard", path: "/", icon: LayoutDashboard },
    { title: "Officers", path: "/officers", icon: Users },
    { title: "Reservoirs", path: "/reservoirs", icon: Database },
    { title: "Customers", path: "/customers", icon: Users },
    { title: "Billing", path: "/billing", icon: Calendar },
    { title: "Water Meters", path: "/meters", icon: Gauge },
    { title: "Supply Requests", path: "/requests", icon: Inbox },
    { title: "Maintenance", path: "/maintenance", icon: Wrench },
    { title: "Feedback", path: "/feedback", icon: MessageSquare }
  ];

  return (
    <SidebarComponent>
      <div className="flex items-center h-16 px-4 border-b border-border/40">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex items-center justify-center">
            <Water3DLogo />
          </div>
          <span className="text-lg">WaterSystem</span>
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild data-state={location.pathname === item.path ? "active" : undefined}>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
}
