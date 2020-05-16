import {
    ResultActionTypes,
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
import { IResultState, Result, Stage, Circle } from '../@Types/types';

export const ResultState: IResultState = {
    isFetching: false,
    results: [],
    stages: [],
    circles: []
}

export function ResultReducer(state = ResultState, action: ResultActionTypes): IResultState {
    switch (action.type) {
        case REQUEST_RESULTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case REQUEST_STAGES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case REQUEST_CIRCLES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_RESULTS:
            return Object.assign({}, state, {
                isFetching: false,
                results: action.results
            });
        case RECEIVE_STAGES:
            return Object.assign({}, state, {
                isFetching: false,
                stages: action.stages
            });
        case RECEIVE_CIRCLES:
            return Object.assign({}, state, {
                isFetching: false,
                circles: action.circles
            });
        case SAVE_RESULT:
            if (state.results.find(r => r.id === action.result.id) === undefined) {
                return Object.assign({}, state, {
                    isFetching: false,
                    results: [...state.results, action.result]
                });
            } else {
                const results = [...state.results];
                const id = results.indexOf(results.find(c => c.id === action.result.id) as Result);
                let item = results[id];
                item = action.result;
                results[id] = item;
                return Object.assign({}, state, {
                    isFetching: false,
                    results
                });
            }
        case SAVE_STAGE:
            if (state.stages.find(s => s.id === action.stage.id) === undefined) {
                return Object.assign({}, state, {
                    isFetching: false,
                    stages: [...state.stages, action.stage]
                });
            } else {
                const stages = [...state.stages];
                const id = stages.indexOf(stages.find(s => s.id === action.stage.id) as Stage);
                let item = stages[id];
                item = action.stage;
                stages[id] = item;
                return Object.assign({}, state, {
                    isFetching: false,
                    stages
                });
            }
        case SAVE_CIRCLE:
            if (state.circles.find(s => s.id === action.circle.id) === undefined) {
                return Object.assign({}, state, {
                    isFetching: false,
                    circles: [...state.circles, action.circle]
                });
            } else {
                const circles = [...state.circles];
                const id = circles.indexOf(circles.find(c => c.id === action.circle.id) as Circle);
                let item = circles[id];
                item = action.circle;
                circles[id] = item;
                return Object.assign({}, state, {
                    isFetching: false,
                    circles
                });
            }
        default:
            return state;
    }
}