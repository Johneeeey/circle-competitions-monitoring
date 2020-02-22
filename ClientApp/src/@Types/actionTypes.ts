import { ICompetition } from "./types";

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

