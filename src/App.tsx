import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EyeTest from "./pages/EyeTest";
import VirtualTryOn from "./pages/VirtualTryOn";
import DentalScanner from "./pages/DentalScanner";
import HospitalLocator from "./pages/HospitalLocator";
import AIAssistant from "./pages/AIAssistant";
import PrescriptionReader from "./pages/PrescriptionReader";
import NutritionByCondition from "./pages/NutritionByCondition";
import DailyWellness from "./pages/DailyWellness";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/eye-test" element={<EyeTest />} />
          <Route path="/virtual-tryon" element={<VirtualTryOn />} />
          <Route path="/dental-scanner" element={<DentalScanner />} />
          <Route path="/hospital-locator" element={<HospitalLocator />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/prescription-reader" element={<PrescriptionReader />} />
          <Route path="/nutrition" element={<NutritionByCondition />} />
          <Route path="/daily-wellness" element={<DailyWellness />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
