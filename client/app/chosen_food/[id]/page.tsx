'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useContext, use } from "react";
import { motion } from "framer-motion";
import { Context } from "@/app/layout";
import { useToast } from "@/app/components/Toast";

export default function ({ params }: any) {
  const { food_pictures, addToCart, favorites, toggleFavorite } = useContext(Context)!;
  const { id }: any = use(params);
  const index = parseInt(id);
  const { showToast } = useToast();

  if (isNaN(index) || index < 0 || index >= food_pictures.length) {
    return <div>Food not found.</div>;
  }

  const food = food_pictures[index];
  const [quantity, setQuantity] = useState(1);

  const totalPrice = quantity * parseInt(food.price.replace("₱", ""));
  const isFavorite = food.favorite;


  const handleAddToCart = () => {
    addToCart({ ...food, quantity });
    showToast("Successfully added to cart!", "green");
  };

  return (
    <section className="flex flex-col justify-center items-center chosen-foods-height relative w-full">
      <section className="flex flex-col w-full max-w-4xl">
        {/* Main card */}
        <div className="p-5 flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-lg w-full relative">

          {/* Favorite Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => {
            toggleFavorite(food.id);
            showToast(
              isFavorite ? "Removed from favorites!" : "Added to favorites!",
              isFavorite ? "red" : "green"
            );
          }}
            className="absolute top-5 right-5"
          >
            <Image
              src={isFavorite ? "/heart-filled.png" : "/heart.png"}
              alt="Favorite"
              width={30}
              height={30}
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
            />
          </motion.button>

          {/* Food Image */}
          <div className="md:w-1/2">
            <Image
              src={food.img}
              alt={food.alt}
              width={600}
              height={400}
              className="rounded-xl object-cover"
            />
          </div>

          {/* Food Info */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span>🍴</span> Cananimus Inc.
              </p>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mt-6">
              <button
                className="cursor-pointer border border-main-red text-main-red px-4 py-2 rounded-lg hover:bg-red-50 transition"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>

              {/* Quantity Control */}
              <div className="flex items-center border rounded-lg px-3 py-1">
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-xl px-2 cursor-pointer"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </motion.button>

                <motion.span
                  key={quantity}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="px-3"
                >
                  {quantity}
                </motion.span>

                <motion.button
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-xl px-2 cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </motion.button>
              </div>

              <div className="ml-auto font-semibold text-lg">
                Total: <span className="text-red-500">₱{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-main-red font-medium transition-all duration-300 group"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <Image loading="lazy" src="/right.png" height={30} width={30} alt="Back to home" />
            </span>
            <span className="opacity-0 ml-3 group-hover:opacity-100 transition-opacity duration-300">
              Back to Home
            </span>
          </Link>
        </div>
      </section>
    </section>
  );
}
