import { IFilterState } from '../@Types/types';
import { FilterActionTypes, RECEIVE_TYPES, REQUEST_TYPES, CHANGE_SEARCH, CHANGE_TYPE } from '../@Types/actionTypes';

export const FilterState: IFilterState = {
    isFetching: false,
    types: [],
    search: "",
    selectedType: null
}

export function FilterReducer(state = FilterState, action: FilterActionTypes): IFilterState {
    switch (action.type) {
        case REQUEST_TYPES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_TYPES:
            return Object.assign({}, state, {
                isFetching: false,
                types: action.types
            });
        case CHANGE_TYPE:
            return Object.assign({}, state, {
                selectedType: action.newType
            });
        case CHANGE_SEARCH:
            return Object.assign({}, state, {
                search: action.search
            });
        default:
            return state;
    }
}