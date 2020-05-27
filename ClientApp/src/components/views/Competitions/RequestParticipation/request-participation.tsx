import React, { Component } from 'react';
import { ICompetition, IPaymentParticipant, ISportsman, IPassport, IRequest_Status, IBirthSertificate } from '../../../../@Types/types';
import CompetitionService from '../../../../services/competition.service';
import SportsmanService from '../../../../services/sportsman.service';
import DateService from '../../../../helpers/date.helper';
import { connect } from 'react-redux';
// import Lightbox from 'react-image-lightbox';
// import { ImageGroup, Image } from 'react-fullscreen-image'
import { Dispatch } from 'redux';
import { request, response } from '../../../../actions/user.action';

import './RequestParticipation.scss';
import '../../../../styles/_buttons.scss';

interface Props {
    competiton: ICompetition;
    sportsmen: ISportsman[];
    handleChangeCheckStatus: () => void;
    request: () => void;
    response: () => void;
}
interface IRequestsStruct {
    sp: ISportsman;
    req: IPaymentParticipant;
    pass?: IPassport;
    sert?: IBirthSertificate;
}
interface State {
    requests: IRequestsStruct[];
    statuses: IRequest_Status[];
    isLightboxOpen: boolean;
}

class RequestParticipation extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            requests: [],
            statuses: [],
            isLightboxOpen: false
        }
        this.handleChangeRequestStatus = this.handleChangeRequestStatus.bind(this);
        this.save = this.save.bind(this);
    }
    componentDidMount() {
        this.props.request();
        CompetitionService.GetStatuses()
            .then((statuses: IRequest_Status[]) => {
                CompetitionService.GetParticipants(this.props.competiton.id)
                    .then((requests: IPaymentParticipant[]) => {
                        requests.forEach((r: IPaymentParticipant) => {
                            const sportsman = this.props.sportsmen.find(s => s.id === r.sportsman);
                            if (sportsman) {
                                if (sportsman.pass) {
                                    SportsmanService.GetPassport(sportsman.pass)
                                        .then((pass: IPassport) => {
                                            this.setState({
                                                statuses,
                                                requests: [...this.state.requests, {
                                                    sp: sportsman,
                                                    req: r,
                                                    pass
                                                }]
                                            }, () => this.props.response())
                                        })
                                } else if (sportsman.birth_sertificate) {
                                    SportsmanService.GetBirthSertificate(sportsman.birth_sertificate)
                                        .then((sert: IBirthSertificate) => {
                                            this.setState({
                                                statuses,
                                                requests: [...this.state.requests, {
                                                    sp: sportsman,
                                                    req: r,
                                                    sert
                                                }]
                                            }, () => this.props.response())
                                        })
                                }
                            }
                        })
                    })
            })
    }

    renOptions(): JSX.Element[] {
        let ren: JSX.Element[] = [];
        this.state.statuses.forEach((r: IRequest_Status, i: number) => ren.push(<option key={i}>{r.name}</option>));
        return ren;
    }

    renItems(): JSX.Element[] {
        const response: JSX.Element[] = [];
        const requests = this.state.requests;
        const statuses = this.state.statuses;
        const competition = this.props.competiton;
        requests.forEach((r: IRequestsStruct, i: number) => {
            if (r.pass) {
                response.push(
                    <div className="request-list__item"
                        key={i}>
                        <div className="request-list__item_fio">
                            <span>{r.sp.surname} {r.sp.name} {r.sp.patronymic}</span>
                        </div>
                        <div className="request-list__item_birthday">
                            <span>{DateService.GetShortDate(new Date(r.sp.birthday))}</span>
                        </div>
                        <div className="request-list__item_team">
                            <span>Команда: {r.sp.team}</span>
                        </div>
                        <div className="request-list__item_pass">
                            <span>Пасспорт</span>
                            <span>Серия: {r.pass.series}</span>
                            <span>Номер: {r.pass.number}</span>
                            <span>Дата выдачи: {DateService.GetShortDate(new Date(r.pass.date_of_issue))}</span>
                            <span>Организация: {r.pass.organization_of_issue} ({r.pass.code_of_organization})</span>
                            <span>Место выдачи: {r.pass.place_of_issue}</span>
                        </div>
                        {/*this.state.isLightboxOpen &&
                            <Lightbox
                                mainSrc='C:\Users\User\Desktop\Учеба\vkr_repo\Avtorizatsia.png'
                                reactModalStyle={{
                                    width: '100px',
                                    height: '100px'
                                }}
                                onCloseRequest={() => this.setState({ isLightboxOpen: false })}
                            />*/}
                        {competition.entry_fee > 0 ?
                            <div className="request-list__item_receipt">
                                {/* <ImageGroup>
                                    <Image
                                        src={this.genSrc(r.req.receipt)}
                                        alt="receipt"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            height: '100px',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </ImageGroup> */}
                                <img
                                    src={this.genSrc(r.req.receipt)}
                                    alt="receipt"
                                    onClick={() => this.setState({ isLightboxOpen: true })} />
                            </div>
                            : null}
                        <div className="request-list__item_status">
                            <select className="form-control"
                                id="status-select"
                                value={statuses.find(s => s.id === r.req.status)?.name}
                                onChange={e => this.handleChangeRequestStatus(i, e.target.value)}
                            >
                                {this.renOptions()}
                            </select>
                        </div>
                    </div>
                )
            } else if (r.sert) {
                response.push(
                    <div className="request-list__item"
                        key={i}>
                        <div className="request-list__item_fio">
                            <span>{r.sp.surname} {r.sp.name} {r.sp.patronymic}</span>
                        </div>
                        <div className="request-list__item_birthday">
                            <span>{DateService.GetShortDate(new Date(r.sp.birthday))}</span>
                        </div>
                        <div className="request-list__item_team">
                            <span>{r.sp.team}</span>
                        </div>
                        <div className="request-list__item_sert">
                            <span>Свидетельство о рождении</span>
                            <span>Серия: {r.sert.series}</span>
                            <span>Номер: {r.sert.number}</span>
                            <span>Дата выдачи: {DateService.GetShortDate(new Date(r.sert.date_of_issue))}</span>
                            <span>Место выдачи: {r.sert.place_of_issue}</span>
                        </div>
                        <div className="request-list__item_status">
                            <select className="form-control"
                                id="status-select"
                                value={statuses.find(s => s.id === r.req.status)?.name}
                                onChange={e => this.handleChangeRequestStatus(i, e.target.value)}
                            >
                                {this.renOptions()}
                            </select>
                        </div>
                    </div>
                )
            }
        })
        return response;
    }

    genSrc(receipt: Blob | null): string {
        let src = "data:image/png;base64,";
        return src + receipt;
    }

    handleChangeRequestStatus(id: number, value: string) {
        const requests = this.state.requests;
        requests[id].req.status = (this.state.statuses.find(s => s.name === value) as IRequest_Status).id;
        this.setState({ requests })
    }

    save() {
        const payments = this.state.requests.map(r => r.req)
        this.props.request();
        SportsmanService.UpdatePaymentParticipantStatus(payments)
            .then((updatedPayments: IPaymentParticipant[]) => {
                const requests = this.state.requests;
                updatedPayments.forEach((p: IPaymentParticipant) => {
                    const req = requests.find(r => r.req.id === p.id) as IRequestsStruct;
                    const reqId = requests.indexOf(req);
                    requests[reqId].req = p;
                })
                this.setState({ requests }, () => this.props.response())
            })
    }

    render() {
        return (
            <div className="request-participants-container">
                <div className="request-participants-body container">
                    <button
                        className="btn btn-close"
                        onClick={() => this.props.handleChangeCheckStatus()}
                    />
                    <div className="request-list">
                        {this.renItems()}
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.save()}
                    >
                        Сохранить
                    </button>
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state: any) => ({
    sportsmen: state.sportsman.sportsmen
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    request: () => dispatch(request()),
    response: () => dispatch(response())
})
export default connect(mapStateToProps, mapDispatchToProps)(RequestParticipation);