
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  UserCircle, 
  ClipboardList, 
  Settings, 
  LogOut,
  Menu,
  X,
  PanelLeft,
  Bell,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { 
      title: "Dashboard", 
      icon: <PanelLeft className="h-5 w-5" />, 
      path: "/dashboard" 
    },
    { 
      title: "Users", 
      icon: <Users className="h-5 w-5" />, 
      path: "/users" 
    },
    { 
      title: "Pending Users", 
      icon: <UserCircle className="h-5 w-5" />, 
      path: "/pending-users" 
    },
    { 
      title: "Patients", 
      icon: <ClipboardList className="h-5 w-5" />, 
      path: "/patients" 
    },
    { 
      title: "Issues", 
      icon: <MessageSquare className="h-5 w-5" />, 
      path: "/issues" 
    },
    { 
      title: "Settings", 
      icon: <Settings className="h-5 w-5" />, 
      path: "/settings" 
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-in-out bg-sidebar text-sidebar-foreground",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* Close button for mobile */}
        <button 
          className="lg:hidden absolute right-4 top-4 text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>

        {/* Logo */}
        <div className={cn(
          "flex items-center h-16 px-6 border-b border-sidebar-border",
          !sidebarOpen && "lg:justify-center lg:px-0"
        )}>
          <h1 className={cn(
            "font-bold text-2xl text-white flex items-center",
            !sidebarOpen && "lg:hidden"
          )}>
            Clovera
          </h1>
          <span className={cn(
            "text-white text-lg ml-2",
            !sidebarOpen && "lg:hidden"
          )}>
            Admin
          </span>
          <h1 className={cn(
            "font-bold text-3xl text-white hidden",
            !sidebarOpen && "lg:block"
          )}>
            C
          </h1>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.title}>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    !sidebarOpen && "lg:justify-center lg:px-0"
                  )}
                >
                  {item.icon}
                  <span className={cn("ml-3", !sidebarOpen && "lg:hidden")}>
                    {item.title}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Top Navigation */}
        <header className="z-10 py-4 bg-card shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-muted-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Sidebar Toggle for Desktop */}
            <button
              className="hidden lg:block p-2 rounded-md text-muted-foreground"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <h2 className="text-xl font-semibold text-foreground lg:hidden">
              Clovera Admin
            </h2>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Notifications */}
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={admin?.avatar} alt={admin?.name} />
                      <AvatarFallback>{admin?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{admin?.name}</p>
                      <p className="text-xs text-muted-foreground">{admin?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
