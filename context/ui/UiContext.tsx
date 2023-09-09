import { createContext } from 'react';


interface ContextProps {
    modalPaymentState: boolean;
    sidebarMobile: boolean;
    selectedTab: number;

    toggleModalPayment: () => void;
    handleChangeTab: (tabValue: number) => void;
}


export const UiContext = createContext({} as ContextProps);