import { useState, useEffect } from 'react';
import useSWR from "swr"


interface Results {
    page: number,
    totalRows: number,
    totalAmount: number,
    rows: Rows[]
}

interface Rows {
    name: string,
    amount: number,
    createdAt: string,
}

export const usePagination = (table: 'entries' | 'expenses') => {

    const [page, setPage] = useState<number>(1);

    const { data, isLoading } = useSWR<Results>(`/api/${table}?page=${page}`);

    const [results, setResults] = useState({
        page: 1,
        rows: [],
        totalRows: 0,
        totalAmount: 0,
    });

    useEffect(() => {
        if (!data) return;
        setResults({
            page,
            rows: data.rows as any,
            totalRows: data.totalRows,
            totalAmount: data.totalAmount,
        });
        console.log(data.rows);
    }, [isLoading, page])




    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
        setPage(newPage + 1);
    }

    return {
        results,
        isLoading,
        handleChangePage,
    }
}