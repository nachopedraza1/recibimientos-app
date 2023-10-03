import { createContext } from 'react';


interface ContextProps {
    modalStatus: { mercadopago?: boolean, paypal?: boolean }
    sidebarMobile: boolean;
    selectedTab: number;

    toggleModal: (modalType: 'mercadopago' | 'paypal') => void;
    handleChangeTab: (tabValue: number) => void;
    toggleSidebar: () => void;


    //Switches admin panel
    activeSwitch: string | null;
    updateActiveSwitch: (matchName: string) => void;
}


export const UiContext = createContext({} as ContextProps);