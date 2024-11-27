import { redirect } from "next/navigation";
import Pagination from "@/components/products/Pagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import { Plus } from 'lucide-react';

async function productCount() {
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1 ) * pageSize
  const products = prisma.product.findMany({
    take: 10,
    skip,
    include: {
      category: true
    }
  })
  return products
} 

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams}: { searchParams: {page: string}}) {
  const page = +searchParams.page || 1
  const pageSize = 10
  if(page < 0) redirect('/admin/products')

  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()

  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if (page > totalPages) redirect('/admin/products')

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <Heading>
        Administrar Productos
      </Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5 mb-8">
        <Link
          href={'/admin/products/new'}
          className="bg-purple-600 text-white w-full lg:w-auto text-lg px-6 py-3 rounded-lg font-bold cursor-pointer hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
        >
          <Plus className="mr-2" size={20} />
          Crear Producto
        </Link>
        <ProductSearchForm />
      </div>

      <ProductTable 
        products={products}
      />

      <Pagination 
        page={page}
        totalPages={totalPages}
      />
    </div>
  )
}