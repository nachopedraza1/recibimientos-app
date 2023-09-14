import { useState } from 'react';
import useSWR from "swr"

import { PaginationData } from '@/interfaces';

export const usePagination = () => {

    const [page, setPage] = useState<number>(0);

    const { data, isLoading } = useSWR<PaginationData>(`/api/entries?page=${page}`);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const emptyRows = Math.max(0, (page * 10) - data?.entries!.length!);

    return {
        handleChangePage,
        isLoading,
        emptyRows,
        data,
        page,
    }
}