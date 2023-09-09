import { UiState } from './';


type UiActionType =
    | { type: '[Ui] - toggleSidebarMobile' }
    | { type: '[Ui] - toggleModalPayment' }
    | { type: '[Ui] - changeTabValue', payload: number }


export const uiReducer = (state: UiState, action: UiActionType): UiState => {

    switch (action.type) {
        case '[Ui] - toggleSidebarMobile':
            return {
                ...state,
            }
        case '[Ui] - changeTabValue':
            return {
                ...state,
                selectedTab: action.payload
            }
        case '[Ui] - toggleModalPayment':
            return {
                ...state,
                modalPaymentState: !state.modalPaymentState
            }

        default:
            return state;
    }

}