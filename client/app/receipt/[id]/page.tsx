'use client'

import { useContext } from "react";
import { Context } from "@/app/layout";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ReceiptPage() {
  const context = useContext(Context);
  const params = useParams();
  const orderId = Number(params.id);

  if (!context) return null;

  const order = context.orders.find(o => o.id === orderId);

  if (!order) return <p className="p-6">Order not found</p>;

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border">
        <h1 className="text-center font-bold text-xl mb-4">Order Complete</h1>
        <div className="flex flex-col items-center mb-4">
          <Image src="/logo.png" width={200} height={80} alt="Logo" />
        </div>
        <hr className="my-2"/>
        <h2 className="font-bold text-lg my-2">Order: {String(order.id).padStart(3,'0')}</h2>
        <div className="flex justify-between text-sm mb-2">
          <span>Cashier: Admin</span>
          <span>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })}</span>
        </div>
        <hr className="my-2"/>
        <div className="mb-2">
          <div className="flex justify-between font-semibold">
            <span>Qty</span>
            <span>Item</span>
            <span>Price</span>
          </div>
          {order.items.map((item:any) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.quantity}</span>
              <span>{item.name}</span>
              <span>₱{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr className="my-2"/>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₱{order.total.toFixed(2)}</span>
        </div>
        <Link href="/">
          <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition cursor-pointer">
            Back to home
          </button>
        </Link>
      </div>
    </main>
  )
}
