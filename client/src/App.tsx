import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import AuthPage from "@/pages/auth";
import CoursesPage from "@/pages/courses";
import CourseDetail from "@/pages/course-detail";
import CoursePlayer from "@/pages/course-player";
import Dashboard from "@/pages/dashboard";
import AdminPanel from "@/pages/admin";
import NotFound from "@/pages/not-found";

const HIDE_CHROME_ROUTES = ["/dashboard", "/admin", "/auth"];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/course/:id" component={CourseDetail} />
      <Route path="/course/:id/learn" component={CoursePlayer} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={AdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  const [location] = useLocation();
  const isPlayerRoute = location.match(/^\/course\/\d+\/learn$/);
  const hideChrome =
    HIDE_CHROME_ROUTES.some((r) => location.startsWith(r)) || isPlayerRoute;

  return (
    <>
      {!hideChrome && <Navbar />}
      <Router />
      {!hideChrome && <Footer />}
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <AppLayout />
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
