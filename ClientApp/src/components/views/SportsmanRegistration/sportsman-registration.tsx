import React, { Component } from 'react';
import { IUser, ISportsman, Sportsman, IPassport, IBirthSertificate, ISportsmenListItem, Passport, BirthSertificate } from '../../../@Types/types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import SportsmenList from './SportsmenList';

import './SportsmanRegistration.scss';


interface IProps {
    user: IUser;
}
interface IState {
    sportsmen: ISportsmenListItem[];
}

class SportsmanRegistration extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            sportsmen:
                [
                    {
                        sportsman: new Sportsman(),
                        pass: null,
                        birthSertificate: null
                    }
                ]
        }
        this.addSportsman = this.addSportsman.bind(this);
        this.deleteSportsman = this.deleteSportsman.bind(this);
        this.nameChangeHangler = this.nameChangeHangler.bind(this);
        this.surnameChangeHangler = this.surnameChangeHangler.bind(this);
        this.patronymicChangeHangler = this.patronymicChangeHangler.bind(this);
        this.birthdayChangeHangler = this.birthdayChangeHangler.bind(this);
        this.rankChangeHangler = this.rankChangeHangler.bind(this);
        this.teamChangeHangler = this.teamChangeHangler.bind(this);
        this.passNumChangeHangler = this.passNumChangeHangler.bind(this);
        this.passSeriesChangeHangler = this.passSeriesChangeHangler.bind(this);
        this.passPlaceChangeHangler = this.passPlaceChangeHangler.bind(this);
        this.passOrgChangeHangler = this.passOrgChangeHangler.bind(this);
        this.passOrgCodeChangeHangler = this.passOrgCodeChangeHangler.bind(this);
        this.passDateChangeHangler = this.passDateChangeHangler.bind(this);
        this.birthSertSeriesChangeHangler = this.birthSertSeriesChangeHangler.bind(this);
        this.birthSertNumberChangeHangler = this.birthSertNumberChangeHangler.bind(this);
        this.birthSertPlaceChangeHangler = this.birthSertPlaceChangeHangler.bind(this);
        this.birthSertDateChangeHangler = this.birthSertDateChangeHangler.bind(this);
    }
    addSportsman() {
        const sportsmen = this.state.sportsmen;
        sportsmen.push({
            sportsman: new Sportsman(),
            pass: null,
            birthSertificate: null
        })
        this.setState({ sportsmen })
    }
    deleteSportsman(index: number) {
        const sportsmen = this.state.sportsmen;
        sportsmen.splice(index, 1);
        this.setState({ sportsmen });
    }

    nameChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.name = value;
        this.setState({ sportsmen });
    }
    surnameChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.surname = value;
        this.setState({ sportsmen });
    }
    patronymicChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.patronymic = value;
        this.setState({ sportsmen });
    }
    birthdayChangeHangler(id: number, value: Date) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.birthday = value;
        this.setState({ sportsmen });
    }
    rankChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.rank = value;
        this.setState({ sportsmen });
    }
    teamChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.team = value;
        this.setState({ sportsmen });
    }
    passNumChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen
        let pass = sportsmen[id].pass;
        if (pass) {
            pass.number = value;
        } else {
            pass = new Passport();
            pass.number = value;
        }
        sportsmen[id].pass = pass;
        this.setState({ sportsmen });
    }
    passSeriesChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen
        let pass = sportsmen[id].pass;
        if (pass) {
            pass.series = value;
        } else {
            pass = new Passport();
            pass.series = value;
        }
        sportsmen[id].pass = pass;
        this.setState({ sportsmen });
    }
    passPlaceChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen
        let pass = sportsmen[id].pass;
        if (pass) {
            pass.place_of_issue = value;
        } else {
            pass = new Passport();
            pass.place_of_issue = value;
        }
        sportsmen[id].pass = pass;
        this.setState({ sportsmen });
    }
    passOrgChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen
        let pass = sportsmen[id].pass;
        if (pass) {
            pass.organization_of_issue = value;
        } else {
            pass = new Passport();
            pass.organization_of_issue = value;
        }
        sportsmen[id].pass = pass;
        this.setState({ sportsmen });
    }
    passOrgCodeChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen
        let pass = sportsmen[id].pass;
        if (pass) {
            pass.code_of_organization = value;
        } else {
            pass = new Passport();
            pass.code_of_organization = value;
        }
        sportsmen[id].pass = pass;
        this.setState({ sportsmen });
    }
    passDateChangeHangler(id: number, value: Date) {
        const sportsmen = this.state.sportsmen
        let pass = sportsmen[id].pass;
        if (pass) {
            pass.date_of_issue = value;
        } else {
            pass = new Passport();
            pass.date_of_issue = value;
        }
        sportsmen[id].pass = pass;
        this.setState({ sportsmen });
    }
    birthSertSeriesChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen
        let birthSertificate = sportsmen[id].birthSertificate;
        if (birthSertificate) {
            birthSertificate.series = value;
        } else {
            birthSertificate = new BirthSertificate();
            birthSertificate.series = value;
        }
        sportsmen[id].birthSertificate = birthSertificate;
        this.setState({ sportsmen });
    }
    birthSertNumberChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen
        let birthSertificate = sportsmen[id].birthSertificate;
        if (birthSertificate) {
            birthSertificate.number = value;
        } else {
            birthSertificate = new BirthSertificate();
            birthSertificate.number = value;
        }
        sportsmen[id].birthSertificate = birthSertificate;
        this.setState({ sportsmen });
    }
    birthSertPlaceChangeHangler(id: number, value: string) {
        const sportsmen = this.state.sportsmen
        let birthSertificate = sportsmen[id].birthSertificate;
        if (birthSertificate) {
            birthSertificate.place_of_issue = value;
        } else {
            birthSertificate = new BirthSertificate();
            birthSertificate.place_of_issue = value;
        }
        sportsmen[id].birthSertificate = birthSertificate;
        this.setState({ sportsmen });
    }
    birthSertDateChangeHangler(id: number, value: Date) {
        const sportsmen = this.state.sportsmen
        let birthSertificate = sportsmen[id].birthSertificate;
        if (birthSertificate) {
            birthSertificate.date_of_issue = value;
        } else {
            birthSertificate = new BirthSertificate();
            birthSertificate.date_of_issue = value;
        }
        sportsmen[id].birthSertificate = birthSertificate;
        this.setState({ sportsmen });
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
                        deleteSportsman={this.deleteSportsman}
                        nameChangeHangler={this.nameChangeHangler}
                        surnameChangeHangler={this.surnameChangeHangler}
                        patronymicChangeHangler={this.patronymicChangeHangler}
                        birthdayChangeHangler={this.birthdayChangeHangler}
                        rankChangeHangler={this.rankChangeHangler}
                        teamChangeHangler={this.teamChangeHangler}
                        passNumChangeHangler={this.passNumChangeHangler}
                        passSeriesChangeHangler={this.passSeriesChangeHangler}
                        passPlaceChangeHangler={this.passPlaceChangeHangler}
                        passOrgChangeHangler={this.passOrgChangeHangler}
                        passOrgCodeChangeHangler={this.passOrgCodeChangeHangler}
                        passDateChangeHangler={this.passDateChangeHangler}
                        birthSertSeriesChangeHangler={this.birthSertSeriesChangeHangler}
                        birthSertNumberChangeHangler={this.birthSertNumberChangeHangler}
                        birthSertPlaceChangeHangler={this.birthSertPlaceChangeHangler}
                        birthSertDateChangeHangler={this.birthSertDateChangeHangler}
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