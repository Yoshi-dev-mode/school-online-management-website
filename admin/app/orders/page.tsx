'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HistoryPage() {
  const [filter, setFilter] = useState<"All" | "Completed" | "Pending">("All");
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/orders");
      const data = await res.json();
      setHistory(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    // optional: poll every 5s to get new orders
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Convert backend data → table rows
  const allItems = history.flatMap((order) =>
    order.items.map((item: any) => ({
      orderId: order.id,
      date: order.date || order.createdAt?.split("T")[0],
      time: order.time || order.createdAt?.split("T")[1]?.slice(0, 5),
      status: order.status,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }))
  );

  // Filter items
  const filteredHistory =
    filter === "All"
      ? allItems
      : allItems.filter(
          (item: any) => item.status.toLowerCase() === filter.toLowerCase()
        );

  if (loading) return <p className="text-center">Loading orders...</p>;

  return (
    <main>
      <div className="flex items-center mb-4">
        <Image src="/shopping-bag.png" height={30} width={30} alt="shopping cart icon" />
        <h1 className="ml-3 text-xl md:text-2xl font-semibold">Orders</h1>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        {["All", "Completed", "Pending"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`
              px-3 py-1 rounded-lg border transition-all cursor-pointer
              ${
                filter === type
                  ? "bg-red-50 text-main-red border-main-red"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-gray-700">
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Time</th>
              <th className="py-3 px-2">Product Name</th>
              <th className="py-3 px-2">Quantity</th>
              <th className="py-3 px-2">Price per item</th>
              <th className="py-3 px-2">Total</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.map((item: any, i: number) => (
              <tr key={i} className="border-b text-gray-900">
                <td className="py-3 px-2">{item.date}</td>
                <td className="py-3 px-2">{item.time}</td>
                <td className="py-3 px-2">{item.name}</td>
                <td className="py-3 px-2">{item.quantity}</td>
                <td className="py-3 px-2">₱{item.price}</td>
                <td className="py-3 px-2">₱{item.price * item.quantity}</td>
                <td className="py-3 px-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.status.toLowerCase() === "completed"
                        ? "bg-green-100 text-green-700"
                        : item.status.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
