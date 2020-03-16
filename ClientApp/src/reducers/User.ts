import { UserActionTypes, RESPONSE_LOGIN, REQUEST_LOGIN, LOGOUT } from '../@Types/actionTypes';
import { IUserState } from '../@Types/types';

export const UserState: IUserState = {
    isFetching: false,
    user: null,
    token: ""
};

export function UserReducer(state = UserState, action: UserActionTypes): IUserState{
    switch (action.type) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RESPONSE_LOGIN:
            return Object.assign({}, state, {
                user: action.user,
                token: action.token,
                isFetching: false
            });
        case LOGOUT:
            return Object.assign({}, state, {
                user: null
            });
        default:
            return state;
    }
}