import { createContext } from 'react';
import { IEntry } from '@/interfaces';


interface ContextProps {
    entriesData: {
        page: number,
        entries: IEntry[],
        totalPages: number,
        currentPage: number,
        totalEntries: number,
    }

    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
}


export const EntriesContext = createContext({} as ContextProps);