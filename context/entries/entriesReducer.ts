import { IEntry, PaginationData } from '@/interfaces';
import { EntriesState } from './';


type EntriesActionType =
    | { type: '[Entries] - Update Entries', payload: PaginationData }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case '[Entries] - Update Entries':
            return {
                ...state,
                entriesData: {...action.payload}
            }

        default:
            return state;
    }

}