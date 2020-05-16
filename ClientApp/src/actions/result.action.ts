import {
    REQUEST_RESULTS,
    REQUEST_STAGES,
    REQUEST_CIRCLES,
    RECEIVE_RESULTS,
    RECEIVE_STAGES,
    RECEIVE_CIRCLES,
    SAVE_RESULT,
    SAVE_STAGE,
    SAVE_CIRCLE
} from '../@Types/actionTypes';
import { Dispatch } from 'redux';
import { IResult, IStage, ICircle } from '../@Types/types';

function requestResults() {
    return {
        type: REQUEST_RESULTS
    }
}
function requestStages() {
    return {
        type: REQUEST_STAGES
    }
}
function requestCircles() {
    return {
        type: REQUEST_CIRCLES
    }
}

function receiveResults(results: IResult[]) {
    return {
        type: RECEIVE_RESULTS,
        results
    }
}
function receiveStages(stages: IStage[]) {
    return {
        type: RECEIVE_STAGES,
        stages
    }
}
function receiveCircles(circles: ICircle[]) {
    return {
        type: RECEIVE_CIRCLES,
        circles
    }
}

function saveResult(result: IResult) {
    return {
        type: SAVE_RESULT,
        result
    }
}
function saveStage(stage: IStage) {
    return {
        type: SAVE_STAGE,
        stage
    }
}
function saveCircle(circle: ICircle) {
    return {
        type: SAVE_CIRCLE,
        circle
    }
}

export function GetResults() {
    return function (dispatch: Dispatch) {
        dispatch(requestResults());
        return (async () => {
            const GetResultsRequest = await fetch(`/Result/GetResults`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const response = await GetResultsRequest.json();
            return response;
        })()
            .then((data: IResult[]) =>
                dispatch(receiveResults(data))
            );
    }
}
export function GetStages() {
    return function (dispatch: Dispatch) {
        dispatch(requestStages());
        return (async () => {
            const GetStagesRequest = await fetch(`/Result/GetStages`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const response = await GetStagesRequest.json();
            return response;
        })()
            .then((data: IStage[]) =>
                dispatch(receiveStages(data))
            );
    }
}
export function GetCircles() {
    return function (dispatch: Dispatch) {
        dispatch(requestCircles());
        return (async () => {
            const GetCirclesRequest = await fetch(`/Result/GetCircles`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const response = await GetCirclesRequest.json();
            return response;
        })()
            .then((data: ICircle[]) =>
                dispatch(receiveCircles(data))
            );
    }
}

export function SaveResult(result: IResult) {
    return function (dispatch: Dispatch) {
        dispatch(requestResults());
        dispatch(saveResult(result));
    }
}
export function SaveStage(stage: IStage) {
    return function (dispatch: Dispatch) {
        dispatch(requestStages());
        dispatch(saveStage(stage));
    }
}
export function SaveCircle(circle: ICircle) {
    return function (dispatch: Dispatch) {
        dispatch(requestCircles());
        dispatch(saveCircle(circle));
    }
}