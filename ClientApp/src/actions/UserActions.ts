import {
    REQUEST_LOGIN,
    RESPONSE_LOGIN,
    LOGOUT,
    UserActionTypes
} from '../@Types/actionTypes';
import { IUser } from '../@Types/types';
import { Dispatch } from 'redux';

function requestLogin(): UserActionTypes {
    return {
        type: REQUEST_LOGIN
    }
}

function responseLogin(user: IUser, token: string) {
    return {
        type: RESPONSE_LOGIN,
        user,
        token
    }
}

export function loginUser(login: string, password: string) {
    return function (dispatch: Dispatch) {
        dispatch(requestLogin());
        return (async () => {
            const GetUserResponse = await fetch(`/Account/Authorize`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            });
            const data = await GetUserResponse.json();
            return data;
        })()
            .then(data => {
                dispatch(responseLogin(data.User, data.access_token));
            })
    }
}