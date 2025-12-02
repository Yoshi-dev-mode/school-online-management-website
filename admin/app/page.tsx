'use client'

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import Image from "next/image";

interface Order {
  id: number;
  items: { name: string; quantity: number; price: number }[];
  status: string;
  totalPrice: number;
  createdAt: string;
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = "http://127.0.0.1:8000/orders";

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await fetch(backendUrl);
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  // Compute stats dynamically
  const pendingCount = orders.filter(o => o.status.toLowerCase() === "pending").length;
  const completedCount = orders.filter(o => o.status.toLowerCase() === "completed").length;
  const totalOrders = orders.length;

  const salesToday = orders
    .filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString())
    .reduce((sum, o) => sum + (o.totalPrice || o.items.reduce((a, i) => a + i.price * i.quantity, 0)), 0);

  // Top product
  const productMap: Record<string, number> = {};
  orders.forEach(o => o.items.forEach(i => productMap[i.name] = (productMap[i.name] || 0) + i.quantity));
  const topProduct = Object.keys(productMap).reduce((a, b) => (productMap[a] > productMap[b] ? a : b), "");

  if (loading) return <p className="text-center mt-10 text-lg">Loading dashboard...</p>;

  return (
    <main>
      <div className="flex items-center mb-4">
        <Image src="/grid.png" height={30} width={30} alt="dashboard icon" />
        <h1 className="ml-3 text-xl md:text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="rounded-2xl shadow-md p-4 flex flex-col gap-2 bg-white">
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <CardTitle className="text-xl font-semibold">Pending Orders</CardTitle>
              <Clock className="h-6 w-6" color="#FF0000" />
            </CardHeader>
            <CardContent className="mt-4 text-4xl font-bold">{pendingCount}</CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-2xl shadow-md p-4 flex flex-col gap-2 bg-white">
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <CardTitle className="text-xl font-semibold">Completed</CardTitle>
              <CheckCircle className="h-6 w-6" color="#00AA00" />
            </CardHeader>
            <CardContent className="mt-4 text-4xl font-bold">{completedCount}</CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="rounded-2xl shadow-md p-4 flex flex-col gap-2 bg-white">
            <CardHeader className="flex flex-row items-center justify-between p-0">
              <CardTitle className="text-xl font-semibold">Total Orders</CardTitle>
              <Users className="h-6 w-6" color="#e7000b" />
            </CardHeader>
            <CardContent className="mt-4 text-4xl font-bold">{totalOrders}</CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-4 rounded-2xl shadow-md bg-white">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-semibold">Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart
              width={400}
              height={250}
              data={orders.map(o => ({ name: new Date(o.createdAt).toLocaleDateString(), sales: o.totalPrice || o.items.reduce((a,i) => a + i.price*i.quantity, 0) }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#ff6467" strokeWidth={3} />
            </LineChart>
          </CardContent>
        </Card>

        <Card className="p-4 rounded-2xl shadow-md bg-white">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-semibold">Orders Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              width={400}
              height={250}
              data={[
                { name: "Pending", value: pendingCount },
                { name: "Completed", value: completedCount },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#ff6467" />
            </BarChart>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <Card className="rounded-2xl shadow-md p-4 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Total Sales Today</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">₱{salesToday}</CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md p-4 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Top Product</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 text-2xl font-semibold">{topProduct || "N/A"}</CardContent>
        </Card>
      </div>
    </main>
  );
}
