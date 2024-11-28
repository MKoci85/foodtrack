import { prisma } from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload"
import { Package, DollarSign, Tag } from 'lucide-react'
import { Product } from "@prisma/client"

async function getCategories(){
    return await prisma.category.findMany()
}

type ProductFormProps = {
    product?: Product
}

export default async function ProductForm({product}: ProductFormProps) {
    const categories = await getCategories()

    return (
        <div className="space-y-6 relative pb-16">
             
            <div className="space-y-2">
                <label
                    className="text-gray-200 flex items-center"
                    htmlFor="name"
                >
                    <Package className="mr-2" size={20} />
                    Nombre:
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="block w-full p-3 bg-gray-700 text-gray-50 rounded-md focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    placeholder="Nombre Producto"
                    defaultValue={product?.name}
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-gray-200 flex items-center"
                    htmlFor="price"
                >
                    <DollarSign className="mr-2" size={20} />
                    Precio:
                </label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    className="block w-full p-3 bg-gray-700 text-gray-50 rounded-md focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    placeholder="Precio Producto"
                    defaultValue={product?.price}
                />
            </div>

            <div className="space-y-2">
                <label
                    className="text-gray-200 flex items-center"
                    htmlFor="categoryId"
                >
                    <Tag className="mr-2" size={20} />
                    Categoría:
                </label>
                <select
                    className="block w-full p-3 bg-gray-700 text-gray-50 rounded-md focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    id="categoryId"
                    name="categoryId"
                    defaultValue={product?.categoryId}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <ImageUpload 
                image={product?.image}
            />
        </div>
    )
}