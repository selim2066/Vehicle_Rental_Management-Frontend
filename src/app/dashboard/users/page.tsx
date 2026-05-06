"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { 
  Users, Search, Filter, 
  MoreVertical, Edit3, Trash2, 
  CheckCircle2, XCircle, Mail, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { userService, User } from "@/services/user.service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function UserManagementPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await userService.getAll(token);
      const userData = response.users || (response as any).data?.users || (response as any).data || [];
      if (Array.isArray(userData)) setUsers(userData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to deactivate this user?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await userService.delete(token, id);
      toast.success("User deactivated successfully");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage platform users, roles and account statuses</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: users.length, color: "text-primary" },
          { label: "Active", value: users.filter(u => u.is_active).length, color: "text-emerald-500" },
          { label: "Admins", value: users.filter(u => u.role === 'admin').length, color: "text-blue-500" },
          { label: "Customers", value: users.filter(u => u.role === 'customer').length, color: "text-purple-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border/40 rounded-3xl p-6 shadow-sm">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            <p className={cn("text-3xl font-bold mt-1", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-14 pl-12 rounded-2xl bg-card border-border/40 focus:ring-primary/20"
          />
        </div>
        <Button variant="outline" className="h-14 rounded-2xl gap-2 px-6 border-border/40 font-bold bg-card">
          <Filter className="w-5 h-5" />
          Filters
        </Button>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border/40 rounded-[3rem] overflow-hidden">
        {isLoading ? (
          <div className="p-20 flex justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/40">
                  <th className="py-6 px-8">User Details</th>
                  <th className="py-6 px-8">Contact Information</th>
                  <th className="py-6 px-8">Role</th>
                  <th className="py-6 px-8">Status</th>
                  <th className="py-6 px-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="group hover:bg-muted/30 transition-colors">
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-lg group-hover:text-primary transition-colors">{u.name}</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Since {new Date(u.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3.5 h-3.5 text-primary" />
                          {u.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          {u.phone || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-8">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase border",
                        u.role === 'admin' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                      )}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-6 px-8">
                      <div className={cn(
                        "flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest w-fit",
                        u.is_active ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      )}>
                        {u.is_active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {u.is_active ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-2xl h-12 w-12 border-2 border-white/5 bg-white/5 backdrop-blur-lg hover:bg-primary hover:text-primary-foreground hover:border-primary/50 inline-flex items-center justify-center transition-all duration-300 outline-none shadow-lg">
                          <MoreVertical className="w-5 h-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2">
                          <DropdownMenuItem className="rounded-xl font-bold py-3 cursor-pointer gap-2">
                            <Edit3 className="w-4 h-4 text-blue-500" /> Edit User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(u.id)}
                            disabled={u.id === currentUser?.id}
                            className="rounded-xl font-bold py-3 cursor-pointer gap-2 text-rose-500 hover:bg-rose-500/10 disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" /> {u.is_active ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
