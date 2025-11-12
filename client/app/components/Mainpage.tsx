'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const food_pictures = [
  { name: "ADOBO", img: "/example-foods/adobo.png", price: "₱120", alt: "adobo pic", type:"food"},
  { name: "COFFEE", img: "/example-foods/coffee.png", price: "₱130", alt: "coffee pic", type:"water"},
  { name: "FRIED BUFALO", img: "/example-foods/fried-bufalo.png", price: "₱124", alt: "fried buffalo pic", type:"food"},
  { name: "FRIED CHICKEN", img: "/example-foods/fried-chicken.png", price: "₱90", alt: "fried chicken pic", type:"food"},
  { name: "MILK TEA", img: "/example-foods/milk-tea.png", price: "₱90", alt: "milk tea pic", type:"water"},
  { name: "SIOMAI RICE", img: "/example-foods/siomai-rice.png", price: "₱90", alt: "siomai rice pic", type:"food"},
  { name: "FRIES", img: "/example-foods/potato-corner.png", price: "₱90", alt: "potato corner pic", type:"food"},
  { name: "LUGAW", img: "/example-foods/lugaw.png", price: "₱90", alt: "lugaw pic", type:"food"},
  { name: "TINOLA", img: "/example-foods/tinola.png", price: "₱90", alt: "tinola pic", type:"water"},
];


export default function Mainpage() {
  const [search, setSearch] = useState("");

  // ✅ Filter list based on search input
  const filteredFoods = food_pictures.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="flex flex-col justify-center w-full ">
      {/* Header */}
      <div className="flex items-center">
        <Image src="/shopping-bag.png" height={30} width={30} alt="shopping bag" />
        <h1 className="ml-3 text-xl font-semibold">Order Now!</h1>
      </div>

      {/* Categories + Search Bar */}
      <section className="flex justify-between items-center py-5">
        <div className="flex text-gray-700">
          <h3 className="pr-5 cursor-pointer hover:text-main-red">Popular</h3>
          <h3 className="px-5 cursor-pointer hover:text-main-red">Drinks</h3>
          <h3 className="px-5 cursor-pointer hover:text-main-red">Foods</h3>
          <h3 className="px-5 cursor-pointer hover:text-main-red">Desserts</h3>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-80 px-4 py-2 text-gray-800 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, i) => (
            <Link href={`/chosen_food/${i}`} key={i}>
              <div
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
              
                <Image
                  src={food.img}
                  alt={food.alt}
                  className="object-cover transition duration-500 group-hover:brightness-30"
                  height={350}
                  width={350}
                  
                />

                {/* Overlay with Name + Price */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition duration-500" >
                  <span className="text-2xl">{food.name}</span>
                  <span className="text-lg text-main-red">{food.price}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center text-lg">
            No food found.
          </p>
        )}
      </div>
    </section>
  );
}
