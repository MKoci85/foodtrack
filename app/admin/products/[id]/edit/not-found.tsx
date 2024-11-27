import Heading from "@/components/ui/Heading";
import Link from "next/link";
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <FileQuestion size={100} className="text-purple-400 mb-8" />
      <Heading>
        Producto no encontrado
      </Heading>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Lo sentimos, no pudimos encontrar el producto que estás buscando. Puede que haya sido eliminado o que la URL sea incorrecta.
      </p>
      <Link
        href="/admin/products"
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-bold cursor-pointer transition-colors duration-200 flex items-center"
      >
        <ArrowLeft className="mr-2" size={20} />
        Volver a Productos
      </Link>
    </div>
  )
}