import React, { Component } from 'react';
import { ICompetition, IUser, ICompetitionType } from '../../../../../@Types/types';

interface BodyProps {
    user: IUser;
    competitions: ICompetition[];
    competitionTypes: ICompetitionType[];
}

class ListBody extends Component<BodyProps>{

    renRows() {
        console.log(this.props.user);

        let response: JSX.Element[] = [];
        this.props.competitions.forEach((c: ICompetition, i: number) => {
            response.push(
                <tr key={i}>
                    <td>{this.props.competitionTypes.find(cT => c.type === cT.id)?.name}</td>
                    <td>{c.date_of_start}</td>
                    <td>{c.date_of_end}</td>
                    <td>{c.summary_addr}</td>
                    {this.props.user ?
                        <td>
                            <button className="btn btn-info">Зарегистрировать</button>
                        </td>
                        : null}
                </tr>)
        })
        return response;
    }

    render() {
        return (
            <tbody>
                {this.renRows()}
            </tbody>
        )
    }
}

export default ListBody;