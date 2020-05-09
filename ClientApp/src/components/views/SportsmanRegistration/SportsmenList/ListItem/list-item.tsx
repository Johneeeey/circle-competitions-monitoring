import React, { Component } from 'react';
import { ISportsman } from '../../../../../@Types/types';

import './ListItem.scss';

interface Props {
    sportsman: ISportsman
}

class ListItem extends Component<Props> {
    render() {
        const sportsman = this.props.sportsman;
        return (
            <div className="list-item">
                <h5>тудуц</h5>
            </div>
        )
    }
}

export default ListItem;