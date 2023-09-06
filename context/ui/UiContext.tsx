import { createContext } from 'react';


interface ContextProps {
    sidebarMobile: boolean;
    selectedTabAdmin: number;
}


export const UiContext = createContext({} as ContextProps);