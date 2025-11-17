'use client';

import { useContext } from "react";
import { Context } from "../layout";
import Image from "next/image";
import Link from "next/link";

export default function PartnersPage() {
  const ctx = useContext(Context);

  if (!ctx) return null;

  const { food_pictures } = ctx;

  // 🔥 GET ALL UNIQUE PARTNERS
  const partners = [...new Set(food_pictures.map(item => item.partner))];

  return (
    <main>
      <h1 className="text-xl font-bold mb-4">Our Partners</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.length > 0 ? (
          partners.map((food:any) => {
            const original_index = food_pictures.indexOf(food)
            return (
            <Link href={`/chosen_food/${original_index}`} key={original_index}>
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
                  <span className="text-lg text-main-red">₱{food.price}</span>
                </div>
              </div>
            </Link>
          )})
        ) : (
          <p className="text-gray-500 col-span-full text-center text-lg">
            No food found.
          </p>
        )}
      </div>
    </main>
  );
}
