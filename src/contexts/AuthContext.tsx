import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (data: { name: string; email: string; password: string }) => Promise<{ error?: string }>;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("trust_analyzer_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - replace with actual API call
    if (email && password) {
      const mockUser = {
        id: "user-1",
        email,
        name: email.split("@")[0],
      };
      setUser(mockUser);
      localStorage.setItem("trust_analyzer_user", JSON.stringify(mockUser));
      return {};
    }
    return { error: "Invalid credentials" };
  };

  const register = async (data: { name: string; email: string; password: string }) => {
    // Mock register - replace with actual API call
    if (data.email && data.password && data.name) {
      const mockUser = {
        id: "user-" + Date.now(),
        email: data.email,
        name: data.name,
      };
      setUser(mockUser);
      localStorage.setItem("trust_analyzer_user", JSON.stringify(mockUser));
      return {};
    }
    return { error: "Registration failed" };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("trust_analyzer_user");
  };

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
