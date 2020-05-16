import {
    REQUEST_SPORTSMEN,
    RECEIVE_SPORTSMEN,
    SportsmanActionTypes
} from '../@Types/actionTypes';
import { ISportsmanState } from '../@Types/types';

const SportsmanState: ISportsmanState = {
    isFetching: false,
    sportsmen: []
}

export function SportsmanReducer(state = SportsmanState, action: SportsmanActionTypes): ISportsmanState {
    switch (action.type) {
        case REQUEST_SPORTSMEN:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_SPORTSMEN:
            return Object.assign({}, state, {
                isFetching: true,
                sportsmen: action.sportsmen
            })
        default:
            return state;
    }
}