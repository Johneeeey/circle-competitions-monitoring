import { 
    CompetitionsActionTypes,
    REQUEST_COMPETITIONS, 
    RECEIVE_COMPETITIONS 
} from '../@Types/actionTypes';
import { 
    ICompetitionsState 
} from '../@Types/types';

export const CompetitionState: ICompetitionsState = {
    isFetching: false,
    competitions: []
};

export function CompetitionReducer(state=CompetitionState, action: CompetitionsActionTypes): ICompetitionsState{
    switch(action.type){
        case REQUEST_COMPETITIONS:
            return Object.assign({}, state,{
                isFetching: true
            });
        case RECEIVE_COMPETITIONS:
            return Object.assign({} ,state,{
                isFetching: false,
                competitions: action.competitions
            });
        default:
            return state;
    }
}