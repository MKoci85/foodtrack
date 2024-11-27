import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include:{
            category: true
        }
    })
    return products
}

export default async function SearchPage({searchParams}: {searchParams: {search: string}}) {
    const products = await searchProducts(searchParams.search)

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
            <Heading>
                Resultados de Búsqueda: {searchParams.search}
            </Heading>
            <div className="mb-8">
                <ProductSearchForm />
            </div>
            {products.length ? (
                <ProductTable products={products} />
            ) : (
                <p className="text-gray-400 text-center text-lg">No se encontraron resultados para tu búsqueda.</p>
            )}
        </div>
    )
}