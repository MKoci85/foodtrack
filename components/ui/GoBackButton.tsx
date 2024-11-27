'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function GoBackButton() {

    const router = useRouter()

  return (
    <button
    onClick={() => router.back()}
    className=" bg-gray-700 text-gray-200 font-bold p-2 rounded-2xl w-40 hover:bg-gray-700 hover:scale-110 transition-colors duration-200 group shadow-md shadow-gray-400 flex items-center justify-center"
>
    <ArrowLeft size={24} /> Volver
</button>
  )
}
