import { CompetitionState, CompetitionReducer } from '../reducers/Competition';
import { UserState, UserReducer } from '../reducers/User';
import { FilterReducer } from '../reducers/Filter';
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
    filter: FilterReducer
})