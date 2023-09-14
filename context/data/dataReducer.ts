import { IEntry, PaginationData } from '@/interfaces';
import { DataState } from './';


type DataActionType =
    | { type: '[Entries] - Info', payload: PaginationData }
    | { type: '[Entries] - Rows', payload: IEntry[] }


export const dataReducer = (state: DataState, action: DataActionType): DataState => {

    switch (action.type) {
        case '[Entries] - Info':
            return {
                ...state,
                entriesData: {
                    entries: [],
                    totalPages: action.payload.totalPages,
                    currentPage: action.payload.currentPage,
                    totalEntries: action.payload.totalEntries,
                }
            }

        case '[Entries] - Rows':
            return {
                ...state,
                entriesData: {
                    ...state.entriesData,
                    entries: action.payload,
                }
            }

        default:
            return state;
    }

}