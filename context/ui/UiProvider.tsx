import { FC, useReducer, ReactNode } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
    sidebarMobile: boolean;
    selectedTabAdmin: number;
}


const Ui_INITIAL_STATE: UiState = {
    sidebarMobile: false,
    selectedTabAdmin: 1
}


export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

    return (
        <UiContext.Provider value={{
            ...state
        }}>
            {children}
        </UiContext.Provider>
    )
};