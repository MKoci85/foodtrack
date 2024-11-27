import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })
    return product
}

export default async function EditProductsPage({params}: {params: {id: string}}) {
    const product = await getProductById(+params.id)
    if(!product) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center ">
                    <Heading>
                        Editar Producto
                    </Heading>
                    <GoBackButton />
                </div>
                
                <EditProductForm>
                    <ProductForm 
                        product={product}
                    />
                </EditProductForm>
                
            </div>
        </div>
    )
}