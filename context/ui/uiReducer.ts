import { UiState } from './';


type UiActionType =
    | { type: '[Ui] - toggleModal', payload: 'mercadopago' | 'paypal' }
    | { type: '[Ui] - changeTabValue', payload: number }
    | { type: '[Ui] - toggleSidebarMobile' }


export const uiReducer = (state: UiState, action: UiActionType): UiState => {

    switch (action.type) {
        case '[Ui] - toggleSidebarMobile':
            return {
                ...state,
                sidebarMobile: !state.sidebarMobile
            }
        case '[Ui] - changeTabValue':
            return {
                ...state,
                selectedTab: action.payload
            }
        case '[Ui] - toggleModal':
            return {
                ...state,
                modalStatus: {
                    mercadopago: action.payload === 'mercadopago' && !state.modalStatus.mercadopago,
                    paypal: action.payload === 'paypal' && !state.modalStatus.paypal,
                }
            }

        default:
            return state;
    }

}