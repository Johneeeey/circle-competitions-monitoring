import React, { Component } from 'react';
import { ISportsman } from '../../../../@Types/types';

import ListItem from './ListItem';

import './SportsmenList.scss';

interface Props {
    sportsmen: ISportsman[];
}

class SportsmenList extends Component<Props> {
    render() {
        const sportsmen = this.props.sportsmen;
        return (
            <div className="sportsmen-list">
                {sportsmen.map((s: ISportsman, i: number) => (
                    <ListItem sportsman={s} key={i} />
                ))}

            </div>
        )
    }
}

export default SportsmenList;