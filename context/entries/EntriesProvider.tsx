import { FC, useReducer, ReactNode, useState, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { IEntry, PaginationData } from '@/interfaces';
import { useFetch } from '@/hooks';

export interface EntriesState {
    entriesData: {
        page: number,
        entries: IEntry[],
        totalPages: number,
        currentPage: number,
        totalEntries: number,
    }
}


const Entries_INITIAL_STATE: EntriesState = {
    entriesData: {
        page: 0,
        entries: [],
        totalPages: 0,
        currentPage: 0,
        totalEntries: 0,
    }
}


export const EntriesProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [page, setPage] = useState<number>(0);

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const { data, isLoading } = useFetch<PaginationData>(`/entries?page=${page}`);

    useEffect(() => {
        if (data) {
            dispatch({ type: '[Entries] - Update Entries', payload: data })
        }
    }, [isLoading])

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };


    return (
        <EntriesContext.Provider value={{
            ...state,
            handleChangePage,
        }}>
            {children}
        </EntriesContext.Provider>
    )
};