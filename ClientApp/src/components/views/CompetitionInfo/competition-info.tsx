import React, { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { ICompetition, ICompetitionType, Competition } from '../../../@Types/types';
import { connect } from 'react-redux';
import InfoOptions from './info-options';
import InfoMap from './info-map';
import { Dispatch } from 'redux';
import { SaveCompetition } from '../../../actions/CompetitionsActions';
import competitionService from '../../../services/competitionService';

import './CompetitionInfo.scss';

interface MatchParams {
    id?: string
}

interface InfoProps extends RouteComponentProps<MatchParams> {
    types: ICompetitionType[];
    competitions: ICompetition[];
    saveCompetition: (competition: ICompetition) => void;
}
interface InfoState {
    competition: ICompetition;
    prevStateCompetition: ICompetition;
    readOnly: boolean;
    redirect: boolean;
    mapCenter: [number, number];
}

class CompetitionInfo extends Component<InfoProps, InfoState> {
    constructor(props: InfoProps) {
        super(props);
        this.state = {
            competition: new Competition(),
            prevStateCompetition: new Competition(),
            redirect: false,
            readOnly: true,
            mapCenter: [0, 0]
        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
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
        this.save = this.save.bind(this);
        this.backup = this.backup.bind(this);
    }
    componentDidMount() {
        const id = Number(this.props.match.params.id);
        const competition = this.props.competitions.find(c => c.id === id) || new Competition();
        this.setState({
            competition: JSON.parse(
                JSON.stringify(competition)
            ),
            prevStateCompetition: JSON.parse(
                JSON.stringify(competition)
            ),
            mapCenter: [competition.lat, competition.lng]
        })
    }
    componentDidUpdate(prevProps: InfoProps, prevState: InfoState) {
        const id = Number(this.props.match.params.id);
        const comp = this.props.competitions.find(c => c.id === id) || new Competition()
        if (prevProps.competitions.length !== this.props.competitions.length
            || prevState.prevStateCompetition.id !== comp.id) {
            this.setState({
                competition: JSON.parse(JSON.stringify(comp)),
                prevStateCompetition: JSON.parse(JSON.stringify(comp)),
                mapCenter: [comp.lat, comp.lng]
            })
        }
    }


    handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.title = event.target.value;
        this.setState({ competition });
    }
    handleChangeType(event: React.ChangeEvent<HTMLSelectElement>) {
        const competition = this.state.competition;
        const selectedType = this.props.types.find(t => t.name === event.target.value)?.id as number;
        competition.type = selectedType;
        this.setState({ competition });
    }
    handleChangeCity(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.city = event.target.value;
        this.setState({ competition });
    }
    handleChangeStreet(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.street = event.target.value;
        this.setState({ competition });
    }
    handleChangeHouse(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.house_num = event.target.value;
        this.setState({ competition });
    }
    handleChangeBuilding(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.building = event.target.value;
        this.setState({ competition });
    }
    handleChangeFlat(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.office_flat = event.target.value;
        this.setState({ competition });
    }
    handleChangeOrganizer(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.organizer = event.target.value;
        this.setState({ competition });
    }
    handleChangeEntryFee(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.entry_fee = Number(event.target.value);
        this.setState({ competition });
    }
    handleChangeAgeLimit(event: React.ChangeEvent<HTMLInputElement>) {
        const competition = this.state.competition;
        competition.age_limit = Number(event.target.value);
        this.setState({ competition });
    }
    handleChangeStartDate(date: Date) {
        const competition = this.state.competition;
        competition.date_of_start = date;
        this.setState({ competition });
    }
    handleChangeEndDate(date: Date) {
        const competition = this.state.competition;
        competition.date_of_end = date;
        this.setState({ competition });
    }
    handleChangeLatLng(latlng: [number, number]) {
        const competition = this.state.competition;
        competition.lat = latlng[0];
        competition.lng = latlng[1];
        this.setState({ competition });
    }
    handleChangeReadOnly() {
        if (!this.state.readOnly) {
            if (window.confirm("Все изменения будут утеряны. Продолжить?")) {
                this.setState({ readOnly: !this.state.readOnly })
                this.backup();
            }
        } else {
            this.setState({ readOnly: !this.state.readOnly })
        }
    }

    save() {
        competitionService.SaveCompetition(this.state.competition)
            .then((newCompetition: ICompetition) => {
                this.props.saveCompetition(newCompetition)
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
        const readOnly = this.state.readOnly;
        let selectedType = this.props.types.find(t => t.id === competition.type)?.name;
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <div className="competition-info-container container-fluid">
                <div className="info-body container">
                    <InfoOptions
                        competition={competition}
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
                        handleChangeReadOnly={this.handleChangeReadOnly}
                        save={this.save}
                        backup={this.backup}
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
    types: state.filter.types,
    competitions: state.competition.competitions
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    saveCompetition: (c: ICompetition) => dispatch(SaveCompetition(c) as any)
})

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionInfo);