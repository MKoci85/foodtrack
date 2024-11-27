import AdminSidebar from "@/components/admin/AdminSidebar";
import ToastNotification from "@/components/ui/ToastNotification";
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${montserrat.className} bg-gray-900 text-gray-100 min-h-screen flex flex-col md:flex-row`}>
            <aside className="md:w-72 bg-gray-800 border-r border-gray-700">
                <AdminSidebar />
            </aside>

            <main className="flex-1 overflow-auto">
                <div className="container mx-auto px-4 py-8">
                    {children}
                </div>
            </main>

            <ToastNotification />
        </div>
    )
}