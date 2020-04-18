import React, { Component } from 'react';
import { ICompetition, IUser, ICompetitionType } from '../../../../@Types/types';
import DateService from '../../../../services/dateService';

import './CompetitionsList.scss';

interface ListProps {
    user: IUser;
    competitions: ICompetition[];
    competitionTypes: ICompetitionType[];
    selectedCompetitionId: number;
    changeCompetition: (id: number) => void;
}

class CompetitionsList extends Component<ListProps>{

    renRows() {
        let response: JSX.Element[] = [];
        this.props.competitions.forEach((c: ICompetition, i: number) => {
            response.push(
                <tr key={i}
                    className={c.id === this.props.selectedCompetitionId ? "table-row table-active" : "table-row"}
                    onClick={e => this.props.changeCompetition(c.id)}>
                    <td>{c.title}</td>
                    <td>{this.props.competitionTypes.find(cT => c.type === cT.id)?.name}</td>
                    <td>{DateService.GetShortDateTime(c.date_of_start)}</td>
                    <td>{DateService.GetShortDateTime(c.date_of_end)}</td>
                    <td>{c.city}</td>
                </tr>)
        })
        return response;
    }

    render() {
        return (
            <div className="competitions-list">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Тип</th>
                            <th>Начало</th>
                            <th>Конец</th>
                            <th>Город</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renRows()}
                    </tbody>
                </table>
                {this.props.user && this.props.user.role === 2 ?
                    <button className="btn btn-success">
                        Добавить
                    </button>
                    : null}
            </div>
        )
    }
}

export default CompetitionsList;