'use client'

import { createProduct } from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { Save } from 'lucide-react'

export default function AddProductForm({children}: {children: React.ReactNode}) {
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        const result = ProductSchema.safeParse(data)
        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        const response = await createProduct(result.data)
        if(response?.errors){
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        toast.success('Producto creado correctamente')
        router.push('/admin/products')
    }

  return (
    <div className="bg-gray-800 mt-10 px-8 py-10 rounded-lg shadow-lg max-w-3xl mx-auto">
        <form 
            className="space-y-6"
            action={handleSubmit}
        >
            {children}
            <button 
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white w-full mt-6 p-3 rounded-lg uppercase font-bold cursor-pointer transition-colors duration-200 flex items-center justify-center"
            >
                <Save className="mr-2" size={20} />
                Registrar Producto
            </button>
        </form>
    </div>
  )
}