"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const buildUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      const username = localStorage.getItem("username") || null;
      const employeeId = localStorage.getItem("employeeId") || null;

      return {
        id: decoded.id,
        role: decoded.role,
        username,
        employeeId,
      };
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    const u = buildUserFromToken();
    if (u) setUser(u);
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post("/login", { username, password });
      const {
        token,
        username: userNameFromResponse,
        employeeId,
      } = response.data;

      localStorage.setItem("token", token);
      if (userNameFromResponse)
        localStorage.setItem("username", userNameFromResponse);
      if (employeeId) localStorage.setItem("employeeId", employeeId);

      const decoded = jwtDecode(token);
      const userData = {
        id: decoded.id,
        role: decoded.role,
        username: userNameFromResponse || null,
        employeeId: employeeId || null,
      };

      setUser(userData);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("employeeId");
    setUser(null);
    router.push("/login");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
