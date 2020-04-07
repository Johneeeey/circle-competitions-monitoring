import React, { Component } from 'react';
import { ICompetition } from '../../../../@Types/types';

import ListBody from './ListBody';

import './CompetitionsList.scss';

interface ListProps {
    competitions: ICompetition[];
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
                        </tr>
                    </thead>
                    <ListBody
                        competitions={this.props.competitions} />
                </table>
            </div>
        )
    }
}

export default CompetitionsList;