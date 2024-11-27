import Link from "next/link";
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
    page: number
    totalPages: number
}

export default function Pagination({page, totalPages}: PaginationProps) {
    const maxVisiblePages = 5;
    const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    const visiblePages = Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);

    return (
        <nav className="flex justify-center items-center space-x-2 py-8" aria-label="Pagination">
            {page > 1 && (
                <Link
                    href={`/admin/products?page=${page - 1}`}
                    className="relative inline-flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:z-20 focus:outline-offset-0 focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Link>
            )}

            {visiblePages.map(currentPage => (
                <Link
                    href={`/admin/products?page=${currentPage}`}
                    key={currentPage}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md focus:z-20 focus:outline-offset-0 focus:ring-2 focus:ring-purple-500 transition-colors duration-200
                        ${page === currentPage 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    aria-current={page === currentPage ? "page" : undefined}
                >
                    {currentPage}
                </Link>
            ))}

            {page < totalPages && (
                <Link
                    href={`/admin/products?page=${page + 1}`}
                    className="relative inline-flex items-center rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:z-20 focus:outline-offset-0 focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                    aria-label="Next page"
                >
                    <ChevronRight className="h-5 w-5" />
                </Link>
            )}
        </nav>
    )
}