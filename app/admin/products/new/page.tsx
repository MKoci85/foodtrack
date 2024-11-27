import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { Plus } from 'lucide-react';

export default function NewProduct() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <Heading>
        <Plus className="mr-2" size={32} />
        Nuevo Producto
      </Heading>
      <div className="justify-center flex">
        <GoBackButton />
      </div>
      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </div>
  )
}