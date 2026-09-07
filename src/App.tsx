import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import AssessmentPage from "./pages/AssessmentPage";
import ProfilePage from "./pages/ProfilePage";
import InterventionsPage from "./pages/InterventionsPage";
import AlertsPage from "./pages/AlertsPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";
import UserDrawer from "./components/UserDrawer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/assessment" element={<AssessmentPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/interventions" element={<InterventionsPage />} />
                      <Route path="/alerts" element={<AlertsPage />} />
                      <Route path="/privacy" element={<PrivacyPage />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
          <UserDrawer />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;