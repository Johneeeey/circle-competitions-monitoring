import React, { Component } from 'react';
import { IUser, ISportsman, Sportsman, IPassport, IBirthSertificate, ISportsmenListItem, Passport, BirthSertificate, ICompetition, Competition } from '../../../@Types/types';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import SportsmanService from '../../../services/sportsmanService';

import SportsmenList from './SportsmenList';

import './SportsmanRegistration.scss';

interface MatchParams {
    id?: string
}
interface IProps extends RouteComponentProps<MatchParams> {
    user: IUser;
    competitions: ICompetition[];
}
interface IState {
    sportsmen: ISportsmenListItem[];
    competition: ICompetition;
    areFromsValid: boolean;
    redirect: boolean;
}

class SportsmanRegistration extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            competition: new Competition(),
            sportsmen:
                [
                    {
                        sportsman: new Sportsman(),
                        pass: new Passport(),
                        birthSertificate: null
                    }
                ],
            areFromsValid: false,
            redirect: false
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
        this.validationStatusChangeHandler = this.validationStatusChangeHandler.bind(this);
        this.docTypeChangeHandler = this.docTypeChangeHandler.bind(this);
        this.save = this.save.bind(this);
    }
    componentDidMount() {
        const id = Number(this.props.match.params.id);
        const competition = this.props.competitions.find(c => c.id === id) || new Competition();
        this.setState({ competition: JSON.parse(JSON.stringify(competition)) });
    }
    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const id = Number(this.props.match.params.id);
        const comp = this.props.competitions.find(c => c.id === id) || new Competition();
        if (prevProps.competitions.length !== this.props.competitions.length) {
            this.setState({ competition: JSON.parse(JSON.stringify(comp)) });
        }
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
    docTypeChangeHandler(id: number, value: number) {
        const sportsmen = this.state.sportsmen;
        if (value === 0) {
            sportsmen[id].pass = new Passport();
            sportsmen[id].birthSertificate = null;
        } else if (value === 1) {
            sportsmen[id].pass = null;
            sportsmen[id].birthSertificate = new BirthSertificate();
        }
        this.setState({ sportsmen });
    }

    validationStatusChangeHandler(val: boolean) {
        this.setState({ areFromsValid: val })
    }

    save() {
        const sportsmen = this.state.sportsmen;
        const competition = this.state.competition;
        sportsmen.forEach((s: ISportsmenListItem) => {
            if (s.pass) {
                SportsmanService.SavePassport(s.pass)
                    .then((pass: IPassport) => {
                        s.sportsman.pass = pass.id;
                        SportsmanService.SaveSportsman(s.sportsman)
                            .then((sportsman: ISportsman) => {
                                SportsmanService.SaveParticipant({
                                    id: 0,
                                    sportsman: sportsman.id,
                                    competition: competition.id,
                                    payment_amount: 0,
                                    payment_date: new Date(),
                                    payment_type: ""
                                })
                                    .then(() => {
                                        this.setState({ redirect: true });
                                    });
                            });
                    });
            } else if (s.birthSertificate) {
                SportsmanService.SaveBirthSertificate(s.birthSertificate)
                    .then((bSert: IBirthSertificate) => {
                        s.sportsman.birth_sertificate = bSert.id;
                        SportsmanService.SaveSportsman(s.sportsman)
                            .then((sportsman: ISportsman) => {
                                SportsmanService.SaveParticipant({
                                    id: 0,
                                    sportsman: sportsman.id,
                                    competition: competition.id,
                                    payment_amount: 0,
                                    payment_date: new Date(),
                                    payment_type: ""
                                })
                                    .then(() => {
                                        this.setState({ redirect: true });
                                    });
                            });
                    });
            }
        });
    }

    render() {
        const user = this.props.user;
        const sportsmen = this.state.sportsmen;
        if (this.state.redirect || (!user || user.role !== 2)) {
            return <Redirect to="/" />
        }
        return (
            <div className="sportsman-registration-container container-fluid">
                <div className="reg-body">
                    <div className="body-header">
                        <h4>Заполните форму</h4>
                    </div>
                    <SportsmenList
                        competition={this.state.competition}
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
                        validationStatusChangeHandler={this.validationStatusChangeHandler}
                        docTypeChangeHandler={this.docTypeChangeHandler}
                    />
                    <div className="add-sportsman"
                        onClick={this.addSportsman}>
                        <span>Добавить спортсмена</span>
                    </div>
                    <button
                        className={this.state.areFromsValid ? "btn btn-primary" : "btn btn-secondary"}
                        disabled={!this.state.areFromsValid}
                        onClick={() => this.save()}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user.user,
    competitions: state.competition.competitions
})

export default connect(mapStateToProps)(SportsmanRegistration);