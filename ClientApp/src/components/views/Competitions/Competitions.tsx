import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IUser, ICompetition, ICompetitionsState, ICompetitionType, Competition } from '../../../@Types/types';

import Filter from '../Filter';
import CompetitionsList from './CompetitionsList';
import CompetitionDetail from './CompetitionDetail';

interface CompetitionsProps {
    user: IUser;
    competitions: ICompetition[];
    competitionTypes: ICompetitionType[];
}
interface CompetitionsState {
    selectedCompetition: ICompetition | null;
}

class Competitions extends Component<CompetitionsProps, CompetitionsState>{
    constructor(props: CompetitionsProps) {
        super(props);
        this.state = {
            selectedCompetition: null
        }
        this.handleChangeCompetition=this.handleChangeCompetition.bind(this);
    }

    componentDidUpdate(prevProps: CompetitionsProps, prevState: CompetitionsState) {
        if (prevProps.competitions.length !== this.props.competitions.length) {
            this.setState({
                selectedCompetition: this.props.competitions[0]
            })
        }
    }

    handleChangeCompetition(id: number) {
        const competition = this.props.competitions.find(c => c.id === id) as Competition;
        this.setState({ selectedCompetition: competition });
    }

    render() {
        const competition = this.state.selectedCompetition;
        return (
            <div className="competitions-container">
                <Filter />
                <CompetitionsList
                    user={this.props.user}
                    competitions={this.props.competitions}
                    competitionTypes={this.props.competitionTypes}
                    selectedCompetitionId={competition ? competition.id : 0}
                    changeCompetition={this.handleChangeCompetition} />
                <CompetitionDetail
                    competition={competition ? competition : new Competition()}
                />
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