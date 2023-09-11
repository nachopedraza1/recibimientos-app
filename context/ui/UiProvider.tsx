import { FC, useReducer, ReactNode } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
    modalStatus: { mercadopago?: boolean, paypal?: boolean }
    sidebarMobile: boolean;
    selectedTab: number;
}

const Ui_INITIAL_STATE: UiState = {
    modalStatus: { mercadopago: false, paypal: false },
    sidebarMobile: false,
    selectedTab: 0,
}

export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

    const handleChangeTab = (tabValue: number) => {
        dispatch({ type: '[Ui] - changeTabValue', payload: tabValue })
    }

    const toggleModal = (modalType: 'mercadopago' | 'paypal') => {
        dispatch({ type: '[Ui] - toggleModal', payload: modalType })
    }

    return (
        <UiContext.Provider value={{
            ...state,
            handleChangeTab,
            toggleModal,
        }}>
            {children}
        </UiContext.Provider>
    )
};