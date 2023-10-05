import { ConfigState } from '@/context/config';


type ConfigActionType =
    | { type: '[Config] - setActiveMatch', payload?: string }


export const configReducer = (state: ConfigState, action: ConfigActionType): ConfigState => {

    switch (action.type) {
        case '[Config] - setActiveMatch':
            return {
                ...state,
                activeMatch: action.payload!
            }

        default:
            return state;
    }

}