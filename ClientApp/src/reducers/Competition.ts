import {
    CompetitionsActionTypes,
    SAVE_COMPETITION,
    REQUEST_COMPETITIONS,
    RECEIVE_COMPETITIONS
} from '../@Types/actionTypes';
import {
    ICompetitionsState, Competition
} from '../@Types/types';

export const CompetitionState: ICompetitionsState = {
    isFetching: false,
    competitions: []
};

export function CompetitionReducer(state = CompetitionState, action: CompetitionsActionTypes): ICompetitionsState {
    switch (action.type) {
        case REQUEST_COMPETITIONS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_COMPETITIONS:
            return Object.assign({}, state, {
                isFetching: false,
                competitions: action.competitions
            });
        case SAVE_COMPETITION:
            if (state.competitions.find(c => c.id === action.payload.id) === undefined) {
                return Object.assign({}, state, {
                    isFetching: false,
                    competitions: [...state.competitions, action.payload]
                })
            } else {
                const competitions = [...state.competitions];
                const id = competitions.indexOf(competitions.find(c => c.id === action.payload.id) as Competition);
                let item = competitions[id];
                item = action.payload;
                competitions[id] = item;
                return Object.assign({}, state, {
                    isFetching: false,
                    competitions: competitions
                })
            }
        default:
            return state;
    }
}