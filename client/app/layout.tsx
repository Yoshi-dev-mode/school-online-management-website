'use client'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import React, { useState, useEffect } from "react";
import { ToastProvider } from "./components/Toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface FoodItem {
  id: number;
  name: string;
  image: string;
  price: number;
  alt: string;
  type: string;
  favorite: boolean;
  quantity: number;
  partner: string;
}

interface ContextType {
  food_pictures: FoodItem[];
  cart: FoodItem[];
  toggleFavorite: (id: number) => void | undefined;
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (item: FoodItem) => void;
  selectedItems: FoodItem[];
  setSelectedItems: (items: FoodItem[]) => void;
  orders: any[];
  addOrder: (order: any) => void;
  setIsLoggedIn: (v: boolean) => void; 
}

export const Context = React.createContext<ContextType | null>(null);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [food_pictures, setFoodPictures] = useState<FoodItem[]>([]);

  // { id: 0, name: "ADOBO", img: "/example-foods/adobo.png", price: 120, alt: "adobo pic", type: "food", favorite: false, quantity: 0, partner: "SpotG"},
  //   { id: 1, name: "COFFEE", img: "/example-foods/coffee.png", price: 130, alt: "coffee pic", type: "water", favorite: false, quantity: 0, partner: "360 Coffee" },
  //   { id: 2, name: "FRIED BUFALO", img: "/example-foods/fried-bufalo.png", price: 124, alt: "fried buffalo pic", type: "food", favorite: false, quantity: 0, partner: "SpotG" },
  //   { id: 3, name: "FRIED CHICKEN", img: "/example-foods/fried-chicken.png", price: 90, alt: "fried chicken pic", type: "food", favorite: false, quantity: 0, partner: "SpotG" },
  //   { id: 4, name: "MILK TEA", img: "/example-foods/milk-tea.png", price: 90, alt: "milk tea pic", type: "water", favorite: false, quantity: 0 , partner: "360 Coffee"},
  //   { id: 5, name: "SIOMAI RICE", img: "/example-foods/siomai-rice.png", price: 90, alt: "siomai rice pic", type: "food", favorite: false, quantity: 0, partner: "Theatry Eats"},
  //   { id: 6, name: "FRIES", img: "/example-foods/potato-corner.png", price: 90, alt: "potato corner pic", type: "food", favorite: false, quantity: 0, partner: "Potato Corner" },
  //   { id: 7, name: "LUGAW", img: "/example-foods/lugaw.png", price: 90, alt: "lugaw pic", type: "food", favorite: false, quantity: 0, partner: "Theatry Eats"},
  //   { id: 8, name: "TINOLA", img: "/example-foods/tinola.png", price: 90, alt: "tinola pic", type: "water", favorite: false, quantity: 0, partner: "SpotG"},

  const [cart, setCart] = useState<FoodItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // <-- Prototype login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
useEffect(() => {
  const fetchProducts = async () => {
    const res = await fetch("http://127.0.0.1:8000/products");
    const data = await res.json();

    const formatted = data.map((p: any) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      alt: p.name,
      type: " ",
      favorite: false,
      quantity: 0,
      partner: "Unknown"
    }));
    console.log(formatted)
    setFoodPictures(formatted);
  };

  fetchProducts();
}, []);

console.log(cart)
  // ---------------- CART ------------------
  const addToCart = (item: FoodItem, quantity: number = 1) => {
    setCart(prev => {
      const index = prev.findIndex(p => p.id === item.id);

      if (index !== -1) {
        const updated = [...prev];
        const newQuantity = Math.max(updated[index].quantity + quantity, 1);

        updated[index] = {
          ...updated[index],
          quantity: newQuantity
        };

        return updated;
      }

      if (quantity > 0) {
        return [...prev, { ...item, quantity }];
      }

      return prev;
    });
  };

  const removeFromCart = (item: FoodItem) => {
    setCart(prev => prev.filter(p => p.id !== item.id));
  };

  // --------------- FAVORITES -----------------
  const toggleFavorite = (id: number) => {
    setFoodPictures(prev =>
      prev.map(food =>
        food.id === id ? { ...food, favorite: !food.favorite } : food
      )
    );
  };

  const addOrder = (order: any) => {
    setOrders(prev => [...prev, order]);
    setCart([]);
  };

  // ---------- Prototype Login Handler ----------
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((username === "24-08955" && password === "1234") || (username === "24" && password==="1")) {
      setIsLoggedIn(true); // just prototype
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Context.Provider
          value={{
            food_pictures,
            cart,
            toggleFavorite,
            addToCart,
            removeFromCart,
            selectedItems,
            setSelectedItems,
            orders,
            addOrder,
            setIsLoggedIn,
          }}
        >
          <ToastProvider>
            {!isLoggedIn ? (
  <div className="flex justify-center items-center h-screen w-full">
    <div className="flex w-4/5 max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Left: Image */}
      <div className="w-1/2 hidden md:block">
        <img
          src="/bsu.jpg" // Replace with any image you want
          alt="Food"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right: Login Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h2 className="text-2xl mb-6 font-bold text-center">Login</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col space-y-4"
        >
          <input
            type="text"
            placeholder="SR-Code"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-main-red text-white cursor-pointer py-2 rounded w-full hover:bg-red-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  </div>
): (
    <section className="flex">
    <Sidebar />
    <div className="w-full">
      <Navbar />
      {children}
    </div>
  </section>
)}


          </ToastProvider>
        </Context.Provider>
      </body>
    </html>
  );
}
