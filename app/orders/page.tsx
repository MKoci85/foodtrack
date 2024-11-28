'use client'

import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import LatestOrderItem from "@/components/order/LatestOrderItem";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ClipboardCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function OrdersPage() {
    const url = '/orders/api';
    const fetcher = () => fetch(url).then(res => res.json()).then(data => data);
    const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    });

    const [columns, setColumns] = useState(2);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) setColumns(1);
            else if (width < 1024) setColumns(2);
            else if (width < 1536) setColumns(3);
            else setColumns(4);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="h-screen bg-gray-900 text-gray-100 p-4 flex flex-col">
            <div className="flex flex-col items-center mb-8">
                    <Logo/>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse">
                        Órdenes Listas
                    </h1>
                </div>

            {isLoading ? (
                <div className="flex-grow flex justify-center items-center">
                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
            ) : data && data.length > 0 ? (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`grid gap-4 flex-grow overflow-auto`}
                        style={{ 
                            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                            gridAutoRows: 'min-content'
                        }}
                    >
                        {data.map(order => (
                            <LatestOrderItem key={order.id} order={order} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-grow flex flex-col items-center justify-center bg-gray-800 rounded-lg"
                >
                    <ClipboardCheck className="w-16 h-16 text-gray-600 mb-4" />
                    <p className="text-2xl text-gray-400">No hay órdenes listas</p>
                </motion.div>
            )}
        </div>
    );
}