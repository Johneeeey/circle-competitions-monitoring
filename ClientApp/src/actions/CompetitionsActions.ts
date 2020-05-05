import {
    SAVE_COMPETITION,
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

function saveCompetition(competition: ICompetition) {
    return {
        type: SAVE_COMPETITION,
        payload: competition
    }
}

export function fetchCompetitions() {
    return function (dispatch: Dispatch) {
        dispatch(requestCompetitions());
        return (async () => {
            const GetCompetitionsRequest = await fetch('/Competition/GetCompetitions', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
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

export function SaveCompetition(competition: ICompetition) {
    return function (dispatch: Dispatch) {
        dispatch(requestCompetitions());
        dispatch(saveCompetition(competition));
    }
}