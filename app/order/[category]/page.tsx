import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

export default async function OrderPage({ params }: { params: { category: string } }) {
  const awaitedParams = await params;
  const products = await getProducts(awaitedParams.category)

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-100 p-8 ${montserrat.className}`}>
      <Heading>
        Elige y personaliza tu pedido
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="opacity-0 animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}