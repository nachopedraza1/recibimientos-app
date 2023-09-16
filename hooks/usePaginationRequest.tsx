import { useState, useEffect } from 'react';
import useSWR from "swr";

import { PaginationData, ResponsePagination } from '@/interfaces';

export const usePaginationRequest = () => {

    const [page, setPage] = useState<number>(0);

    const handleChangePage = (event: unknown | null, newPage: number,) => {
        setPage(newPage);
    }

    const { data, isLoading } = useSWR<ResponsePagination>(`/api/pagination?page=${page + 1}`);

    const [entries, setEntries] = useState<PaginationData>({
        page,
        rows: [],
        totalRows: 0,
        totalAmount: "$0",
    });

    const [expenses, setExpenses] = useState<PaginationData>({
        page,
        rows: [],
        totalRows: 0,
        totalAmount: "$0",
    });

    useEffect(() => {
        if (!data) return;
        setEntries({
            page,
            rows: data.rowsEntries,
            totalRows: data.totalRowsEntries,
            totalAmount: data.totalAmountEntries,
        });

        setExpenses({
            page,
            rows: data.rowsExpenses,
            totalRows: data.totalRowsExpenses,
            totalAmount: data.totalAmountExpenses,
        });
    }, [isLoading, page])


    return {
        page,
        entries,
        expenses,
        isLoading,
        handleChangePage,
    }
}