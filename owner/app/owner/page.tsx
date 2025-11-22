"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "completed"
  | "rejected"
  | "cancelled";

interface Order {
  id: number;
  name: string;
  item: string;
  quantity: number;
  totalPrice: number; // in your currency
  status: OrderStatus;
  rejectReason?: string;
}

export default function OwnerPage() {
  // TEMPORARY DATAS
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, name: "John Santos", item: "Burger Meal", quantity: 2, totalPrice: 300, status: "pending" },
    { id: 2, name: "Maria Cruz", item: "Spaghetti", quantity: 1, totalPrice: 150, status: "pending" },
    { id: 3, name: "Alex Dela Vega", item: "Chicken Rice", quantity: 3, totalPrice: 450, status: "pending" },
  ]);

  const updateStatus = (orderId: number, newStatus: OrderStatus, reason?: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus, rejectReason: reason } : o
      )
    );
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
    <div className="min-h-screen bg-[#FFFFFF] p-6">
      <h1 className="text-4xl font-bold  text-center mb-8">
        Incoming Orders
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="shadow-xl border  rounded-2xl"
          >
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">Order #{order.id}</h2>
              <p className="text-sm text-gray-500">ID: {order.id}</p>
              <p className="text-lg">Name: {order.name}</p>
              <p className="text-lg">Item: {order.item}</p>
              <p className="text-lg">Quantity: {order.quantity}</p>
              <p className="text-lg font-semibold">Total Price: ₱{order.totalPrice}</p>
              <p className="text-sm font-medium">
                Status: <span className="text-main-red">{order.status}</span>
              </p>

              {/* Pending Buttons */}
              {order.status === "pending" && (
                <div className="flex gap-3">
                  <Button
                    className="border border-green-600 text-green-600 cursor-pointer hover:bg-green-600 hover:text-white"
                    onClick={() => updateStatus(order.id, "accepted")}
                  >
                    Accept
                  </Button>
                  <Button
                    className="border border-main-red text-main-red cursor-pointer hover:bg-main-red hover:text-white"
                    onClick={() => handleReject(order.id)}
                  >
                    Reject
                  </Button>
                </div>
              )}

              {/* Accepted */}
              {order.status === "accepted" && (
                <Button
                  className="border border-green-600 text-green-600 cursor-pointer hover:bg-green-600 hover:text-white"
                  onClick={() => updateStatus(order.id, "preparing")}
                >
                  Prepare?
                </Button>
              )}

              {/* Preparing → Completed + Cancel */}
              {order.status === "preparing" && (
                <div className="flex gap-3">
                  <Button
                    className="border border-green-600 text-green-600 cursor-pointer hover:bg-green-600 hover:text-white"
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

              {/* Completed */}
              {order.status === "completed" && (
                <p className="text-green-600 font-semibold">Completed ✔</p>
              )}

              {/* Rejected */}
              {order.status === "rejected" && (
                <div className="space-y-1">
                  <p className="text-red-600 font-semibold">Rejected ❌</p>
                  {order.rejectReason && (
                    <p className="text-sm text-gray-700">
                      Reason: {order.rejectReason}
                    </p>
                  )}
                </div>
              )}

              {/* Cancelled */}
              {order.status === "cancelled" && (
                <p className="text-red-700 font-semibold">Cancelled ❌</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
