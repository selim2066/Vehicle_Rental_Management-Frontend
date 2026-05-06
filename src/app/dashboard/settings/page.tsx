"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { 
  Settings, User, Bell, 
  Lock, Globe, Shield, 
  Moon, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user } = useAuth();

  const handleSave = () => {
    toast.success("Settings updated successfully");
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-heading font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and platform configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Nav */}
        <div className="space-y-2">
          {[
            { label: "General", icon: Settings, active: true },
            { label: "Account", icon: User },
            { label: "Notifications", icon: Bell },
            { label: "Security", icon: Lock },
            { label: "Language", icon: Globe },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all",
                item.active 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border/40 rounded-[2.5rem] p-10 space-y-10">
            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Privacy & Security
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Public Profile", desc: "Allow others to see your name and avatar.", checked: true },
                  { title: "Email Notifications", desc: "Receive updates about your bookings.", checked: true },
                  { title: "Two-Factor Authentication", desc: "Secure your account with 2FA.", checked: false },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/30 transition-colors">
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className={cn(
                      "w-12 h-6 rounded-full transition-colors relative cursor-pointer",
                      item.checked ? "bg-primary" : "bg-muted"
                    )}>
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                        item.checked ? "left-7" : "left-1"
                      )} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Moon className="w-5 h-5 text-primary" />
                Appearance
              </h3>
              <div className="flex gap-4">
                {["Light", "Dark", "System"].map((mode) => (
                  <button 
                    key={mode}
                    className={cn(
                      "flex-1 p-4 rounded-2xl border-2 font-bold text-sm transition-all",
                      mode === "Dark" ? "border-primary bg-primary/5" : "border-border/40 hover:border-primary/20"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </section>

            <div className="pt-6 border-t border-border/40">
              <Button 
                onClick={handleSave}
                className="h-14 px-10 rounded-2xl font-bold gap-2 shadow-lg shadow-primary/20"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
