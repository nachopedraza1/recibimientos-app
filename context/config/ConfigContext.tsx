import { createContext } from 'react';

interface ContextProps {
    activeMatch: string;
}


export const ConfigContext = createContext({} as ContextProps);