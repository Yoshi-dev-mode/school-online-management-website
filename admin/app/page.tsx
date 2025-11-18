'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import Image from "next/image";

export default function Dashboard() {
  // Sample props — you can replace with real DB data
  const stats = {
    pending: 5,
    completed: 32,
    orders: 120,
    salesToday: 0,
    topProduct: "Chicken Burger",
  };

  const cardStyle =
    "rounded-2xl shadow-md p-4 flex flex-col gap-2 bg-white";

  return (
    <main>
    <div className="flex items-center mb-4">
        <Image src="/grid.png" height={30} width={30} alt="shopping cart icon" />
        <h1 className="ml-3 text-xl md:text-2xl font-semibold">Dashboard</h1>
    </div>

    <div className=" grid gap-6 md:grid-cols-3">

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-xl font-semibold">Pending Orders</CardTitle>
            <Clock className="h-6 w-6" color="#FF0000" />
          </CardHeader>
          <CardContent className="mt-4 text-4xl font-bold">
            {stats.pending}
          </CardContent>
        </Card>
      </motion.div>

      {/* Completed Orders */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-xl font-semibold">Completed</CardTitle>
            <CheckCircle className="h-6 w-6" color="#FF0000"/>
          </CardHeader>
          <CardContent className="mt-4 text-4xl font-bold">
            {stats.completed}
          </CardContent>
        </Card>
      </motion.div>

      {/* Number of Customers */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className={cardStyle}>
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-xl font-semibold">Orders</CardTitle>
            <Users className="h-6 w-6" color="#e7000b" />
          </CardHeader>
          <CardContent className="mt-4 text-4xl font-bold">
            {stats.orders}
          </CardContent>
        </Card>
      </motion.div>
    </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-4 rounded-2xl shadow-md bg-white">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-xl font-semibold">Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={400} height={250} data={[{name:"Sun", sales:31},{ name: "Mon", sales: 1 }, { name: "Tue", sales: 4 }, { name: "Wed", sales: 150 }, { name: "Thu", sales: 3 }, { name: "Fri", sales: 32 }, {name:"Sat", sales:43}]}> 
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
            <BarChart width={400} height={250} data={[{ name: "Pending", value: 5 }, { name: "Completed", value: 32 }]}> 
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
          <CardContent className=" text-4xl font-bold">
            ₱{stats.salesToday}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md p-4 bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Top Product</CardTitle>
          </CardHeader>
          <CardContent className="mt-4 text-2xl font-semibold">
            {stats.topProduct}
          </CardContent>
        </Card>
      </div>
    </main>
    );
}
