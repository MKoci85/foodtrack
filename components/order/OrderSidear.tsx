import { prisma } from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

async function getCategories() {
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {
  const categories = await getCategories()

  return (
    <aside className={`md:w-72 md:h-screen bg-gray-800 text-gray-100 ${montserrat.className}`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Categorías
        </h2>
        <nav>
          <ul className="space-y-4">
            {categories.map(category => (
              <li key={category.id}>
                <CategoryIcon category={category} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}