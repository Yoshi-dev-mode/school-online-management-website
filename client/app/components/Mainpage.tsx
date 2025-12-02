'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function Mainpage() {
  const [foodPictures, setFoodPictures] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | string>("All");
  const [loading, setLoading] = useState(true);

  // Fetch products from FastAPI backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/products");
        const data: Product[] = await res.json();
        setFoodPictures(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Optional: poll backend every 5 seconds for live updates
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  // Compute unique categories from backend products
  const categories = ["All", ...Array.from(new Set(foodPictures.map(p => p.category)))];

  // Filter foods based on search and category
  const filteredFoods = foodPictures.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || food.category === category;
    return matchesSearch && matchesCategory;
  });
  console.log(filteredFoods)

  if (loading) return <p className="text-center text-lg mt-10">Loading foods...</p>;

  return (
    <section>
      {/* Header */}
      <div className="flex items-center mb-4">
        <Image src="/shopping-bag.png" height={30} width={30} alt="shopping bag" />
        <h1 className="ml-3 text-xl font-semibold">Order Now!</h1>
      </div>

      {/* Categories + Search Bar */}
      <section className="flex justify-between items-center py-5">
        <div className="flex text-gray-700 gap-4">
          {categories.map((cat) => (
            <h3
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                category === cat ? "bg-red-50 text-main-red border-main-red" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat}
            </h3>
          ))}
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
          filteredFoods.map((food) => (
            <Link href={`/chosen_food/${food.id}`} key={food.id}>
              <div className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                <img
                  src={food.image}
                  alt={food.name}
                  className="object-cover transition duration-500 group-hover:brightness-30"
                  height={350}
                  width={350}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition duration-500">
                  <span className="text-2xl">{food.name}</span>
                  <span className="text-lg text-main-red">₱{food.price}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center text-lg">No food found.</p>
        )}
      </div>
    </section>
  );
}
