import {
    REQUEST_LOGIN,
    SET_ERROR_LOGIN,
    RESPONSE_LOGIN,
    CANT_GET_USER,
    LOGOUT
} from '../@Types/actionTypes';
import { IUser } from '../@Types/types';
import { Dispatch } from 'redux';

const requestLogin = () => ({
    type: REQUEST_LOGIN
})

const responseLogin = (user: IUser) => ({
    type: RESPONSE_LOGIN,
    user
})

const setErrorLogin = () => ({
    type: SET_ERROR_LOGIN
})

const cantGetUser = () => ({
    type: CANT_GET_USER
})

export const logout = () => {
    localStorage.removeItem('access_token');
    return {
        type: LOGOUT
    }
}

export function getUserByToken() {
    return function (dispatch: Dispatch) {
        dispatch(requestLogin());
        const token = localStorage.getItem('access_token');
        return fetch('/Account/GetUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch(responseLogin(data))
            })
            .catch(error => {
                console.log(error);
                localStorage.removeItem('access_token');
                dispatch(cantGetUser());
            })
    }
}

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
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                dispatch(responseLogin(data.User))
            })
            .catch(error => {
                console.log(error);
                dispatch(setErrorLogin());
            })
    }
}

export function registrateUser(user: IUser) {
    return function (dispatch: Dispatch) {
        dispatch(requestLogin());
        return fetch('/Account/Registrate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('access_token', data.access_token);
                dispatch(responseLogin(data.user))
            })
            .catch(error => console.log(error));
    }
}