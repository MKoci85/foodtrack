'use client'

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Category } from "@prisma/client"

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category} : CategoryIconProps) {
  const params = useParams<{category: string}>()
  const isActive = category.slug === params.category

  return (
    <Link href={`/order/${category.slug}`} className="block">
      <div className={`
        ${isActive ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'}
        flex items-center gap-4 w-full p-4 rounded-lg transition-colors duration-200
      `}>
        <div className="w-12 h-12 relative flex-shrink-0">
          <Image 
            fill
            src={`/icon_${category.slug}.svg`}
            alt={`Icono de ${category.name}`}
            className={`${isActive ? 'filter saturate-200' : ''}`}
          />
        </div>
        <span className="text-lg font-medium">{category.name}</span>
      </div>
    </Link>
  )
}