import { createContext } from 'react';
import { IEntry } from '@/interfaces';


interface ContextProps {
    entriesData: {
        entries: IEntry[],
        totalPages: number,
        currentPage: number,
        totalEntries: number,
    };


    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}


export const DataContext = createContext({} as ContextProps);