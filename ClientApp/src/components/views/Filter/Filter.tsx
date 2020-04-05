import React, { Component } from 'react';
import { ICompetitionType, IUser } from '../../../@Types/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import { ChangeFilterSearch, ChangeFilterType } from '../../../actions/FilterActions'

import './Filter.scss';

interface FilterProps {
    user: IUser;
    search: string;
    types: ICompetitionType[];
    selectedType: number;
    changeSearch: (search: string) => void;
    changeType: (newType: number) => void;
}

class Filter extends Component<FilterProps> {
    constructor(props: FilterProps) {
        super(props);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    renOptions(): JSX.Element[] {
        let ren: JSX.Element[] = [];
        this.props.types.forEach((t: ICompetitionType, i: number) => ren.push(<option key={i}>{t.name}</option>));
        return ren;
    }

    handleTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let selectedType = this.props.types.find(t => t.name === event.target.value)?.id as number;
        this.props.changeType(selectedType);
    }

    render() {
        let selectedValue = this.props.types.find(t => t.id === this.props.selectedType)?.name;
        return (
            <div className="filter">
                <div className="type-filter">
                    <label htmlFor="type-select">Тип</label>
                    <select id="type-select"
                        className="type-select"
                        onChange={this.handleTypeChange}
                        value={selectedValue}
                    >
                        {this.renOptions()}
                    </select>
                </div>
                <div className="search-block">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Поиск..."
                        value={this.props.search}
                        onChange={e => this.props.changeSearch(e.target.value)} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user,
    search: state.filter.search,
    types: state.filter.types,
    selectedType: state.filter.selectedType
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeSearch: (search: string) => dispatch(ChangeFilterSearch(search) as any),
    changeType: (newType: number) => dispatch(ChangeFilterType(newType) as any)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));