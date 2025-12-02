'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "completed"
  | "rejected"
  | "cancelled";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  customer_name: string;
  items: OrderItem[];
  total: number;
  tip: number;
  payment: string;
  date: string;
  time: string;
  status: OrderStatus;
  rejectReason?: string;
}

export default function OwnerPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const backendUrl = "http://127.0.0.1:8000/orders";

  const fetchOrders = async () => {
    try {
      const res = await fetch(backendUrl);
      const data: Order[] = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderId: number, newStatus: OrderStatus, reason?: string) => {
    try {
      await fetch(`${backendUrl}/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, rejectReason: reason }),
      });

      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: newStatus, rejectReason: reason } : o
        )
      );
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  const handleReject = (orderId: number) => {
    const reason = prompt(`Please enter the reason for rejecting Order #${orderId}:`);
    if (reason && reason.trim() !== "") {
      updateStatus(orderId, "rejected", reason);
    } else {
      alert("Reject reason is required!");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Incoming Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) =>
          // Map each item in the order to its own card
          order.items.map((item, idx) => (
            <Card key={`${order.id}-${idx}`} className="shadow-xl border rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold">Order #{order.id}</h2>
                <p className="text-lg font-medium">Customer: {order.customer_name}</p>
                <p className="text-lg">Item: {item.name}</p>
                <p className="text-lg">Quantity: {item.quantity}</p>
                <p className="text-lg font-semibold">Total: ₱{item.price * item.quantity}</p>

                <p className="text-sm font-medium">
                  Status: <span className="text-main-red">{order.status}</span>
                </p>

                {order.status === "pending" && (
                  <div className="flex gap-3">
                    <Button
                      className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      onClick={() => updateStatus(order.id, "accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      className="border border-main-red text-main-red hover:bg-main-red hover:text-white"
                      onClick={() => handleReject(order.id)}
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {order.status === "accepted" && (
                  <Button
                    className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    onClick={() => updateStatus(order.id, "preparing")}
                  >
                    Prepare?
                  </Button>
                )}

                {order.status === "preparing" && (
                  <div className="flex gap-3">
                    <Button
                      className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      onClick={() => updateStatus(order.id, "completed")}
                    >
                      Completed
                    </Button>
                    <Button
                      className="bg-main-red text-white"
                      onClick={() => updateStatus(order.id, "cancelled")}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {order.status === "completed" && <p className="text-green-600 font-semibold">Completed ✔</p>}
                {order.status === "rejected" && (
                  <div className="space-y-1">
                    <p className="text-red-600 font-semibold">Rejected ❌</p>
                    {order.rejectReason && <p className="text-sm text-gray-700">Reason: {order.rejectReason}</p>}
                  </div>
                )}
                {order.status === "cancelled" && <p className="text-red-700 font-semibold">Cancelled ❌</p>}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
