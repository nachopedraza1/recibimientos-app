import { createContext } from 'react';
import { IMatch } from '@/interfaces';

interface ContextProps {
    activeMatch: IMatch | null;
}


export const ConfigContext = createContext({} as ContextProps);