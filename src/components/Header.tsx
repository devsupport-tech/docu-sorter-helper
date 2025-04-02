
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileText, Image, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"user" | "admin">("user");
  
  // Check if user is logged in on component mount
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setUserRole(localStorage.getItem("userRole") === "admin" ? "admin" : "user");
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Handle login/logout
  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      setIsLoggedIn(false);
      setUserRole("user");
    } else {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    }
  };
  
  // Toggle user role
  const handleRoleToggle = () => {
    const newRole = userRole === "admin" ? "user" : "admin";
    localStorage.setItem("userRole", newRole);
    setUserRole(newRole);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-200",
        isScrolled ? "backdrop-blur-md bg-background/80 shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container h-full flex items-center justify-between px-4 max-w-screen-xl mx-auto">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="font-semibold text-lg">DocumentSorter</Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Upload
            </Link>
            <Link to="/documents" className="text-sm hover:text-primary transition-colors">
              Documents
            </Link>
            <Link to="/photo-reports" className="text-sm hover:text-primary transition-colors">
              Photo Reports
            </Link>
            {isLoggedIn && userRole === "admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm">
                    Admin <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/admin/config">Configuration</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
        
        {/* Login/Profile */}
        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                  <div className={cn(
                    "absolute -top-1 -right-1 h-3 w-3 rounded-full",
                    userRole === "admin" ? "bg-primary" : "bg-green-500"
                  )} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {userRole === "admin" ? "Admin User" : "Regular User"}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/documents">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/photo-reports">
                    <Image className="h-4 w-4 mr-2" />
                    Photo Reports
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleRoleToggle}>
                  Switch to {userRole === "admin" ? "User" : "Admin"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAuthAction}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" onClick={handleAuthAction}>
              Log in
            </Button>
          )}
          <Button variant="default" size="sm" asChild>
            <Link to="/settings">Settings</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
