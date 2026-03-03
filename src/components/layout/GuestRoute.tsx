import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingPage } from "@/components/shared/LoadingSpinner";

interface GuestRouteProps {
  children: React.ReactNode;
}

/**
 * Wrapper that redirects authenticated users away from guest-only pages
 * (Login, Register) to the dashboard.
 */
export const GuestRoute = ({ children }: GuestRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
