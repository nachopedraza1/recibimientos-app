import { useState, useEffect } from 'react';
import useSWR, { mutate } from "swr";

import { PaginationData } from '@/interfaces';

export const usePaginationRequest = (tableData: 'entries' | 'expenses') => {

    const [page, setPage] = useState<number>(0);

    const handleChangePage = (event: unknown | null, newPage: number,) => {
        setPage(newPage);
    }

    const { data, isLoading } = useSWR<PaginationData>(`/api/${tableData}?page=${page + 1}`, {
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
    });

    const [results, setEntries] = useState<PaginationData>({
        page,
        rows: [],
        totalRows: 0,
        totalAmount: "$0",
    });

    useEffect(() => {
        if (!data) return;
        setEntries({
            page,
            rows: data.rows,
            totalRows: data.totalRows,
            totalAmount: data.totalAmount,
        });
    }, [isLoading, page])


    return {
        page,
        results,
        isLoading: !data,
        handleChangePage,
    }
}