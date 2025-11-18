'use client';

import { useState} from "react";
import Image from "next/image";

export default function HistoryPage() {
  const [filter, setFilter] = useState<"All" | "Completed" | "Pending">("All");


const [history, setHistory] = useState([
  { date: "11/9/2025", time: "4:00PM", name: "Potato corner", quantity: 3, price: 120, status: "Completed" },
  { date: "11/9/2025", time: "4:00PM", name: "Potato corner", quantity: 3, price: 120, status: "Pending" },
  { date: "11/9/2025", time: "4:00PM", name: "Potato corner", quantity: 3, price: 120, status: "Completed" },
]);
  // Filtering logic
const filteredHistory =
  filter === "All"
    ? history
    : history.filter((item: any) => item.status.toLowerCase() === filter.toLowerCase());

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
              px-3 py-1 rounded-lg border
              transition-all cursor-pointer
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
              <th className="py-3 px-2">Total spend</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredHistory.map((orderItem: any, i: number) => (
              <tr key={i} className="border-b text-gray-900">
                <td className="py-3 px-2">{orderItem.date}</td>
                <td className="py-3 px-2">{orderItem.time}</td>
                <td className="py-3 px-2">{orderItem.name}</td>
                <td className="py-3 px-2">{orderItem.quantity}</td>
                <td className="py-3 px-2">₱{orderItem.price}</td>
                <td className="py-3 px-2">₱{orderItem.price * orderItem.quantity}</td>
                <td className="py-3 px-2">
                <select
                    value={orderItem.status}
                    onChange={(e) => {
                    const newStatus = e.target.value;
                    // Update the status in your history array (state or DB)
                    const updatedHistory = [...history];
                    updatedHistory[i].status = newStatus;
                    setHistory(updatedHistory); // make sure history is in state
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none
                    ${
                        orderItem.status.toLowerCase() === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
