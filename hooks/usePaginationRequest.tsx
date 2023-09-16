import { useState, useEffect } from 'react';
import useSWR from "swr";

import { Results } from '@/interfaces';

export const usePaginationRequest = (tableData?: 'entries' | 'expenses') => {

    const [page, setPage] = useState<number>(0);

    const handleChangePage = (event: unknown | null, newPage: number,) => {
        setPage(newPage);
    }

    const { data, isLoading } = useSWR<Results>(`/api/${tableData}?page=${page + 1}`);

    const [results, setResults] = useState<Results>({
        page,
        rows: [],
        totalRows: 0,
        totalAmount: 0,
    });

    useEffect(() => {
        if (!data) return;
        setResults({
            page,
            rows: data.rows,
            totalRows: data.totalRows,
            totalAmount: data.totalAmount,
        });
    }, [isLoading, page])


    return {
        page,
        results,
        isLoading,
        handleChangePage,
    }
}