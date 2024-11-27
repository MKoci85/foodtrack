import { ProductsWithCategory } from "@/app/admin/products/page"
import { formatCurrency } from "@/src/utils"
import Link from "next/link"
import { Edit } from 'lucide-react'

type ProductTableProps = {
    products: ProductsWithCategory
}

export default function ProductTable({products}: ProductTableProps) {
    return (
        <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">
                            Producto
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                            Precio
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                            Categoría
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800">
                    {products.map(product => (
                        <tr key={product.id} className="hover:bg-gray-700 transition-colors duration-200">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-6">
                                {product.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {formatCurrency(product.price)}
                            </td> 
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                {product.category.name}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <Link
                                    href={`/admin/products/${product.id}/edit`}
                                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center justify-end"
                                >
                                    <Edit size={18} className="mr-1" />
                                    Editar
                                    <span className="sr-only">, {product.name}</span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}