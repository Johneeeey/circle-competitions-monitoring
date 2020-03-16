import { ICompetition, IUser } from "./types";

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
export const LOGOUT = 'LOGOUT';

interface RequestLogin {
    type: typeof REQUEST_LOGIN
}

interface ResponseLogin {
    type: typeof RESPONSE_LOGIN,
    user: IUser,
    token: string
}

interface Logout{
    type: typeof LOGOUT
}

export type UserActionTypes =
    RequestLogin |
    ResponseLogin |
    Logout;