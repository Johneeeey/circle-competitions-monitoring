import {
    UserActionTypes,
    RESPONSE_LOGIN,
    REQUEST,
    RESPONSE,
    LOGOUT,
    SET_ERROR_LOGIN,
    CANT_GET_USER
} from '../@Types/actionTypes';
import { IUserState } from '../@Types/types';

export const UserState: IUserState = {
    isFetching: false,
    user: null,
    loginError: false
};

export function UserReducer(state = UserState, action: UserActionTypes): IUserState {
    switch (action.type) {
        case REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RESPONSE:
            return Object.assign({}, state, {
                isFetching: false
            })
        case SET_ERROR_LOGIN:
            return Object.assign({}, state, {
                loginError: true,
                isFetching: false
            });
        case CANT_GET_USER:
            return Object.assign({}, state, {
                loginError: false,
                isFetching: false
            });
        case RESPONSE_LOGIN:
            return Object.assign({}, state, {
                user: action.user,
                isFetching: false,
                loginError: false
            });
        case LOGOUT:
            return Object.assign({}, state, {
                user: null
            });
        default:
            return state;
    }
}