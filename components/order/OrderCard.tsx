import { completeOrder } from "@/actions/complete-order-action"
import { OrderWithProducts } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { User, Package, CreditCard } from 'lucide-react'

type OrderCardProps = {
    order: OrderWithProducts
}

export default function OrderCard({ order }: OrderCardProps) {
    return (
        <section
            aria-labelledby={`order-${order.id}-heading`}
            className="rounded-lg bg-gray-800 px-6 py-8 shadow-lg space-y-6"
        >
            <form action={completeOrder}>
                <input 
                    type="hidden"
                    value={order.id}
                    name="order_id"
                />
                <button
                    type="submit"
                    className="w-full mb-6 bg-purple-500 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-bold uppercase transition-colors duration-200"
                >
                    Marcar Orden Completada
                </button>
            </form>
            <div className="flex items-center space-x-3">
                <User className="text-purple-400" size={24} />
                <h2 id={`order-${order.id}-heading`} className='text-2xl font-medium text-white'>Cliente: {order.name}</h2>
            </div>
            
            <div className="flex items-center space-x-3">
                <Package className="text-purple-400" size={24} />
                <p className='text-lg font-medium text-gray-300'>Productos Ordenados:</p>
            </div>
            
            <dl className="space-y-4">
                {order.orderProducts.map(product => (
                    <div 
                        key={product.productId}
                        className="flex items-center gap-3 border-t border-gray-700 pt-4"
                    >
                        <dt className="flex items-center text-sm text-gray-400">
                            <span className="font-bold text-purple-400">({product.quantity})</span>
                        </dt>
                        <dd className="text-sm font-medium text-gray-200">
                            {product.product.name}
                        </dd>
                    </div>
                ))}
                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                    <dt className="flex items-center space-x-2">
                        <CreditCard className="text-purple-400" size={20} />
                        <span className="text-base font-medium text-white">Total a Pagar:</span>
                    </dt>
                    <dd className="text-base font-bold text-amber-400">{formatCurrency(order.total)}</dd>
                </div>
            </dl>
        </section>
    )
}