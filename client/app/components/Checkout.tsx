import { motion } from "framer-motion"
export default function Checkout(handleCheckout:any){
    return(
        <motion.button
            className="bg-main-red text-white px-6 py-2 rounded-lg font-semibold cursor-pointer hover:bg-red-600 transition"
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckout}
          >
            Checkout
          </motion.button>
    )
}