import { FC, ReactNode, useReducer, useState, useEffect } from 'react';
import { DataContext, dataReducer } from './';
import useSWR from 'swr';
import { IEntry, PaginationData } from '@/interfaces';

export interface DataState {
    entriesData: {
        entries: IEntry[],
        totalPages: number,
        currentPage: number,
        totalEntries: number,
    };
}


const Data_INITIAL_STATE: DataState = {
    entriesData: {
        entries: [],
        totalPages: 0,
        currentPage: 0,
        totalEntries: 0,
    }
}


export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(dataReducer, Data_INITIAL_STATE);

    const [page, setPage] = useState<number>(0);

    const { data, isLoading } = useSWR<PaginationData>(`/api/entries?page=${page}`);

    useEffect(() => {
        if (!data) return;
        dispatch({ type: '[Entries] - Info', payload: data! });
    }, [isLoading])

     useEffect(() => {
        dispatch({ type: '[Entries] - Rows', payload: data?.entries! })
    }, [page]) 



    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const emptyRows = Math.max(0, (page * 10) - data?.entries!.length!);


    return (
        <DataContext.Provider value={{
            ...state,
            handleChangePage,
        }}>
            {children}
        </DataContext.Provider>
    )
};