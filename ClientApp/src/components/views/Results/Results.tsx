import React, { Component } from 'react';
import { IUser, ICompetition, ICompetitionType, IResult, IStage, ICircle, ISportsman } from '../../../@Types/types';
import { connect } from 'react-redux';

import Filter from '../Filter';
import ResultsList from './ResultsList';

import './Results.scss';

interface ResultsProps {
    user: IUser;
    competitions: ICompetition[];
    results: IResult[];
    stages: IStage[];
    circles: ICircle[];
    sportsmen: ISportsman[];
    competitionTypes: ICompetitionType[];
    searchString: string;
    selectedType: number | null;
}

class Results extends Component<ResultsProps> {
    render() {
        let competitions = [...this.props.competitions];
        const results = [...this.props.results];
        const sportsmen = [...this.props.sportsmen];
        const types = [...this.props.competitionTypes];
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
            <div className="results">
                <Filter />
                <ResultsList
                    competitions={competitions}
                    results={results}
                    types={types}
                    sportsmen={sportsmen}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user.user,
    competitions: state.competition.competitions,
    results: state.result.results,
    stages: state.result.stages,
    circles: state.result.circles,
    sportsmen: state.sportsman.sportsmen,
    competitionTypes: state.filter.types,
    searchString: state.filter.search,
    selectedType: state.filter.selectedType
})

export default connect(mapStateToProps)(Results);