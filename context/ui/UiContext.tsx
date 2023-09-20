import { createContext } from 'react';


interface ContextProps {
    modalStatus: { mercadopago?: boolean, paypal?: boolean }
    sidebarMobile: boolean;
    selectedTab: number;

    toggleModal: (modalType: 'mercadopago' | 'paypal') => void;
    handleChangeTab: (tabValue: number) => void;
    toggleSidebar: () => void;
}


export const UiContext = createContext({} as ContextProps);