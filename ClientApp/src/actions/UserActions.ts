import {
    REQUEST_LOGIN,
    SET_ERROR_LOGIN,
    RESPONSE_LOGIN,
    LOGOUT,
    UserActionTypes
} from '../@Types/actionTypes';
import { IUser } from '../@Types/types';
import { Dispatch } from 'redux';

const requestLogin = () => ({
    type: REQUEST_LOGIN
})

function responseLogin(user: IUser, token: string) {
    return {
        type: RESPONSE_LOGIN,
        user,
        token
    }
}

const setErrorLogin = () => ({
    type: SET_ERROR_LOGIN
})

export function loginUser(login: string, password: string) {
    return function (dispatch: Dispatch) {
        dispatch(requestLogin());
        return fetch(`/Account/Authorize?login=${login}&password=${password}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => dispatch(responseLogin(data.User, data.access_token)))
            .catch(error => {
                console.log(error);
                dispatch(setErrorLogin());
            })
    }
}