import React, { Component } from 'react';
import { ICompetition } from '../../../../../@Types/types';

interface BodyProps {
    competitions: ICompetition[];
}

class ListBody extends Component<BodyProps>{

    renRows() {
        let response: JSX.Element[] = [];
        this.props.competitions.forEach(c => {
            response.push(
                <tr>
                    <td>{c.type}</td>
                    <td>{c.date_of_start}</td>
                    <td>{c.date_of_end}</td>
                    <td>{c.summary_addr}</td>
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