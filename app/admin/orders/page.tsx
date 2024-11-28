import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import { ClipboardList } from 'lucide-react'
import { revalidatePath } from 'next/cache'

async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return orders
}

export default async function OrdersPage() {
  const orders = await getPendingOrders()

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <Heading >
        <ClipboardList className="mr-2" size={32} />
        Administrar Órdenes
      </Heading>

      <form
        action={async () => {
          'use server'
          revalidatePath('/admin/orders')
        }}
      >
        <input 
          type='submit'
          value='Actualizar Ordenes'
          className="bg-purple-600 text-white w-full lg:w-auto text-lg px-6 py-3 rounded-lg font-bold cursor-pointer hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center"
        />
      </form>

      {orders.length ? (
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 mt-8'>
          {orders.map(order => (
            <OrderCard 
              key={order.id}
              order={order}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <p className='text-xl text-gray-400'>No hay órdenes pendientes</p>
        </div>
      )}
    </div>
  )
}