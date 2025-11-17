'use client'

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import React, { useState } from "react";
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
  img: string;
  price: number;
  alt: string;
  type: string;
  favorite: boolean;
  quantity: number;
}

interface ContextType {
  food_pictures: FoodItem[];
  cart: FoodItem[];
  toggleFavorite: (id: number) => void;
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (item: FoodItem) => void;
  selectedItems: FoodItem[];
  setSelectedItems: (items: FoodItem[]) => void;
  orders: any[];
  addOrder: (order: any) => void;
}

export const Context = React.createContext<ContextType | null>(null);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [food_pictures, setFoodPictures] = useState<FoodItem[]>([
    { id: 0, name: "ADOBO", img: "/example-foods/adobo.png", price: 120, alt: "adobo pic", type: "food", favorite: false, quantity: 0 },
    { id: 1, name: "COFFEE", img: "/example-foods/coffee.png", price: 130, alt: "coffee pic", type: "water", favorite: false, quantity: 0 },
    { id: 2, name: "FRIED BUFALO", img: "/example-foods/fried-bufalo.png", price: 124, alt: "fried buffalo pic", type: "food", favorite: false, quantity: 0 },
    { id: 3, name: "FRIED CHICKEN", img: "/example-foods/fried-chicken.png", price: 90, alt: "fried chicken pic", type: "food", favorite: false, quantity: 0 },
    { id: 4, name: "MILK TEA", img: "/example-foods/milk-tea.png", price: 90, alt: "milk tea pic", type: "water", favorite: false, quantity: 0 },
    { id: 5, name: "SIOMAI RICE", img: "/example-foods/siomai-rice.png", price: 90, alt: "siomai rice pic", type: "food", favorite: false, quantity: 0 },
    { id: 6, name: "FRIES", img: "/example-foods/potato-corner.png", price: 90, alt: "potato corner pic", type: "food", favorite: false, quantity: 0 },
    { id: 7, name: "LUGAW", img: "/example-foods/lugaw.png", price: 90, alt: "lugaw pic", type: "food", favorite: false, quantity: 0 },
    { id: 8, name: "TINOLA", img: "/example-foods/tinola.png", price: 90, alt: "tinola pic", type: "water", favorite: false, quantity: 0 },
  ]);

  const [cart, setCart] = useState<FoodItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  // ---------------- CART ------------------
  const addToCart = (item: FoodItem, quantity: number) => {
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
    setCart([])
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
            addOrder
          }}
        >
          <ToastProvider>
            <section className="flex">
              <Sidebar />
              <div className="w-full">
                <Navbar />
                {children}
              </div>
            </section>
          </ToastProvider>
        </Context.Provider>
      </body>
    </html>
  );
}
