
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Index from "./pages/Index";
import Officers from "./pages/Officers";
import Reservoirs from "./pages/Reservoirs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
