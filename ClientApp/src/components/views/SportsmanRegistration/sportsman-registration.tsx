import React, { Component } from 'react';
import { IUser, ISportsman, Sportsman } from '../../../@Types/types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import SportsmenList from './SportsmenList';

import './SportsmanRegistration.scss';

interface IProps {
    user: IUser;
}
interface IState {
    sportsmen: ISportsman[];
}

class SportsmanRegistration extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            sportsmen: []
        }
        this.addSportsman = this.addSportsman.bind(this);
    }
    addSportsman() {
        this.setState({
            sportsmen: [...this.state.sportsmen, new Sportsman()]
        })
    }
    render() {
        const user = this.props.user;
        const sportsmen = this.state.sportsmen;
        // if (!user || user.role !== 2) {
        //     return <Redirect to="/" />
        // }
        return (
            <div className="sportsman-registration-container container-fluid">
                <div className="reg-body">
                    <div className="body-header">
                        <h4>Заполните форму</h4>
                    </div>
                    <SportsmenList
                        sportsmen={sportsmen}
                    />
                    <div className="add-sportsman"
                        onClick={this.addSportsman}>
                        <span>Добавить спортсмена</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user.user
})

export default connect(mapStateToProps)(SportsmanRegistration);