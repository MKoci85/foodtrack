'use client'

import { useState } from 'react'
import { formatCurrency } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from './AddProductButton'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image 
          width={400}
          height={500}
          src={`/products/${product.image}.jpg`}
          alt={`Imagen platillo ${product.name}`}
          priority
          className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-110"
        />
        <div className={`absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            type="button"
            className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-300"
          >
            Ver detalles
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-100 mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-black text-purple-400">{formatCurrency(product.price)}</p>
          <AddProductButton 
            product={product}
          />
        </div>
      </div>
    </div>
  )
}