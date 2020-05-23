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
            const result = action.result;
            if (state.results.find(r => r.sportsman === result.sportsman
                && r.competition === result.competition) === undefined) {
                return Object.assign({}, state, {
                    isFetching: false,
                    results: [...state.results, result]
                });
            } else {
                const results = [...state.results];
                const id = results.indexOf(results.find(r => r.sportsman === result.sportsman
                    && r.competition === result.competition) as Result);
                let item = results[id];
                item = result;
                results[id] = item;
                return Object.assign({}, state, {
                    isFetching: false,
                    results
                });
            }
        case SAVE_STAGE:
            const stage = action.stage;
            if (state.stages.find(s => s.result === stage.result
                && s.sportsman === stage.sportsman
                && s.stage_num === stage.stage_num) === undefined) {
                return Object.assign({}, state, {
                    isFetching: false,
                    stages: [...state.stages, stage]
                });
            } else {
                const stages = [...state.stages];
                const id = stages.indexOf(stages.find(s => s.result === stage.result
                    && s.sportsman === stage.sportsman
                    && s.stage_num === stage.stage_num) as Stage);
                let item = stages[id];
                item = stage;
                stages[id] = item;
                return Object.assign({}, state, {
                    isFetching: false,
                    stages
                });
            }
        case SAVE_CIRCLE:
            const circle = action.circle;
            if (state.circles.find(c => c.stage === circle.stage
                && c.sportsman === circle.sportsman
                && c.circle_num === circle.circle_num) === undefined) {
                return Object.assign({}, state, {
                    isFetching: false,
                    circles: [...state.circles, circle]
                });
            } else {
                const circles = [...state.circles];
                const id = circles.indexOf(circles.find(c => c.stage === circle.stage
                    && c.sportsman === circle.sportsman
                    && c.circle_num === circle.circle_num) as Circle);
                let item = circles[id];
                item = circle;
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