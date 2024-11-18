'use client'

import { useStore } from "@/src/store"
import { OrderItem } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Montserrat } from 'next/font/google'
import { useMemo } from "react"

const montserrat = Montserrat({ subsets: ['latin'] })

type ProductDetailsProps = {
    item: OrderItem
}

const MIN_ITEMS = 1
const MAX_ITEMS = 15

export default function ProductDetails({item}: ProductDetailsProps) {

    const increaseQuantity = useStore((state) => state.increaseQuantity)
    const decreaseQuantity = useStore((state) => state.decreaseQuantity)
    const removeItem = useStore((state) => state.removeItem)
    const disabledDecreaseButton = useMemo(() => item.quantity === MIN_ITEMS, [item])
    const disabledIncreaseButton = useMemo(() => item.quantity === MAX_ITEMS, [item])

  return (
    <div className={`${montserrat.className} bg-gray-800 text-gray-100 rounded-lg shadow-lg p-6 space-y-4`}>
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                    {item.name}
                </p>
                <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                    <XMarkIcon className="h-6 w-6"/>
                </button>
            </div>
            <p className="text-2xl font-black text-purple-400">
                {formatCurrency(item.price)}
            </p>
            <div className="flex items-center gap-4 bg-gray-700 w-fit rounded-lg p-2">
                <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={disabledDecreaseButton}
                    className="text-gray-300 hover:text-white disabled:opacity-20 transition-colors duration-200"
                >
                    <MinusIcon className="h-5 w-5"/>
                </button>
                <p className="text-lg font-bold px-2">
                    {item.quantity}
                </p>
                <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    disabled={disabledIncreaseButton}
                    className="text-gray-300 hover:text-white disabled:opacity-20 transition-colors duration-200"
                >
                    <PlusIcon className="h-5 w-5"/>
                </button>
            </div>
            <p className="text-xl font-bold text-gray-300">
                Subtotal: {''}
                <span className="font-normal text-white"> 
                    {formatCurrency(item.subtotal)}
                </span>
            </p>
        </div>
    </div>
  )
}