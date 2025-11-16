'use client'

import { useContext, useState } from "react";
import { Context } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";

const paymentMethods =[
    {id:0, name: 'Cash payment', img: '/payment-method/payment-method.png'},
    {id:1, name: 'gcash', img: '/payment-method/gcash.png'},
    {id:2, name: 'paymaya', img: '/payment-method/maya.png'}
]

export default function CheckoutPage() {
  const context = useContext(Context);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('');


  if (!context) return null;

  const { selectedItems } = context;

  const [tip, setTip] = useState<number>(0);
  const [pickupNow, setPickupNow] = useState(true);

  const total = selectedItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("₱", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen p-6 ">
        <div className="flex items-center mb-4">
            <Image src="/shopping-cart.png" height={30} width={30} alt="shopping cart icon" />
            <h1 className="ml-3 text-xl md:text-2xl font-semibold">Checkout</h1>
        </div>
      {selectedItems.length === 0 ? (
        <section className="flex flex-col items-center">
          <Image src="/empty-cart.png" width={200} height={200} alt="Empty Cart" />
          <h2 className="text-xl font-semibold mt-4 text-gray-600">Your cart is empty</h2>
          <Link
            href="/"
            className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Back to Menu
          </Link>
        </section>
      ) : (
        <section className="space-y-6">
          {/* Cart Summary */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
            {selectedItems.map(item => {
              const price = parseFloat(item.price.replace("₱", ""));
              return (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={item.img} alt={item.alt} className="w-16 h-16 rounded-lg object-cover border" />
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-gray-600">{item.quantity} x {item.price}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-red-600">₱{(price * item.quantity).toFixed(2)}</p>
                </div>
              );
            })}
        </div>

        {/* 2nd SECTION */}
        <div className="grid grid-cols-2 gap-5">
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">

            {/* Payment Methods Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <p className="font-bold text-lg mb-2">Payment Methods</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentMethods.map((item) => (
            <button
                key={item.id}
                onClick={() => setSelectedPayment(item.name)}
                className={`cursor-pointer flex items-center gap-3 w-full p-3 border rounded-lg transition-all 
                            ${selectedPayment === item.name ? 'border-main-red text-main-red' : 'border-gray-200 hover:shadow-md hover:bg-gray-50'}`}
            >
                <Image
                src={item.img}
                alt={item.name}
                width={40}
                height={30}
                className="object-contain"
                />
                <h3>{item.name}</h3>
            </button>
            ))}
        </div>
        </div>
            </div>
            {/* Tip */}
        <div className=" p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Tip</h2>
            <div className="flex gap-3 mb-2">
              {[5, 10, 20].map(amount => (
                <button
                  key={amount}
                  className={`px-4 py-2 border border-gray-200 cursor-pointer rounded-lg ${
                    tip === amount ? "border-main-red text-main-red" : " "
                  }`}
                  onClick={() => setTip(amount)}
                >
                  ₱{amount}.00
                </button>
              ))}
              
            </div>
            <input
              type="number"
              placeholder="Custom Tip"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={tip || ""}
              min={0}
              onChange={(e) => setTip(Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {
                e.preventDefault();
                }}}
            />
        <div>

            </div>
        </div>
          
          </div>

          {/* Pickup Time */}
    <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="font-semibold text-lg">Time of Pickup</h1>
        <input
            type="datetime-local"
            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
        />
    </div>

          {/* Total & Confirm */}
          <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <p className="font-bold text-lg">Total: ₱{(total + tip).toFixed(2)}</p>
            <button className="border border-main-red text-main-red px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-red-50 transition">
              Confirm Order
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
