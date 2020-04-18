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
    searchString: string;
    selectedType: number | null;
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
        this.handleChangeCompetition = this.handleChangeCompetition.bind(this);
    }

    componentDidMount() {
        this.setState({
            selectedCompetition: this.props.competitions[0] || new Competition()
        })
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
        const selectedCompetition = this.state.selectedCompetition;
        let competitions = this.props.competitions;
        const type = this.props.selectedType;
        const search = this.props.searchString;
        if (type || search.length > 0) {
            if (type) {
                competitions = competitions.filter(c => c.type === type);
            }
            if (search.length > 0) {
                competitions = competitions.filter(c => c.title.search(search) !== -1);
            }
        }
        return (
            <div className="competitions-container">
                <Filter />
                <CompetitionsList
                    user={this.props.user}
                    competitions={competitions}
                    competitionTypes={this.props.competitionTypes}
                    selectedCompetitionId={selectedCompetition ? selectedCompetition.id : 0}
                    changeCompetition={this.handleChangeCompetition} />
                <CompetitionDetail
                    competition={selectedCompetition ? selectedCompetition : new Competition()}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user.user,
    competitions: state.competition.competitions,
    competitionTypes: state.filter.types,
    searchString: state.filter.search,
    selectedType: state.filter.selectedType
})

export default connect(mapStateToProps)(Competitions);