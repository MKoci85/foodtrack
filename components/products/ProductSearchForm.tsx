'use client'
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { Search } from 'lucide-react'

export default function ProductSearchForm() {
    const router = useRouter()

    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = SearchSchema.safeParse(data)

        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }

    return (
        <form action={handleSearchForm} className="flex items-center">
            <div className="relative flex-grow">
                <input 
                    type="text"
                    placeholder="Buscar Producto"
                    className="w-full p-3 pr-10 bg-gray-800 text-gray-100 placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    name="search"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button 
                type="submit"
                className="bg-purple-600 p-3 text-white uppercase font-bold rounded-r-lg hover:bg-purple-700 transition-colors duration-200"
            >
                Buscar
            </button>
        </form>
    )
}