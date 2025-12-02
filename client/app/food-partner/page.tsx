'use client';

import { useContext } from "react";
import { Context } from "../layout";
import Image from "next/image";
import Link from "next/link";

export default function PartnersPage() {
  const ctx = useContext(Context);

  if (!ctx) return null;

  const { food_pictures } = ctx;

  // 🔥 Get one food per partner
  const partnersMap = new Map<string, any>();
  food_pictures.forEach((food, index) => {
    if (!partnersMap.has(food.partner)) {
      partnersMap.set(food.partner, { ...food, original_index: index });
    }
  });

  const partners = Array.from(partnersMap.values());

  return (
    <main>
      <h1 className="text-xl font-bold mb-4">Our Partners</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {partners.length > 0 ? (
          partners.map((food) => (
            <Link href={`/`} key={food.original_index}>
              <div className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                <Image
                  src='/spotg.png' // make sure your food object has 'image' property
                  alt={food.name}
                  className="object-cover transition duration-500"
                  height={350}
                  width={350}
                />
                {/* Overlay with Name + Price */}
            
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center text-lg">
            No food found.
          </p>
        )}
      </div>
    </main>
  );
}
