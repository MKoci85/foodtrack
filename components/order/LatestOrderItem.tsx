import { OrderWithProducts } from "@/src/types";
import { motion } from "framer-motion";
import { User, Package } from 'lucide-react';

type LatestOrderItemProps = {
    order: OrderWithProducts;
};

export default function LatestOrderItem({ order }: LatestOrderItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col h-[calc(100vh/3-1rem)] overflow-hidden"
        >
            <div className="flex items-center space-x-2 pb-2 border-b border-gray-700 mb-2">
                <User className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-bold text-white truncate">
                    {order.name}
                </h2>
            </div>
            <ul className="space-y-2 overflow-auto flex-grow scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {order.orderProducts.map(product => (
                    <li
                        key={product.id}
                        className="flex items-center space-x-2 text-gray-300"
                    >
                        <Package className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {product.product.name}
                            </p>
                            <p className="text-xs text-gray-400">
                                Cantidad: {product.quantity}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}