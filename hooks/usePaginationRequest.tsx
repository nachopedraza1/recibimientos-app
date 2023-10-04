import { useState, useEffect } from 'react';
import useSWR from "swr";

import { PaginationData } from '@/interfaces';

export const usePaginationRequest = (tableData: 'entries' | 'expenses' | 'users' | 'matches',) => {

    const [page, setPage] = useState<number>(0);

    const handleChangePage = (event: unknown | null, newPage: number,) => {
        setPage(newPage);
    }

    const { data, isLoading } = useSWR<PaginationData>(`/api/${tableData}?page=${page + 1}`, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
    });

    const [results, setResults] = useState<PaginationData>({
        page,
        rows: [],
        totalRows: 0,
        totalAmount: "$0",
    });

    useEffect(() => {
        if (!data) return;
        setResults({ ...data, page });
    }, [isLoading, page, data])


    return {
        page,
        results,
        isLoading: !data,
        handleChangePage,
    }
}