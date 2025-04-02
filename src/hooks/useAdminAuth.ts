
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export type UserRole = "admin" | "user" | null;

export const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const navigate = useNavigate();
  
  // Initialize state from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as UserRole;
    const storedLoginStatus = localStorage.getItem("isLoggedIn") === "true";
    
    setIsAdmin(storedRole === "admin");
    setIsLoggedIn(storedLoginStatus);
    setUserRole(storedRole);
  }, []);
  
  // Login function
  const login = useCallback((role: UserRole = "user") => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role || "user");
    
    setIsLoggedIn(true);
    setUserRole(role);
    setIsAdmin(role === "admin");
    
    toast({
      title: "Logged in successfully",
      description: `You are now logged in as ${role || "user"}.`
    });
    
    navigate("/");
    return true;
  }, [navigate]);
  
  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    
    setIsLoggedIn(false);
    setUserRole(null);
    setIsAdmin(false);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    
    navigate("/");
    return true;
  }, [navigate]);
  
  // Switch role function
  const switchRole = useCallback((newRole: UserRole) => {
    if (!isLoggedIn) {
      toast({
        title: "Error",
        description: "You must be logged in to switch roles.",
        variant: "destructive"
      });
      return false;
    }
    
    localStorage.setItem("userRole", newRole || "user");
    setUserRole(newRole);
    setIsAdmin(newRole === "admin");
    
    toast({
      title: "Role Updated",
      description: `Your role has been updated to ${newRole || "user"}.`
    });
    
    return true;
  }, [isLoggedIn]);
  
  // Check if user has a specific role
  const hasRole = useCallback((role: UserRole): boolean => {
    return userRole === role;
  }, [userRole]);
  
  // Check if user is authorized to access a resource
  const isAuthorized = useCallback((requiredRole: UserRole): boolean => {
    if (!isLoggedIn) return false;
    if (requiredRole === "admin") return isAdmin;
    return true;
  }, [isLoggedIn, isAdmin]);
  
  return { 
    isAdmin, 
    isLoggedIn, 
    userRole,
    login,
    logout,
    switchRole,
    hasRole,
    isAuthorized
  };
};
