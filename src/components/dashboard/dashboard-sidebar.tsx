"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  User as UserIcon,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  const userLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Bookings", href: "/bookings", icon: Calendar },
    { name: "My Profile", href: "/dashboard/profile", icon: UserIcon },
  ];

  const adminLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Fleet Management", href: "/dashboard/vehicles", icon: Car },
    { name: "All Bookings", href: "/dashboard/admin/bookings", icon: Calendar },
    { name: "User Management", href: "/dashboard/users", icon: Users },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const links = user?.role === "admin" ? adminLinks : userLinks;

  return (
    <aside className={cn(
      "w-80 h-screen sticky top-0 bg-card border-r border-border/40 p-8 flex flex-col transition-transform duration-300 z-50",
      "fixed lg:sticky lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 group mb-12">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
          <Car className="text-primary-foreground w-6 h-6" />
        </div>
        <span className="text-2xl font-heading font-bold tracking-tight">
          VROOM<span className="text-primary">.</span>
        </span>
      </Link>

      {/* Nav Links */}
      <nav className="flex-grow space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <link.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "" : "text-primary")} />
              <span className="font-bold">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile */}
      <div className="pt-8 border-t border-border/40 mt-8 space-y-4">
        <div className="flex items-center gap-4 px-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-background shadow-lg">
            <UserIcon className="w-6 h-6 text-primary" />
          </div>
          <div className="overflow-hidden">
            <p className="font-bold truncate">{user?.name}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{user?.role}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-4 h-14 rounded-2xl text-destructive hover:bg-destructive/10 px-6 font-bold"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
