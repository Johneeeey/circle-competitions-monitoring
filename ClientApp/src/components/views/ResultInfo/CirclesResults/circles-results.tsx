import React, { Component } from 'react';
import { ICircle } from '../../../../@Types/types';
import InputMask from 'react-input-mask';

import './CirclesResults.scss';

interface CirclesResultsProps {
    circles: ICircle[];
    handleChangeTimeOfFinish: (idx: number, value: string) => void;
    handleChangePoints: (idx: number, value: number) => void;
}

class CirclesResults extends Component<CirclesResultsProps> {
    renCirclesCells(): JSX.Element[] {
        const response: JSX.Element[] = [];
        const circles = this.props.circles;
        circles.forEach((c: ICircle, i: number) => {
            response.push(
                <div className="circles-results__item" key={i}>
                    <span className="circles-results__item_title">Круг #{c.circle_num}</span>
                    <div className="circles-results__item_time">
                        <label htmlFor="time">Время</label>
                        <InputMask
                            mask="99:99:99"
                            className="form-control"
                            value={c.time_of_finish}
                            onChange={event => this.props.handleChangeTimeOfFinish(i, event.target.value)}
                        />
                    </div>
                    <div className="circles-results__item_points">
                        <label htmlFor={`points${i}`}>Очки</label>
                        <input
                            type="number"
                            name={`points${i}`}
                            id={`points${i}`}
                            className="form-control"
                            value={c.points}
                            onChange={event => this.props.handleChangePoints(i, Number(event.target.value))} />
                    </div>
                    <div className="circles-results__item_place">
                        <label htmlFor={`place${i}`}>Место</label>
                        <input
                            type="text"
                            name={`place${i}`}
                            id={`place${i}`}
                            className="form-control"
                            value={c.place}
                            readOnly />
                    </div>
                </div>
            )
        })
        return response;
    }
    render() {
        return (
            <div className="circles-results">
                {this.renCirclesCells()}
            </div>
        )
    }
}

export default CirclesResults;