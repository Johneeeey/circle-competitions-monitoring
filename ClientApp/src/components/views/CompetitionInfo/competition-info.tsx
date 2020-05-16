import React, { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { ICompetition, ICompetitionType, Competition, IUser, IStage_Info } from '../../../@Types/types';
import { connect } from 'react-redux';
import InfoOptions from './info-options';
import InfoMap from './info-map';
import { Dispatch } from 'redux';
import { SaveCompetition } from '../../../actions/competition.action';
import competitionService from '../../../services/competition.service';

import './CompetitionInfo.scss';

interface MatchParams {
    id?: string
}

interface InfoProps extends RouteComponentProps<MatchParams> {
    user: IUser;
    types: ICompetitionType[];
    competitions: ICompetition[];
    saveCompetition: (competition: ICompetition) => void;
}
interface InfoState {
    competition: ICompetition;
    stages: IStage_Info[];
    prevStateCompetition: ICompetition;
    readOnly: boolean;
    redirect: boolean;
    mapCenter: [number, number];
    isValid: boolean;
    errorMessage: string;
}

class CompetitionInfo extends Component<InfoProps, InfoState> {
    constructor(props: InfoProps) {
        super(props);
        this.state = {
            competition: new Competition(),
            stages: [],
            prevStateCompetition: new Competition(),
            redirect: false,
            readOnly: true,
            mapCenter: [56.12909762217289, 40.40531158447266],
            isValid: false,
            errorMessage: ""
        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeStageCount = this.handleChangeStageCount.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeStreet = this.handleChangeStreet.bind(this);
        this.handleChangeHouse = this.handleChangeHouse.bind(this);
        this.handleChangeBuilding = this.handleChangeBuilding.bind(this);
        this.handleChangeFlat = this.handleChangeFlat.bind(this);
        this.handleChangeOrganizer = this.handleChangeOrganizer.bind(this);
        this.handleChangeEntryFee = this.handleChangeEntryFee.bind(this);
        this.handleChangeAgeLimit = this.handleChangeAgeLimit.bind(this);
        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
        this.handleChangeLatLng = this.handleChangeLatLng.bind(this);
        this.handleChangeReadOnly = this.handleChangeReadOnly.bind(this);
        this.handleChangeStageCircleCount = this.handleChangeStageCircleCount.bind(this);
        this.handleChangeStageComment = this.handleChangeStageComment.bind(this);
        this.handleChangeOrgEmail = this.handleChangeOrgEmail.bind(this);
        this.handleChangeOrgBankAccount = this.handleChangeOrgBankAccount.bind(this);
        this.save = this.save.bind(this);
        this.backup = this.backup.bind(this);
        this.validation = this.validation.bind(this);
    }
    componentDidMount() {
        const id = Number(this.props.match.params.id);
        const competition = this.props.competitions.find(c => c.id === id) || new Competition();
        competitionService.GetCompetitionStagesInfo(competition.id)
            .then((stages: IStage_Info[]) => {
                this.setState({
                    readOnly: competition.id === 0 ? false : true,
                    competition: JSON.parse(
                        JSON.stringify(competition)
                    ),
                    stages: stages.length > 0 ? stages : [{
                        id: 0,
                        stage_number: 1,
                        competition: competition.id,
                        circle_count: 1,
                        comment: ""
                    }],
                    prevStateCompetition: JSON.parse(
                        JSON.stringify(competition)
                    ),
                    mapCenter: [
                        competition.lat === 0 ?
                            56.12909762217289 : competition.lat,
                        competition.lng === 0 ?
                            40.40531158447266 : competition.lng]
                })
            })
    }
    componentDidUpdate(prevProps: InfoProps, prevState: InfoState) {
        const id = Number(this.props.match.params.id);
        const comp = this.props.competitions.find(c => c.id === id) || new Competition()
        if (prevProps.competitions.length !== this.props.competitions.length
            || prevState.prevStateCompetition.id !== comp.id) {
            competitionService.GetCompetitionStagesInfo(comp.id)
                .then((stages: IStage_Info[]) => {
                    this.setState({
                        readOnly: comp.id === 0 ? false : true,
                        competition: JSON.parse(JSON.stringify(comp)),
                        prevStateCompetition: JSON.parse(JSON.stringify(comp)),
                        stages: stages.length > 0 ? stages : [{
                            id: 0,
                            stage_number: 1,
                            competition: comp.id,
                            circle_count: 1,
                            comment: ""
                        }],
                        mapCenter: [
                            comp.lat === 0 ?
                                56.12909762217289 : comp.lat,
                            comp.lng === 0 ?
                                40.40531158447266 : comp.lng]
                    }, () => this.validation(comp))
                })
        }
    }


    handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.title = event.target.value;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeType(event: React.ChangeEvent<HTMLSelectElement>) {
        const competition = this.state.competition;
        const selectedType = this.props.types.find(t => t.name === event.target.value)?.id as number;
        competition.type = selectedType;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeStageCount(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        if (Number(event.target.value) === competition.stage_count + 1
            || Number(event.target.value) === competition.stage_count - 1) {
            const stages = [...this.state.stages];
            if (Number(event.target.value) > competition.stage_count) {
                stages.push({
                    id: 0,
                    stage_number: Number(event.target.value),
                    competition: competition.id,
                    circle_count: 1,
                    comment: ""
                });
            } else if (Number(event.target.value) < competition.stage_count) {
                stages.pop();
            }
            competition.stage_count = Number(event.target.value);
            this.setState({ competition, stages }, () => this.validation(competition));
        }
    }
    handleChangeCity(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.city = event.target.value;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeStreet(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.street = event.target.value;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeHouse(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.house_num = event.target.value;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeBuilding(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.building = event.target.value;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeFlat(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.office_flat = event.target.value;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeOrganizer(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.organizer = event.target.value;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeEntryFee(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.entry_fee = Number(event.target.value);
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeAgeLimit(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.age_limit = Number(event.target.value);
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeStartDate(date: Date) {
        const competition = this.state.competition;
        competition.date_of_start = date;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeEndDate(date: Date) {
        const competition = this.state.competition;
        competition.date_of_end = date;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeLatLng(latlng: [number, number]) {
        const competition = this.state.competition;
        competition.lat = latlng[0];
        competition.lng = latlng[1];
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeReadOnly() {
        if (!this.state.readOnly) {
            if (window.confirm("Все изменения будут утеряны. Продолжить?")) {
                this.setState({ readOnly: !this.state.readOnly })
                this.backup();
            }
        } else {
            this.setState({ readOnly: !this.state.readOnly }, () => this.validation(this.state.competition))
        }
    }
    handleChangeStageCircleCount(idx: number, value: number) {
        const stages = [...this.state.stages];
        if (value === stages[idx].circle_count + 1
            || value === stages[idx].circle_count - 1) {
            stages[idx].circle_count = value;
            this.setState({ stages });
        }
    }
    handleChangeStageComment(idx: number, value: string) {
        const stages = [...this.state.stages];
        stages[idx].comment = value;
        this.setState({ stages });
    }
    handleChangeOrgEmail(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.organizer_email = event.target.value;
        this.setState({ competition }, () => this.validation(competition));
    }
    handleChangeOrgBankAccount(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.organizer_bank_account = event.target.value;
        this.setState({ competition }, () => this.validation(competition));
    }

    validation(competition: ICompetition) {
        const nums = /^\d+$/;
        if (competition.title.length === 0) {
            this.setState({
                isValid: false,
                errorMessage: "Заполните поле 'Название'"
            });
        } else if (competition.type === 0) {
            this.setState({
                isValid: false,
                errorMessage: "Укажите тип соревнования"
            });
        } else if (competition.lat === 0 || competition.lng === 0) {
            this.setState({
                isValid: false,
                errorMessage: "Укажите точку на карте"
            });
        } else if (competition.organizer.length === 0) {
            this.setState({
                isValid: false,
                errorMessage: "Заполните поле 'Организатор'"
            });
        } else if (competition.entry_fee < 0) {
            this.setState({
                isValid: false,
                errorMessage: "Первоначальный взнос не может быть отрицательным"
            });
        } else if (competition.age_limit < 0) {
            this.setState({
                isValid: false,
                errorMessage: "Возрастное ограничение не может быть отрицательным"
            });
        } else if (competition.organizer_email.length === 0) {
            this.setState({
                isValid: false,
                errorMessage: "Заполните поле 'E-mail'"
            });
        } else if (competition.organizer_bank_account.length < 20 || !nums.test(competition.organizer_bank_account)) {
            this.setState({
                isValid: false,
                errorMessage: "Неверный формат поля 'номер лицевого счета' (20 цифр)"
            });
        } else {
            this.setState({
                isValid: true,
                errorMessage: ""
            });
        }
    }

    save() {
        const competition = this.state.competition;
        const stages = [...this.state.stages];
        competitionService.SaveCompetition(competition)
            .then((newCompetition: ICompetition) => {
                this.props.saveCompetition(newCompetition)
                stages.forEach((s: IStage_Info) => {
                    s.competition = newCompetition.id;
                })
                competitionService.SaveStagesInfo(stages);
            })
            .then(() => {
                this.setState({ redirect: true });
            })
    }
    backup() {
        this.setState({
            competition: this.state.prevStateCompetition
        })
    }

    render() {
        const competition = this.state.competition;
        const stages = [...this.state.stages];
        const readOnly = this.state.readOnly;
        const user = this.props.user;
        let selectedType = this.props.types.find(t => t.id === competition.type)?.name;
        if (this.state.redirect || (!user || user.role !== 2)) {
            return <Redirect to='/' />
        }
        return (
            <div className="competition-info-container container-fluid">
                <div className="info-body container">
                    <InfoOptions
                        competition={competition}
                        stages={stages}
                        readonly={readOnly}
                        selectedType={selectedType as string}
                        types={this.props.types}
                        handleChangeAgeLimit={this.handleChangeAgeLimit}
                        handleChangeBuilding={this.handleChangeBuilding}
                        handleChangeCity={this.handleChangeCity}
                        handleChangeEndDate={this.handleChangeEndDate}
                        handleChangeEntryFee={this.handleChangeEntryFee}
                        handleChangeFlat={this.handleChangeFlat}
                        handleChangeHouse={this.handleChangeHouse}
                        handleChangeOrganizer={this.handleChangeOrganizer}
                        handleChangeStartDate={this.handleChangeStartDate}
                        handleChangeStreet={this.handleChangeStreet}
                        handleChangeTitle={this.handleChangeTitle}
                        handleChangeType={this.handleChangeType}
                        handleChangeStageCount={this.handleChangeStageCount}
                        handleChangeReadOnly={this.handleChangeReadOnly}
                        handleChangeStageCircleCount={this.handleChangeStageCircleCount}
                        handleChangeStageComment={this.handleChangeStageComment}
                        handleChangeOrgBankAccount={this.handleChangeOrgBankAccount}
                        handleChangeOrgEmail={this.handleChangeOrgEmail}
                        save={this.save}
                        backup={this.backup}
                        isValid={this.state.isValid}
                        errorMsg={this.state.errorMessage}
                    />
                    <InfoMap
                        competition={competition}
                        draggable={!readOnly}
                        mapCenter={this.state.mapCenter}
                        handleChangeLatLng={this.handleChangeLatLng}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user.user,
    types: state.filter.types,
    competitions: state.competition.competitions
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    saveCompetition: (c: ICompetition) => dispatch(SaveCompetition(c) as any)
})

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionInfo);