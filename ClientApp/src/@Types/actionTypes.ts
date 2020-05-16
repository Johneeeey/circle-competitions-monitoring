import { ICompetition, IUser, ICompetitionType, IResult, IStage, ICircle, ISportsman } from "./types";

/* COMPETITIONS */
// export const GET_COMPETITION = 'GET_COMPETITION';
export const SAVE_COMPETITION = 'SAVE_COMPETITION';
export const REQUEST_COMPETITIONS = 'REQUEST_COMPETITIONS';
export const RECEIVE_COMPETITIONS = 'RECEIVE_COMPETITIONS';

// interface GetCompetitionsAction {
//     type: typeof GET_COMPETITION,
//     payload: number
// };

interface SaveCompetitionAction {
    type: typeof SAVE_COMPETITION,
    payload: ICompetition
}

interface RequestCompetitionsAction {
    type: typeof REQUEST_COMPETITIONS
};

interface ReceiveCompetitionsAction {
    type: typeof RECEIVE_COMPETITIONS,
    competitions: ICompetition
}

export type CompetitionsActionTypes = //GetCompetitionsAction
    RequestCompetitionsAction
    | ReceiveCompetitionsAction
    | SaveCompetitionAction;


/* USER */
export const REQUEST = 'REQUEST';
export const RESPONSE = 'RESPONSE';
export const RESPONSE_LOGIN = 'RESOPONSE_LOGIN';
export const SET_ERROR_LOGIN = 'SET_ERROR_LOGIN';
export const CANT_GET_USER = 'CANT_GET_USER';
export const LOGOUT = 'LOGOUT';

interface Request {
    type: typeof REQUEST
}

interface Response {
    type: typeof RESPONSE
}

interface ErrorRequestLogin {
    type: typeof SET_ERROR_LOGIN
}

interface CantGetUser {
    type: typeof CANT_GET_USER
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
    Request |
    Response |
    ErrorRequestLogin |
    ResponseLogin |
    CantGetUser |
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

/** RESULTS **/
export const REQUEST_RESULTS = 'REQUEST_RESULTS;';
export const REQUEST_STAGES = 'REQUEST_STAGES';
export const REQUEST_CIRCLES = 'REQUEST_CIRCLES';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const RECEIVE_STAGES = 'RECEIVE_STAGES';
export const RECEIVE_CIRCLES = 'RECEIVE_CIRCLES';
export const SAVE_RESULT = 'SAVE_RESULT';
export const SAVE_STAGE = 'SAVE_STAGE';
export const SAVE_CIRCLE = 'SAVE_CIRCLE';

interface RequestResults {
    type: typeof REQUEST_RESULTS
}

interface RequestStages {
    type: typeof REQUEST_STAGES
}

interface RequestCircles {
    type: typeof REQUEST_CIRCLES
}

interface ReceiveResults {
    type: typeof RECEIVE_RESULTS,
    results: IResult[]
}

interface ReceiveStages {
    type: typeof RECEIVE_STAGES,
    stages: IStage[]
}

interface ReceiveCircles {
    type: typeof RECEIVE_CIRCLES,
    circles: ICircle[]
}

interface SaveResult {
    type: typeof SAVE_RESULT,
    result: IResult
}

interface SaveStage {
    type: typeof SAVE_STAGE,
    stage: IStage
}

interface SaveCircle {
    type: typeof SAVE_CIRCLE,
    circle: ICircle
}

export type ResultActionTypes = RequestResults
    | RequestStages
    | RequestCircles
    | ReceiveResults
    | ReceiveStages
    | ReceiveCircles
    | SaveResult
    | SaveStage
    | SaveCircle;

/** SPORTSMAN **/
export const REQUEST_SPORTSMEN = 'REQUEST_SPORTSMEN';
export const RECEIVE_SPORTSMEN = 'RECEIVE_SPORTSMEN';

interface RequestSportsmen {
    type: typeof REQUEST_SPORTSMEN
}

interface ReceiveSportsmen {
    type: typeof RECEIVE_SPORTSMEN,
    sportsmen: ISportsman[]
}

export type SportsmanActionTypes = RequestSportsmen | ReceiveSportsmen;