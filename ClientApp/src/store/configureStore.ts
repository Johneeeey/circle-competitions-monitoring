import { CompetitionReducer } from '../reducers/Competition';
import { UserReducer } from '../reducers/User';
import { FilterReducer } from '../reducers/Filter';
import { ResultReducer } from '../reducers/Result';
import { SportsmanReducer } from '../reducers/Sportsman';
import { combineReducers } from 'redux';

// export const initialState = {
//     competition: CompetitionState,
//     user: UserState
// }

// export const startReducers = {
//     competition: CompetitionReducer,
//     user: UserReducer
// }

export default combineReducers({
    user: UserReducer,
    competition: CompetitionReducer,
    filter: FilterReducer,
    result: ResultReducer,
    sportsman: SportsmanReducer
})