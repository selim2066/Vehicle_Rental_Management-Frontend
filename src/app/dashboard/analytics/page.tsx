"use client";

import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, 
  Car, Calendar, CreditCard,
  Download, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const data = [
  { name: 'Mon', revenue: 4000, bookings: 24 },
  { name: 'Tue', revenue: 3000, bookings: 18 },
  { name: 'Wed', revenue: 5000, bookings: 35 },
  { name: 'Thu', revenue: 2780, bookings: 12 },
  { name: 'Fri', revenue: 6890, bookings: 48 },
  { name: 'Sat', revenue: 8390, bookings: 62 },
  { name: 'Sun', revenue: 7490, bookings: 55 },
];

const pieData = [
  { name: 'Luxury', value: 45, color: 'var(--primary)' },
  { name: 'SUV', value: 25, color: '#3b82f6' },
  { name: 'Sedan', value: 20, color: '#10b981' },
  { name: 'Sports', value: 10, color: '#f59e0b' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold tracking-tight">Business Analytics</h1>
          <p className="text-muted-foreground mt-1">Real-time performance metrics and insights</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-2xl gap-2 h-14 px-6 border-border/40 font-bold">
            <Download className="w-5 h-5" />
            Download Report
          </Button>
          <Button className="rounded-2xl gap-2 h-14 px-8 font-bold shadow-lg shadow-primary/20">
            <Filter className="w-5 h-5" />
            Custom Range
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Total Revenue", value: "$45,231", change: "+12.5%", icon: CreditCard, color: "text-emerald-500", up: true },
          { label: "Active Users", value: "2,845", change: "+18.2%", icon: Users, color: "text-blue-500", up: true },
          { label: "Fleet Utilization", value: "84%", change: "-2.4%", icon: Car, color: "text-primary", up: false },
          { label: "Total Bookings", value: "1,240", change: "+5.1%", icon: Calendar, color: "text-amber-500", up: true },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border/40 rounded-[2.5rem] p-8 shadow-sm group hover:border-primary/20 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-muted/50 rounded-2xl flex items-center justify-center">
                <metric.icon className={cn("w-6 h-6", metric.color)} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border",
                metric.up ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
              )}>
                {metric.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {metric.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{metric.label}</p>
              <p className="text-3xl font-bold mt-1 tracking-tight">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Revenue Growth Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 bg-card border border-border/40 rounded-[3rem] p-10"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Revenue Growth</h3>
              <p className="text-sm text-muted-foreground">Weekly revenue overview from all categories</p>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 600 }} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '1rem' }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Fleet Distribution Pie */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-4 bg-card border border-border/40 rounded-[3rem] p-10"
        >
          <h3 className="text-2xl font-bold tracking-tight mb-8">Fleet Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-8">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-bold text-muted-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Booking Volume Line Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card border border-border/40 rounded-[3rem] p-10"
      >
        <h3 className="text-2xl font-bold tracking-tight mb-10">Booking Volume</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 600 }} dx={-10} />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="var(--primary)" strokeWidth={4} dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
