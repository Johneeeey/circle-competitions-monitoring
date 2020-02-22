import {
    GET_COMPETITIONS,
    RECEIVE_COMPETITIONS,
    REQUEST_COMPETITIONS
} from '../@Types/actionTypes';
import { Dispatch } from 'redux';
import { ICompetition } from '../@Types/types';

function requestCompetitions() {
    return {
        type: REQUEST_COMPETITIONS
    };
}

function receiveCompetitions(competitions: ICompetition) {
    return {
        type: RECEIVE_COMPETITIONS,
        competitions
    };
}

export function fetchCompetitions(token: string) {
    return function (dispatch: Dispatch) {
        dispatch(requestCompetitions());
        return (async () => {
            const GetCompetitionsRequest = await fetch('', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const response = await GetCompetitionsRequest.json();
            return response
        })()
            .then(data =>
                dispatch(receiveCompetitions(data))
            )
    }
}