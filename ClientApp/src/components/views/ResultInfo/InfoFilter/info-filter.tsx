import React, { Component } from 'react';
import { ICompetition, ISportsman } from '../../../../@Types/types';

import './InfoFilter.scss';

interface InfoFilterProps {
    competitions: ICompetition[];
    selectedCompetition: ICompetition;
    participants: ISportsman[];
    selectedParticipant: ISportsman;
    stagesNums: number[];
    selectedStageNum: number;
    handleChangeCompetition: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangeParticipant: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleChangeStageNumber: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

class InfoFilter extends Component<InfoFilterProps> {
    render() {
        const competitions = this.props.competitions;
        const comp = this.props.selectedCompetition;
        const participants = this.props.participants;
        const part = this.props.selectedParticipant;
        const stagesNums = this.props.stagesNums;
        const stage = this.props.selectedStageNum;
        return (
            <div className="info-filter">
                <div className="info-filter__competitions">
                    <label htmlFor="competitions">Соревнования: </label>
                    <select name="competitions"
                        value={comp?.id}
                        id="competitions"
                        onChange={this.props.handleChangeCompetition}
                        className="form-control">
                        {competitions && competitions.map((c: ICompetition, i: number) => (
                            <option value={c.id} key={i}>{c.title}</option>
                        ))}
                    </select>
                </div>
                {participants && part ?
                    <div className="info-filter__participants">
                        <label htmlFor="participants">Участники: </label>
                        <select name="partitcpants"
                            value={part?.id}
                            id="participants"
                            onChange={this.props.handleChangeParticipant}
                            className="form-control">
                            {participants && participants.map((p: ISportsman, i: number) => (
                                <option value={p.id} key={i}>{p.surname + ". " + p.name[0] + ". " + (p.patronymic ? p.patronymic[0] + "." : "")}</option>
                            ))}
                        </select>
                    </div>
                    : null
                }
                <div className="info-filter__stages">
                    <label htmlFor="stages">Стадия: </label>
                    <select name="stages"
                        value={stage}
                        id="stages"
                        onChange={this.props.handleChangeStageNumber}
                        className="form-control">
                        {stagesNums && stagesNums.map((s: number, i: number) => (
                            <option value={s} key={i}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}

export default InfoFilter;