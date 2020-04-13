import React, { Component } from 'react';
import { ICompetition } from '../../../../@Types/types';

import './CompetitionDetail.scss';

interface DetailProps {
    competition: ICompetition;
}

class CompetitionDetail extends Component<DetailProps> {
    render() {
        return (
            <div className="competition-detail">
                <h3>{this.props.competition.title}</h3>
            </div>
        )
    }
}

export default CompetitionDetail;