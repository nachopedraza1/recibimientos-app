import { UiState } from './';


type UiActionType =
    | { type: '[Ui] - toggleSidebarMobile' }


export const uiReducer = (state: UiState, action: UiActionType): UiState => {

    switch (action.type) {
        case '[Ui] - toggleSidebarMobile':
            return {
                ...state,
            }

        default:
            return state;
    }

}