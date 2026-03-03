import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { api, setAccessToken, getErrorMessage, markRestoreComplete } from "@/lib/api";
import { useSocket } from "@/hooks/useSocket";
import type { UserPublic } from "@/types";

interface AuthContextType {
  user: UserPublic | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string, rememberMe?: boolean) => Promise<{ error?: string }>;
  register: (data: { username: string; password: string }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRestoring = useRef(true);

  // Try to restore session on mount via refresh token (httpOnly cookie)
  useEffect(() => {
    const restore = async () => {
      try {
        const { data } = await api.post("/auth/refresh");
        setAccessToken(data.accessToken);
        // Fetch profile with new token
        const profile = await api.get("/user/profile");
        setUser(profile.data);
      } catch {
        // No valid session – that's fine
        setAccessToken(null);
        setUser(null);
      } finally {
        isRestoring.current = false;
        markRestoreComplete();
        setIsLoading(false);
      }
    };
    restore();
  }, []);

  // Listen for expired-auth events from interceptor
  // Ignore these during the initial restore phase (the interceptor's
  // own refresh will race with the restore and may fire prematurely)
  useEffect(() => {
    const handleExpired = () => {
      if (isRestoring.current) return;
      setAccessToken(null);
      setUser(null);
    };
    window.addEventListener("auth:expired", handleExpired);
    return () => window.removeEventListener("auth:expired", handleExpired);
  }, []);

  const login = useCallback(async (username: string, password: string, rememberMe?: boolean) => {
    try {
      const { data } = await api.post("/auth/login", { username, password, rememberMe: !!rememberMe });
      setAccessToken(data.accessToken);
      setUser(data.user);
      return {};
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  }, []);

  const register = useCallback(async (data: { username: string; password: string }) => {
    try {
      await api.post("/auth/register", data);
      // Auto-login after registration
      const loginResult = await api.post("/auth/login", data);
      setAccessToken(loginResult.data.accessToken);
      setUser(loginResult.data.user);
      return {};
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore – we clear state regardless
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  // Connect to socket for real-time updates (devices, sessions, etc.)
  // This does NOT affect auth state — extension unlink events only refresh query caches
  useSocket(!!user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
