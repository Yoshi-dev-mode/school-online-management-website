'use client'

import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { Context } from "../layout";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";


export default function CartPage() {
  const context = useContext(Context);
  if (!context) return null;

  const { cart, removeFromCart, addToCart} = context;

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckbox = (itemName: string) => {
    setCheckedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setCheckedItems([]);
    } else {
      setCheckedItems(cart.map(item => item.name));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (cart.length === 0) setSelectAll(false);
    else if (checkedItems.length === cart.length) setSelectAll(true);
    else setSelectAll(false);
  }, [checkedItems, cart]);

  const total = cart.reduce((sum, item) => {
    if (!checkedItems.includes(item.name)) return sum;
    const price = item.price;
    return sum + price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    const itemsToCheckout = cart.filter(item => checkedItems.includes(item.name));
    context.setSelectedItems(itemsToCheckout);
  };

  return (
    <>
      <main className="h-4/6 pb-24">
        <div className="flex items-center mb-4">
          <Image src="/shopping-cart.png" height={30} width={30} alt="shopping cart icon" />
          <h1 className="ml-3 text-xl md:text-2xl font-semibold">Order Summary</h1>
        </div>

        {cart.length > 0 ? (
          <section className="w-full space-y-4">
            <AnimatePresence>
              {cart.map((item) => {
                const price = item.price;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 p-3 rounded-lg shadow-sm bg-white"
                  >

                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-main-red cursor-pointer"
                      checked={checkedItems.includes(item.name)}
                      onChange={() => handleCheckbox(item.name)}
                    />

                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-20 h-20 rounded-lg object-cover border"
                    />

                    <div className="flex flex-col w-full">
                      <div className="flex justify-between">
                        <h2 className="font-semibold text-lg">{item.name}</h2>
                        <button onClick={() => removeFromCart(item)} className="cursor-pointer">
                          <Image src='/trash.png' alt='trash icon' width={30} height={30} />
                        </button>
                      </div>

                      <p className="text-gray-600 text-sm">{item.type}</p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <motion.button
                            className="px-3 py-1 border rounded-lg cursor-pointer"
                            onClick={() => addToCart(item, -1)}
                            whileTap={{ scale: 0.9 }}
                          >
                            -
                          </motion.button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className="font-bold"
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            className="px-3 py-1 border rounded-lg cursor-pointer"
                            onClick={() => addToCart(item, 1)}
                            whileTap={{ scale: 0.9 }}
                          >
                            +
                          </motion.button>
                        </div>

                        <div>
                          <h1 className="text-main-red font-semibold">₱{(price * item.quantity).toFixed(2)}</h1>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </section>
        ) : (
          <section className="flex flex-col justify-center items-center h-96 text-center">
            <Image src="/empty-cart.png" width={200} height={200} alt="Empty Cart" />
            <h2 className="text-2xl font-semibold mt-4 text-gray-600">Your cart is empty</h2>
            <Link
              href="/"
              className="mt-6 px-6 py-3 bg-main-red text-white rounded-lg hover:bg-red-600 transition"
            >
              Back to Menu
            </Link>
          </section>
        )}
      </main>

      {cart.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="sticky bottom-0 shadow-2xl p-4 flex justify-between items-center bg-white"
        >
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 mr-3">
              <input
                type="checkbox"
                className="h-5 w-5 accent-main-red cursor-pointer"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span className="font-medium">All</span>
            </label>

            <h2 className="text-lg font-semibold">Total: ₱{total.toFixed(2)}</h2>
          </div>
          <Link href="/mycart/checkout">
          <motion.button
            className="bg-main-red text-white px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-red-600 transition"
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
          >
            Checkout
          </motion.button>
          </Link>
        </motion.div>
      )}
    </>
  );
}
