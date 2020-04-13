import { ICompetition, IUser, ICompetitionType } from "./types";

/* COMPETITIONS */
export const GET_COMPETITIONS = 'GET_COMPETITIONS';
export const REQUEST_COMPETITIONS = 'REQUEST_COMPETITIONS';
export const RECEIVE_COMPETITIONS = 'RECEIVE_COMPETITIONS';

interface GetCompetitionsAction {
    type: typeof GET_COMPETITIONS,
    payload: number
};

interface RequestCompetitionsAction {
    type: typeof REQUEST_COMPETITIONS
};

interface ReceiveCompetitionsAction {
    type: typeof RECEIVE_COMPETITIONS,
    competitions: ICompetition
}

export type CompetitionsActionTypes = GetCompetitionsAction
    | RequestCompetitionsAction
    | ReceiveCompetitionsAction;


/* USER */
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RESPONSE_LOGIN = 'RESOPONSE_LOGIN';
export const SET_ERROR_LOGIN = 'SET_ERROR_LOGIN';
export const LOGOUT = 'LOGOUT';

interface RequestLogin {
    type: typeof REQUEST_LOGIN
}

interface ErrorRequestLogin {
    type: typeof SET_ERROR_LOGIN
}

interface ResponseLogin {
    type: typeof RESPONSE_LOGIN,
    user: IUser,
    token: string
}

interface Logout {
    type: typeof LOGOUT
}

export type UserActionTypes =
    RequestLogin |
    ErrorRequestLogin |
    ResponseLogin |
    Logout;

/**FILTER **/
export const REQUEST_TYPES = 'REQUEST_TYPES';
export const RECEIVE_TYPES = 'RECEIVE_TYPES';
export const CHANGE_TYPE = 'CHANGE_TYPE';
export const CHANGE_SEARCH = 'CHANGE_SEARCH';

interface RequestTypes {
    type: typeof REQUEST_TYPES
}

interface ReceiveTypes {
    type: typeof RECEIVE_TYPES,
    types: ICompetitionType[]
}

interface ChangeType {
    type: typeof CHANGE_TYPE,
    newType: number
}

interface ChangeSearch {
    type: typeof CHANGE_SEARCH,
    search: string
}

export type FilterActionTypes =
    RequestTypes |
    ReceiveTypes |
    ChangeType |
    ChangeSearch;