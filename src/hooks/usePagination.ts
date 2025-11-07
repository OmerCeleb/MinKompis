// src/hooks/usePagination.ts
import { useState, useMemo } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number = 12) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return items.slice(startIndex, endIndex);
    }, [items, currentPage, itemsPerPage]);

    const goToPage = (page: number) => {
        const validPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(validPage);
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    const goToFirstPage = () => goToPage(1);
    const goToLastPage = () => goToPage(totalPages);

    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    return {
        currentItems,
        currentPage,
        totalPages,
        totalItems: items.length,
        itemsPerPage,
        goToPage,
        nextPage,
        previousPage,
        goToFirstPage,
        goToLastPage,
        hasNextPage,
        hasPreviousPage,
        startIndex: (currentPage - 1) * itemsPerPage + 1,
        endIndex: Math.min(currentPage * itemsPerPage, items.length)
    };
}
