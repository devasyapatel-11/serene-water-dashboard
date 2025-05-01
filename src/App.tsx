
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Index from "./pages/Index";
import Officers from "./pages/Officers";
import Reservoirs from "./pages/Reservoirs";
import Customers from "./pages/Customers";
import Billing from "./pages/Billing";
import WaterMeters from "./pages/WaterMeters";
import SupplyRequests from "./pages/SupplyRequests";
import Maintenance from "./pages/Maintenance";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

// Create a QueryClient with default options that don't rely on a backend
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PageLayout>
                <Index />
              </PageLayout>
            }
          />
          <Route
            path="/officers"
            element={
              <PageLayout>
                <Officers />
              </PageLayout>
            }
          />
          <Route
            path="/reservoirs"
            element={
              <PageLayout>
                <Reservoirs />
              </PageLayout>
            }
          />
          <Route
            path="/customers"
            element={
              <PageLayout>
                <Customers />
              </PageLayout>
            }
          />
          <Route
            path="/billing"
            element={
              <PageLayout>
                <Billing />
              </PageLayout>
            }
          />
          <Route
            path="/meters"
            element={
              <PageLayout>
                <WaterMeters />
              </PageLayout>
            }
          />
          <Route
            path="/requests"
            element={
              <PageLayout>
                <SupplyRequests />
              </PageLayout>
            }
          />
          <Route
            path="/maintenance"
            element={
              <PageLayout>
                <Maintenance />
              </PageLayout>
            }
          />
          <Route
            path="/feedback"
            element={
              <PageLayout>
                <Feedback />
              </PageLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
