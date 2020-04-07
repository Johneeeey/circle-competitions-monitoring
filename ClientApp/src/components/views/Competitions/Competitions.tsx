import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IUser, ICompetition, ICompetitionsState } from '../../../@Types/types';

import Filter from '../Filter';
import CompetitionsList from './CompetitionsList';

interface CompetitionsProps {
    user: IUser;
    competitions: ICompetition[];
    selectedCompetitions: ICompetition
}
interface CompetitionsState {
    selectedCompetition: number;
}

class Competitions extends Component<CompetitionsProps, CompetitionsState>{
    constructor(props: CompetitionsProps) {
        super(props);
        this.state = {
            selectedCompetition: props.competitions[0]?.id ? props.competitions[0].id : 0
        }
    }
    render() {
        return (
            <div className="competitions-container">
                <Filter />
                <CompetitionsList
                    competitions={this.props.competitions}
                    selectedCompetitionId={this.state.selectedCompetition} />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user,
    competitions: state.competition.competitions
})

export default connect(mapStateToProps)(Competitions);