import React, { Component } from 'react';
import { IUser, ISportsman, Sportsman, IPassport, IBirthSertificate, ISportsmenListItem, Passport, BirthSertificate, ICompetition, Competition, IPaymentParticipant } from '../../../@Types/types';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import SportsmanService from '../../../services/sportsman.service';
import { Dispatch } from 'redux';
import { response, request } from '../../../actions/user.action';

import SportsmenList from './SportsmenList';

import './SportsmanRegistration.scss';
import '../../../styles/_buttons.scss';

interface MatchParams {
    id?: string
}
interface IProps extends RouteComponentProps<MatchParams> {
    user: IUser;
    competitions: ICompetition[];
    request: () => void;
    response: () => void;
}
interface IState {
    showAlert: boolean;
    sportsmen: ISportsmenListItem[];
    competition: ICompetition;
    areFormsValid: boolean;
    redirect: boolean;
}

class SportsmanRegistration extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            showAlert: true,
            competition: new Competition(),
            sportsmen:
                [
                    {
                        sportsman: new Sportsman(),
                        pass: new Passport(),
                        birthSertificate: null,
                        receipt: ""
                    }
                ],
            areFormsValid: false,
            redirect: false
        }
        this.addSportsman = this.addSportsman.bind(this);
        this.deleteSportsman = this.deleteSportsman.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.surnameChangeHandler = this.surnameChangeHandler.bind(this);
        this.patronymicChangeHandler = this.patronymicChangeHandler.bind(this);
        this.birthdayChangeHandler = this.birthdayChangeHandler.bind(this);
        this.rankChangeHandler = this.rankChangeHandler.bind(this);
        this.teamChangeHandler = this.teamChangeHandler.bind(this);
        this.passNumChangeHandler = this.passNumChangeHandler.bind(this);
        this.passSeriesChangeHangder = this.passSeriesChangeHangder.bind(this);
        this.passPlaceChangeHandler = this.passPlaceChangeHandler.bind(this);
        this.passOrgChangeHadgler = this.passOrgChangeHadgler.bind(this);
        this.passOrgCodeChangeHandler = this.passOrgCodeChangeHandler.bind(this);
        this.passDateChangeHandler = this.passDateChangeHandler.bind(this);
        this.birthSertSeriesChangeHandler = this.birthSertSeriesChangeHandler.bind(this);
        this.birthSertNumberChangeHandler = this.birthSertNumberChangeHandler.bind(this);
        this.birthSertPlaceChangeHandler = this.birthSertPlaceChangeHandler.bind(this);
        this.birthSertDateChangeHandler = this.birthSertDateChangeHandler.bind(this);
        this.validationStatusChangeHandler = this.validationStatusChangeHandler.bind(this);
        this.docTypeChangeHandler = this.docTypeChangeHandler.bind(this);
        this.receiptChangeHandler = this.receiptChangeHandler.bind(this);
        this.save = this.save.bind(this);
    }
    componentDidMount() {
        const id = Number(this.props.match.params.id);
        const competition = this.props.competitions.find(c => c.id === id) || new Competition();
        this.setState({
            competition: JSON.parse(JSON.stringify(competition)),
            showAlert: competition.entry_fee > 0 ? true : false
        });
    }
    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const id = Number(this.props.match.params.id);
        const comp = this.props.competitions.find(c => c.id === id) || new Competition();
        if (prevProps.competitions.length !== this.props.competitions.length) {
            this.setState({
                competition: JSON.parse(JSON.stringify(comp)),
                showAlert: comp.entry_fee > 0 ? true : false
            });
        }
    }


    addSportsman() {
        const sportsmen = this.state.sportsmen;
        sportsmen.push({
            sportsman: new Sportsman(),
            pass: null,
            birthSertificate: null,
            receipt: ""
        })
        this.setState({ sportsmen })
    }
    deleteSportsman(index: number) {
        const sportsmen = this.state.sportsmen;
        sportsmen.splice(index, 1);
        this.setState({ sportsmen });
    }

    nameChangeHandler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.name = value;
        this.setState({ sportsmen });
    }
    surnameChangeHandler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.surname = value;
        this.setState({ sportsmen });
    }
    patronymicChangeHandler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.patronymic = value;
        this.setState({ sportsmen });
    }
    birthdayChangeHandler(id: number, value: Date) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.birthday = value;
        this.setState({ sportsmen });
    }
    rankChangeHandler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.rank = value;
        this.setState({ sportsmen });
    }
    teamChangeHandler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].sportsman.team = value;
        this.setState({ sportsmen });
    }
    passNumChangeHandler(id: number, value: string) {
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
    passSeriesChangeHangder(id: number, value: string) {
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
    passPlaceChangeHandler(id: number, value: string) {
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
    passOrgChangeHadgler(id: number, value: string) {
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
    passOrgCodeChangeHandler(id: number, value: string) {
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
    passDateChangeHandler(id: number, value: Date) {
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
    birthSertSeriesChangeHandler(id: number, value: string) {
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
    birthSertNumberChangeHandler(id: number, value: string) {
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
    birthSertPlaceChangeHandler(id: number, value: string) {
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
    birthSertDateChangeHandler(id: number, value: Date) {
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
    receiptChangeHandler(id: number, value: string) {
        const sportsmen = this.state.sportsmen;
        sportsmen[id].receipt = value;
        this.setState({ sportsmen });
    }

    validationStatusChangeHandler(val: boolean) {
        this.setState({ areFormsValid: val })
    }

    save() {
        const sportsmen = this.state.sportsmen;
        const competition = this.state.competition;
        sportsmen.forEach((s: ISportsmenListItem) => {
            this.props.request();
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
                                    receipt: null,
                                    status: 1
                                })
                                    .then((participant: IPaymentParticipant) => {
                                        if (s.receipt) {
                                            SportsmanService.getBlobFromImage(s.receipt)
                                                .then(img => {
                                                    const formData = new FormData();
                                                    formData.append("File", img);
                                                    SportsmanService.AddReceptToParticipant(formData, participant.id);
                                                })
                                                .then(() => {
                                                    this.props.response();
                                                    this.setState({ redirect: true });
                                                });
                                        } else {
                                            this.props.response();
                                            this.setState({ redirect: true });
                                        }
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
                                    receipt: null,
                                    status: 1
                                })
                                    .then((participant: IPaymentParticipant) => {
                                        if (s.receipt) {
                                            SportsmanService.getBlobFromImage(s.receipt)
                                                .then(img => {
                                                    const formData = new FormData();
                                                    formData.append("File", img);
                                                    SportsmanService.AddReceptToParticipant(formData, participant.id);
                                                })
                                                .then(() => {
                                                    this.props.response();
                                                    this.setState({ redirect: true });
                                                })
                                        } else {
                                            this.props.response();
                                            this.setState({ redirect: true });
                                        }
                                    });
                            });
                    });
            }
        });
    }

    render() {
        const user = this.props.user;
        const sportsmen = this.state.sportsmen;
        if (this.state.redirect || !user) {
            return <Redirect to="/" />
        }
        return (
            <div className="sportsman-registration-container container-fluid">
                <div className="reg-body">
                    {this.state.showAlert &&
                        <div className="payment-alert">
                            <p>Для регистрации необходимо заранее оплатить первичный взнос и сохранить чек</p>
                            <button
                                onClick={() => this.setState({ showAlert: false })}
                                className="btn btn-close" />
                        </div>
                    }
                    <div className="body-header">
                        <h4>Заполните форму</h4>
                    </div>
                    <SportsmenList
                        competition={this.state.competition}
                        sportsmen={sportsmen}
                        deleteSportsman={this.deleteSportsman}
                        nameChangeHandler={this.nameChangeHandler}
                        surnameChangeHandler={this.surnameChangeHandler}
                        patronymicChangeHandler={this.patronymicChangeHandler}
                        birthdayChangeHandler={this.birthdayChangeHandler}
                        rankChangeHandler={this.rankChangeHandler}
                        teamChangeHandler={this.teamChangeHandler}
                        passNumChangeHandler={this.passNumChangeHandler}
                        passSeriesChangeHangder={this.passSeriesChangeHangder}
                        passPlaceChangeHandler={this.passPlaceChangeHandler}
                        passOrgChangeHadgler={this.passOrgChangeHadgler}
                        passOrgCodeChangeHandler={this.passOrgCodeChangeHandler}
                        passDateChangeHandler={this.passDateChangeHandler}
                        birthSertSeriesChangeHandler={this.birthSertSeriesChangeHandler}
                        birthSertNumberChangeHandler={this.birthSertNumberChangeHandler}
                        birthSertPlaceChangeHandler={this.birthSertPlaceChangeHandler}
                        birthSertDateChangeHandler={this.birthSertDateChangeHandler}
                        validationStatusChangeHandler={this.validationStatusChangeHandler}
                        docTypeChangeHandler={this.docTypeChangeHandler}
                        receiptChangeHandler={this.receiptChangeHandler}
                    />
                    <div className="add-sportsman"
                        onClick={this.addSportsman}>
                        <span>Добавить спортсмена</span>
                    </div>
                    <button
                        className={this.state.areFormsValid ? "btn btn-primary" : "btn btn-secondary"}
                        disabled={!this.state.areFormsValid}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
    request: () => dispatch(request()),
    response: () => dispatch(response())
})

export default connect(mapStateToProps, mapDispatchToProps)(SportsmanRegistration);