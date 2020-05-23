import {
    REQUEST_SPORTSMEN,
    RECEIVE_SPORTSMEN
} from '../@Types/actionTypes';
import { Dispatch } from 'redux';
import { ISportsman } from '../@Types/types';

function requestSportsmen() {
    return {
        type: REQUEST_SPORTSMEN
    }
}

function receiveSportsmen(sportsmen: ISportsman[]) {
    return {
        type: RECEIVE_SPORTSMEN,
        sportsmen
    }
}

export function GetSportsmen() {
    return function (dispatch: Dispatch) {
        dispatch(requestSportsmen());
        return (async () => {
            const GetSportsmanReques = await fetch(`/Sportsman/GetSportsmen`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const response = await GetSportsmanReques.json();
            return response;
        })()
            .then((data: ISportsman[]) =>
                dispatch(receiveSportsmen(data))
            );
    }
}