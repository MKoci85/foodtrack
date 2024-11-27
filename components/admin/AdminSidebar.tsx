import Logo from "../ui/Logo"
import AdminRoute from "./AdminRoute"
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

const adminNavigation = [
    {url: '/admin/orders', text: 'Órdenes', icon: 'ClipboardList', blank: false},
    {url: '/admin/products', text: 'Productos', icon: 'Package', blank: false},
    {url: '/order/cafe', text: 'Ver Quiosco', icon: 'Coffee', blank: true},
]

export default function AdminSidebar() {
    return (
        <aside className={`${montserrat.className} bg-gray-900 text-gray-100 h-screen w-64 flex flex-col`}>
            <div className="p-6">
                <Logo />
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <nav className="space-y-2">
                    {adminNavigation.map(link => (
                        <AdminRoute 
                            key={link.url}
                            link={link}
                        />
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t border-gray-800">
                <p className="text-sm text-gray-400">© 2024 Tu Empresa</p>
            </div>
        </aside>
    )
}