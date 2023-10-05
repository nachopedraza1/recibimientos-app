import { ConfigState } from '@/context/config';
import { IMatch } from '@/interfaces';

type ConfigActionType =
    | { type: '[Config] - setActiveMatch', payload?: IMatch }


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