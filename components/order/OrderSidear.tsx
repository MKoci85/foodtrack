import { prisma } from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon'
import { Montserrat } from 'next/font/google'
import Logo from '../ui/Logo'

const montserrat = Montserrat({ subsets: ['latin'] })

async function getCategories() {
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {
  const categories = await getCategories()

  return (
    <aside className={`md:w-72 md:h-screen bg-gray-800 text-gray-100 ${montserrat.className}`}>
      <div className="p-6">
        <Logo />
        <nav className='mt-10'>
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