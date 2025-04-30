
import { ReactNode } from "react";
import Navbar from "./Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "./Sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 container p-4 sm:p-6 md:p-8 max-w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
