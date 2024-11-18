'use client'

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { Montserrat } from 'next/font/google'
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

const montserrat = Montserrat({ subsets: ['latin'] })

export default function OrderSummary() {
  const order = useStore((state) => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name')
    }
    const result = OrderSchema.safeParse(data)
    
    if(!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }
    
    const response = await createOrder(data)
    if(response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
    }
  }

  return (
    <aside className={`${montserrat.className} lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-6 bg-gray-900 text-gray-100`}>
      <h1 className="text-3xl text-center font-extrabold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Resumen del Pedido
      </h1>

      {order.length === 0 ? (
        <p className="text-center my-10 text-gray-400 italic">
          El pedido está vacío
        </p>
      ) : (
        <div className="mt-5 space-y-6">
          {order.map(item => (
            <ProductDetails 
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}

      {order.length > 0 && (
        <div>
          <div className="mt-8 pt-6 border-t border-gray-700">
            <form
              className="w-full space-y-5"
              action={handleCreateOrder}
            >
              <input 
                type="text"
                placeholder="Tu Nombre"
                autoComplete="off"
                autoFocus
                className="bg-white border border-gray-100 p-2 w-full"
                name="name"
              />
              <input 
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 text-white font-bold rounded-lg cursor-pointer hover:bg-purple-700 transition-colors duration-200"
                value="Confirmar Pedido"
              />
            </form>
          </div>
          <p className="text-2xl mt-10 text-center">Total a pagar: {' '}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
          
      </div>
      )}

      
    </aside>
  )
}