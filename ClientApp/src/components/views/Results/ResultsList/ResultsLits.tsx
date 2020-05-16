import React, { Component } from 'react';
import { ICompetition, IResult, ICompetitionType, ISportsman } from '../../../../@Types/types';
import DateHelper from '../../../../helpers/date.helper';

import './ResultsList.scss';

interface ResultsListProps {
    competitions: ICompetition[];
    results: IResult[];
    types: ICompetitionType[];
    sportsmen: ISportsman[];
    changeCompetitionHandler: (competition: ICompetition | null) => void;
}

class ResultsList extends Component<ResultsListProps> {
    renRows(): JSX.Element[] {
        let response: JSX.Element[] = [];
        const competitions = [...this.props.competitions];
        const results = [...this.props.results];
        const sportsmen = [...this.props.sportsmen];
        competitions.forEach((c: ICompetition, i: number) => {
            const firstPlace = sportsmen.find(s => s.id === results.find(r => r.competition === c.id && r.place === 1)?.sportsman);
            const secondPlace = sportsmen.find(s => s.id === results.find(r => r.competition === c.id && r.place === 2)?.sportsman);
            const thirdPlace = sportsmen.find(s => s.id === results.find(r => r.competition === c.id && r.place === 3)?.sportsman);
            const type = this.props.types.find(t => t.id === c.type)?.name;
            if (firstPlace && secondPlace && thirdPlace) {
                response.push(
                    <tr key={i}
                        onClick={() => this.props.changeCompetitionHandler(c)}>
                        <td>{c.title}</td>
                        <td>{type}</td>
                        <td>{DateHelper.GetShortDate(c.date_of_start)} - {DateHelper.GetShortDate(c.date_of_end)}</td>
                        <td>
                            {`${firstPlace.surname}. ${firstPlace.name[0]}. ${firstPlace.patronymic ? firstPlace.patronymic[0] + "." : ""}`}
                        </td>
                        <td>
                            {`${secondPlace.surname}. ${secondPlace.name[0]}. ${secondPlace.patronymic ? secondPlace.patronymic[0] + "." : ""}`}
                        </td>
                        <td>
                            {`${thirdPlace.surname}. ${thirdPlace.name[0]}. ${thirdPlace.patronymic ? thirdPlace.patronymic[0] + "." : ""}`}
                        </td>
                    </tr>
                )
            }
        })
        return response;
    }
    render() {
        return (
            <div className="results-list">
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Соревнование</th>
                            <th>Тип</th>
                            <th>Сроки проведения</th>
                            <th>1 место</th>
                            <th>2 место</th>
                            <th>3 место</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ResultsList