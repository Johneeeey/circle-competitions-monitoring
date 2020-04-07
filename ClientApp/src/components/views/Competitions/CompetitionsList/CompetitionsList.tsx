import React, { Component } from 'react';
import { ICompetition, IUser, ICompetitionType } from '../../../../@Types/types';

import ListBody from './ListBody';

import './CompetitionsList.scss';

interface ListProps {
    user: IUser;
    competitions: ICompetition[];
    competitionTypes: ICompetitionType[];
    selectedCompetitionId: number;
}

class CompetitionsList extends Component<ListProps>{
    render() {
        return (
            <div className="competitions-list">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Начало</th>
                            <th>Конец</th>
                            <th>Адрес</th>
                            {this.props.user ? <th>Регистрация</th> : null}
                        </tr>
                    </thead>
                    <ListBody
                        user={this.props.user}
                        competitionTypes={this.props.competitionTypes}
                        competitions={this.props.competitions} />
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