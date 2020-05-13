import React, { Component } from 'react';
import { ICompetition, ICompetitionType, IStage_Info } from '../../../../@Types/types';
import DateTimePicker from '../../../widgets/DateTimePicker';
import { Redirect } from 'react-router';

import './InfoOptions.scss';

interface OptionsProps {
    readonly: boolean;
    competition: ICompetition;
    stages: IStage_Info[];
    types: ICompetitionType[];
    selectedType: string;
    handleChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangeCity: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeStageCount: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeStreet: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeHouse: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeBuilding: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeFlat: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeOrganizer: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeEntryFee: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeAgeLimit: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeStageCircleCount: (idx: number, value: number) => void;
    handleChangeStageComment: (idx: number, value: string) => void;
    handleChangeStartDate: (date: Date) => void;
    handleChangeEndDate: (date: Date) => void;
    handleChangeReadOnly: () => void;
    save: () => void;
    backup: () => void;
    errorMsg: string;
    isValid: boolean;
}
interface OptionsState {
    redirect: boolean;
}

class InfoOptions extends Component<OptionsProps, OptionsState>{
    constructor(props: OptionsProps) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    renOptions(): JSX.Element[] {
        let ren: JSX.Element[] = [];
        this.props.types.forEach((t: ICompetitionType, i: number) => ren.push(<option key={i}>{t.name}</option>));
        return ren;
    }

    renStageListItem(): JSX.Element[] {
        const response: JSX.Element[] = [];
        const stages = this.props.stages;
        stages.forEach((s: IStage_Info, i: number) => {
            response.push(
                <div
                    key={i}
                    className="list_item">
                    <h6>Стадия №{i + 1}</h6>
                    <div className="list_item__circle_count">
                        <label htmlFor="circle_count">Количество кругов</label>
                        <input
                            type="number"
                            min={1}
                            id="circle_count"
                            className="form-control"
                            readOnly={this.props.readonly}
                            value={s.circle_count || ""}
                            placeholder="#"
                            onChange={event =>
                                this.props.handleChangeStageCircleCount(i, Number(event.target.value))}
                        />
                    </div>
                    <div className="list_item__stage_comment">
                        <label htmlFor="comment">Комментарий</label>
                        <input
                            type="text"
                            maxLength={100}
                            id="comment"
                            className="form-control"
                            readOnly={this.props.readonly}
                            value={s.comment || ""}
                            placeholder="Комментарий к стадии"
                            onChange={event => this.props.handleChangeStageComment(i, event.target.value)}
                        />
                    </div>
                </div>
            )
        })
        return response;
    }

    render() {
        const competition = this.props.competition;
        const readOnly = this.props.readonly;
        const selectedType = this.props.selectedType;
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        return (
            <div className="info-options">
                <div className="custom-control custom-switch">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitch1"
                        checked={!readOnly}
                        onChange={this.props.handleChangeReadOnly} />
                    <label
                        className="custom-control-label"
                        htmlFor="customSwitch1">
                        Редактировать
                            </label>
                </div>
                <div className="title">
                    <label htmlFor="title">Название</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        readOnly={readOnly}
                        value={competition.title || ""}
                        placeholder="Название соревнования"
                        onChange={this.props.handleChangeTitle} />
                </div>
                <div className="type">
                    <label htmlFor="type">Тип соревнования</label>
                    <select
                        name="type"
                        id="type"
                        disabled={readOnly}
                        className="form-control"
                        value={selectedType}
                        onChange={this.props.handleChangeType}>
                        {this.renOptions()}
                    </select>
                </div>
                <DateTimePicker
                    readOnly={readOnly}
                    value={competition.date_of_start}
                    secondValue={competition.date_of_end}
                    secondField={true}
                    changeDate={this.props.handleChangeStartDate}
                    changeSecondDate={this.props.handleChangeEndDate}
                />
                <div className="stages-info">
                    <label htmlFor="stage_count">Количество стадий</label>
                    <input
                        type="number"
                        min={1}
                        onKeyDown={() => { return false; }}
                        className="form-control stages-info__stage_count"
                        id="stage_count"
                        readOnly={readOnly}
                        value={competition.stage_count || ""}
                        placeholder="#"
                        onChange={this.props.handleChangeStageCount}
                    />
                    <div className="stages-info__stage_list">
                        {this.renStageListItem()}
                    </div>
                </div>
                <div className="city">
                    <label htmlFor="city">Город</label>
                    <input
                        type="text"
                        className="form-control city"
                        id="city"
                        readOnly={readOnly}
                        value={competition.city || ""}
                        placeholder="Город"
                        onChange={this.props.handleChangeCity}
                    />
                </div>
                <div className="street">
                    <label htmlFor="street">Улица</label>
                    <input
                        type="text"
                        className="form-control"
                        id="street"
                        readOnly={readOnly}
                        value={competition.street || ""}
                        placeholder="Улица"
                        onChange={this.props.handleChangeStreet} />
                </div>
                <div className="house">
                    <label htmlFor="house">Дом</label>
                    <input
                        type="text"
                        className="form-control"
                        id="house"
                        readOnly={readOnly}
                        value={competition.house_num || ""}
                        placeholder="№"
                        onChange={this.props.handleChangeHouse} />
                </div>
                <div className="building">
                    <label htmlFor="building">Строение</label>
                    <input
                        type="text"
                        className="form-control"
                        id="building"
                        readOnly={readOnly}
                        value={competition.building || ""}
                        placeholder="№"
                        onChange={this.props.handleChangeBuilding} />
                </div>
                <div className="flat">
                    <label htmlFor="flat">Помещение</label>
                    <input
                        type="text"
                        className="form-control"
                        id="flat"
                        readOnly={readOnly}
                        value={competition.office_flat || ""}
                        placeholder="№"
                        onChange={this.props.handleChangeFlat} />
                </div>
                <div className="organizer">
                    <label htmlFor="organizer">Организатор</label>
                    <input
                        type="text"
                        className="form-control"
                        id="organizer"
                        readOnly={readOnly}
                        value={competition.organizer || ""}
                        placeholder="Организатор мероприятия"
                        onChange={this.props.handleChangeOrganizer} />
                </div>
                <div className="fee">
                    <label htmlFor="fee">Взнос</label>
                    <input
                        type="number"
                        className="form-control"
                        id="fee"
                        readOnly={readOnly}
                        value={competition.entry_fee || 0}
                        min={0}
                        placeholder="Взнос"
                        onChange={this.props.handleChangeEntryFee} />
                </div>
                <div className="age">
                    <label htmlFor="age">Возраст</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        readOnly={readOnly}
                        value={competition.age_limit || 0}
                        min={0}
                        placeholder="Возраст"
                        onChange={this.props.handleChangeAgeLimit} />
                </div>
                {!readOnly &&
                    <div className="btn-container">
                        <button
                            title={this.props.errorMsg}
                            className="btn btn-info"
                            onClick={() => this.props.save()}
                            disabled={!this.props.isValid}
                        >
                            Сохранить
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => {
                                this.setState({ redirect: true })
                            }}
                        >
                            Отмена
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default InfoOptions