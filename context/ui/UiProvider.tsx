import { FC, useReducer, ReactNode } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
    sidebarMobile: boolean;
    selectedTab: number;
    modalPaymentState: boolean;
}

const Ui_INITIAL_STATE: UiState = {
    modalPaymentState: false,
    sidebarMobile: false,
    selectedTab: 0,
}

export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

    const handleChangeTab = (tabValue: number) => {
        dispatch({ type: '[Ui] - changeTabValue', payload: tabValue })
    }

    const toggleModalPayment = () => {
        dispatch({ type: '[Ui] - toggleModalPayment' })
    }

    return (
        <UiContext.Provider value={{
            ...state,
            handleChangeTab,
            toggleModalPayment,
        }}>
            {children}
        </UiContext.Provider>
    )
};