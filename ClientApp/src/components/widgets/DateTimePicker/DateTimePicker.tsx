import React, { Component } from 'react';
import DateService from '../../../helpers/dateService';
import DatePicker from 'react-datepicker';

import "./DateTimePicker.scss";
import "react-datepicker/dist/react-datepicker.css";

interface PickerProps {
    secondField: boolean;
    value: Date;
    secondValue: Date;
    changeDate: (date: Date) => void;
    changeSecondDate?: (date: Date) => void;
    readOnly?: boolean;
}
interface PickerState {
    defaultValue: Date
}

class DateTimePicker extends Component<PickerProps, PickerState> {
    firstDateRef: any;
    secondDateRef: any;
    lightpick: any;

    constructor(props: PickerProps) {
        super(props);
        this.state = {
            defaultValue: new Date()
        }
    }

    render() {
        return (
            <div className="datetime-container">
                <label htmlFor="firstDate">{this.props.secondField ? "Период: " : "Дата"}</label>
                {this.props.readOnly ? <input
                    className="picker form-control"
                    type="text"
                    id="firstDate"
                    autoComplete="off"
                    value={DateService.GetDateForPicker(this.props.value)}
                    readOnly
                /> :
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        className="form-control picker"
                        selected={new Date(this.props.value)}
                        onChange={date => {
                            if (!date) {
                                date = new Date();
                            }
                            this.props.changeDate(date)
                        }}
                        selectsStart
                        startDate={this.props.value}
                        endDate={this.props.secondField ? new Date(this.props.secondValue) : undefined}
                    />
                }
                {this.props.secondField ?
                    <label htmlFor="secondDate">-</label>
                    : null}
                {this.props.secondField ?
                    this.props.readOnly ?
                        <input
                            className="picker form-control"
                            type="text"
                            id="secondDate"
                            autoComplete="off"
                            value={DateService.GetDateForPicker(this.props.secondValue)}
                            readOnly
                        /> :
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className="form-control picker"
                            selected={new Date(this.props.secondValue)}
                            onChange={date => {
                                if (!date) {
                                    date = new Date();
                                }
                                if (this.props.changeSecondDate) {
                                    this.props.changeSecondDate(date)
                                }
                            }}
                            selectsEnd
                            startDate={new Date(this.props.value)}
                            endDate={new Date(this.props.secondValue)}
                            minDate={new Date(this.props.value)}
                        />
                    : null}
            </div>
        )
    }
}

export default DateTimePicker;