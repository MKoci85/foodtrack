'use client'

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {
    
    const addToOrder = useStore((state) => state.addToOrder)
  return (
    <button
            type="button"
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full font-bold transition-colors duration-300"
            onClick={() => addToOrder(product)}
          >
            Agregar al carrito
          </button>
  )
}
