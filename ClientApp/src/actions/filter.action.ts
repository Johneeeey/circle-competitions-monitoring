import { ICompetitionType } from "../@Types/types";
import {
    REQUEST_TYPES,
    RECEIVE_TYPES,
    CHANGE_SEARCH,
    CHANGE_TYPE
} from '../@Types/actionTypes';
import { Dispatch } from 'redux';

const requestTypes = () => ({
    type: REQUEST_TYPES
});

const receiveTypes = (types: ICompetitionType[]) => ({
    type: RECEIVE_TYPES,
    types
});

const changeType = (newType: number) => ({
    type: CHANGE_TYPE,
    newType
})

const changeSearch = (search: string) => ({
    type: CHANGE_SEARCH,
    search
})

export function ChangeFilterSearch(search: string) {
    return function (dispatch: Dispatch) {
        dispatch(changeSearch(search));
    }
}

export function ChangeFilterType(newType: number) {
    return function (dispatch: Dispatch) {
        dispatch(changeType(newType));
    }
}

export function GetCompetitionTypes() {
    return function (dispatch: Dispatch) {
        dispatch(requestTypes());
        fetch(`/Competition/GetCompetitionTypes`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((types: ICompetitionType[]) => {
                types.unshift({ id: 0, name: 'Все' });
                dispatch(receiveTypes(types))
            })
            .catch(err => console.log(err));
    }
}