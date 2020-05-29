import React, { Component } from 'react';
import {
    IUser,
    IRequestsStruct,
    IRequest_Status,
    ISportsman,
    IPaymentParticipant,
    ICompetition
} from '../../../@Types/types';
import { Dispatch } from 'redux';
import { request, response } from '../../../actions/user.action';
import CompetitionService from '../../../services/competition.service';
import DateService from '../../../helpers/date.helper';
import { connect } from 'react-redux';

import './UserParticipationRequests.scss';
import error from '../../../content/img/error.png';

interface IProps {
    user: IUser;
    sportsmen: ISportsman[];
    competitions: ICompetition[];
    close: () => void;
    request: () => void;
    response: () => void;
}

interface IState {
    requests: IRequestsStruct[];
    statuses: IRequest_Status[];
}


class UserRequests extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            requests: [],
            statuses: []
        }
        this.remove = this.remove.bind(this);
    }
    componentDidMount() {
        this.props.request();
        CompetitionService.GetStatuses()
            .then((statuses: IRequest_Status[]) => {
                CompetitionService.GetParticipantsByUser(this.props.user.id)
                    .then((requests: IPaymentParticipant[]) => {
                        if (requests.length > 0) {
                            requests.forEach((r: IPaymentParticipant) => {
                                const sportsman = this.props.sportsmen.find(s => s.id === r.sportsman);
                                if (sportsman) {
                                    this.setState({
                                        statuses,
                                        requests: [...this.state.requests, {
                                            sp: sportsman,
                                            req: r,
                                        }]
                                    }, () => this.props.response())
                                }
                            })
                        } else {
                            this.props.response()
                            return;
                        }
                    })
            })
    }

    remove(participant: IPaymentParticipant) {
        this.props.request();
        CompetitionService.RemovePaymentParticipant(participant, this.props.user.id)
            .then((newRequests: IPaymentParticipant[]) => {
                let requests: IRequestsStruct[] = [];
                newRequests.forEach((r: IPaymentParticipant) => {
                    const sportsman = this.props.sportsmen.find(s => s.id === r.sportsman);
                    if (sportsman) {
                        requests = [...requests, {
                            sp: sportsman,
                            req: r,
                        }];
                    }
                })
                this.setState({ requests }, () => this.props.response())
            })
    }

    renItems(): JSX.Element[] {
        const response: JSX.Element[] = [];
        const requests = this.state.requests;
        requests.forEach((r: IRequestsStruct, i: number) => {
            let competition: ICompetition = this.props.competitions.find(c =>
                c.id === r.req.competition) as ICompetition;
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
                    <div className="request-list__item_competition">
                        <span>Соревнование:</span>
                        <span>{competition.title}</span>
                    </div>
                    <div className="request-list__item_receipt">
                        <img
                            src={this.genSrc(r.req.receipt)}
                            alt="receipt" />
                    </div>
                    <div className="request-list__item_status">
                        <span
                            className={this.genStatusClassName(r.req.status)}
                        >
                            {this.renStatus(r.req.status)}
                        </span>
                    </div>
                    <div className="request-list__item_remove">
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                if (window.confirm("Вы уверены?")) {
                                    this.remove(r.req)
                                }
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            )
        })
        return response;
    }

    genStatusClassName(status: number): string {
        let response: string = ""
        switch (status) {
            case 1:
                response = "in-progress";
                break;
            case 4:
                response = "approved";
                break;
            case 5:
                response = "rejected";
                break;
            default:
                break;
        }
        return response;
    }
    renStatus(status: number): string {
        let response: string = ""
        switch (status) {
            case 1:
                response = "Рассматривается";
                break;
            case 4:
                response = "Одобрена";
                break;
            case 5:
                response = "Отвергнута";
                break;
            default:
                break;
        }
        return response;
    }

    genSrc(receipt: Blob | null): string {
        let src = "data:image/png;base64,";
        if (receipt) {
            return src + receipt;
        } else {
            return error;
        }
    }

    render() {
        return (
            <div className="user-requests-container">
                <div className="user-requests-body">
                    <button
                        className="btn btn-close"
                        onClick={() => this.props.close()}
                    />
                    <div className="request-list">
                        {this.renItems()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user.user,
    competitions: state.competition.competitions,
    sportsmen: state.sportsman.sportsmen
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    request: () => dispatch(request()),
    response: () => dispatch(response())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserRequests);