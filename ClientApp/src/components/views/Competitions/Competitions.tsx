import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IUser, ICompetition, ICompetitionsState, ICompetitionType } from '../../../@Types/types';

import Filter from '../Filter';
import CompetitionsList from './CompetitionsList';

interface CompetitionsProps {
    user: IUser;
    competitions: ICompetition[];
    competitionTypes: ICompetitionType[];
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
                    user={this.props.user}
                    competitions={this.props.competitions}
                    competitionTypes={this.props.competitionTypes}
                    selectedCompetitionId={this.state.selectedCompetition} />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user.user,
    competitions: state.competition.competitions,
    competitionTypes: state.filter.types
})

export default connect(mapStateToProps)(Competitions);