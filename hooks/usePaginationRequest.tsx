import { useState, useEffect } from 'react';
import useSWR from "swr";

import { PaginationData } from '@/interfaces';

type PaginationType = 'entries' | 'expenses' | 'users' | 'matches' | 'users/history';

export const usePaginationRequest = (tableType: PaginationType, search?: string) => {

    const [page, setPage] = useState<number>(0);

    const handleChangePage = (event: unknown | null, newPage: number,) => {
        setPage(newPage);
    }

    const request = search ? `/api/${tableType}?page=${page + 1}&search=${search}` : `/api/${tableType}?page=${page + 1}`;

    const { data, isLoading } = useSWR<PaginationData>(request, {
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