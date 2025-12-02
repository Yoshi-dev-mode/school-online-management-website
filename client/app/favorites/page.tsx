'use client'
import Image from "next/image"
import { useState } from "react"
import Link from "next/link";
import { useContext } from "react";
import { Context } from "../layout"


export default function Favorites(){
    const [search, setSearch] = useState("");
    const {food_pictures}:any = useContext(Context) || [];

    // 1. First filter for favorites (favorite: true)
    const favoriteFoods = food_pictures.filter((food:any) => food.favorite === true);

    // 2. Then apply search filtering
    const filteredFoods = favoriteFoods.filter((food:any) =>
        food.name.toLowerCase().includes(search.toLowerCase())
    );
    return(
        <main>
            <div className="flex items-center mb-4">
                <Image src="/heart.png" height={30} width={30} alt="favorites icon" />
                <h1 className="ml-3 text-xl md:text-2xl font-semibold">Favorites</h1>
            </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food:any, i:number) => (
            <Link href={`/chosen_food/${i}`} key={i}>
              <div
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
              
                <img
                  src={food.image}
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
            No favorite food found.
          </p>
        )}
      </div>

        </main>
    )
}