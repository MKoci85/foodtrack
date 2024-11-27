'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Coffee, Package } from 'lucide-react';

type AdminRouteProps = {
    link: {
        url: string;
        text: string;
        icon: string;
        blank: boolean;
    }
}

const iconMap = {
    ClipboardList,
    Coffee,
    Package
};

export default function AdminRoute({link}: AdminRouteProps) {
    const pathname = usePathname()
    const isActive = pathname.startsWith(link.url)
    const Icon = iconMap[link.icon as keyof typeof iconMap];

    return (
        <Link
            className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${isActive 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
            `}
            href={link.url}
            target={link.blank ? '_blank' : ''}
        >
            {Icon && <Icon className="w-5 h-5" />}
            <span className="font-medium">{link.text}</span>
        </Link>
    )
}