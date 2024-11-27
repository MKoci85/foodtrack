import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        const { categoryId, image, ...data } = product

        let order: OrderItem[] = []
        const existingItem = get().order.find(item => item.id === data.id);
        if (existingItem) {
            if (existingItem.quantity < 15) {
                order = get().order.map(item => item.id === product.id ? {
                    ...item,
                    quantity: item.quantity + 1,
                    subtotal: item.price * (item.quantity + 1)
                } : item);
            } else {
                return;
            }
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        set(() => ({
            order
        }))
        
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map( item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item )
        }))
    },
    decreaseQuantity: (id) => {
        set(() => ({
            order: get().order.map( item => item.id === id && item.quantity >= 2 ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.quantity - 1)
            } : item )
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))