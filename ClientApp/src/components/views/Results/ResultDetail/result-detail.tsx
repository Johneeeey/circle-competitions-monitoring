import React, { Component } from 'react';
import { ICompetition, IStage_Info, ISportsman, IPaymentParticipant, IResult, IStage, ICircle, IUser } from '../../../../@Types/types';
import CompetitionService from '../../../../services/competition.service';

import './ResultDetail.scss'
import '../../../../styles/_buttons.scss';
import { Link } from 'react-router-dom';

interface DetailProps {
    user: IUser;
    competition: ICompetition;
    sportsmen: ISportsman[];
    results: IResult[];
    stages: IStage[];
    circles: ICircle[];
    changeCompetitionHandler: (competition: ICompetition | null) => void;
}
interface DetailState {
    participants: IPaymentParticipant[],
    stagesInfo: IStage_Info[]
}

class ResultDetail extends Component<DetailProps, DetailState> {
    constructor(props: DetailProps) {
        super(props);
        this.state = {
            participants: [],
            stagesInfo: []
        }
    }
    componentDidMount() {
        CompetitionService.GetStagesInfo(this.props.competition.id)
            .then((stagesInfo: IStage_Info[]) => {
                this.setState({ stagesInfo });
            })
        CompetitionService.GetParticipantsByCompetition(this.props.competition.id)
            .then((participants: IPaymentParticipant[]) => {
                this.setState({ participants });
            })
    }


    sortParticipantsByPlaceInStage(stageNum: number, participants: IPaymentParticipant[]): IPaymentParticipant[] {
        for (let j = 0; j < participants.length; j++) {
            for (let i = 0; i < participants.length; i++) {
                const participantResult = this.props.results.find(r => r.sportsman === participants[i].sportsman
                    && r.competition === this.props.competition.id);
                const participantStage = this.props.stages.find(s => s.result === participantResult?.id
                    && s.sportsman === participants[i].sportsman
                    && s.stage_num === stageNum) as IStage;
                if (participantStage && participantResult) {
                    if (i + 1 < participants.length) {
                        const nextParticipantResult = this.props.results.find(r => r.sportsman === participants[i + 1].sportsman
                            && r.competition === this.props.competition.id);
                        const nextParticipantStage = this.props.stages.find(s => s.result === nextParticipantResult?.id
                            && s.sportsman === participants[i + 1].sportsman
                            && s.stage_num === stageNum) as IStage;
                        if (nextParticipantStage && nextParticipantResult) {
                            if (participantStage.place > nextParticipantStage.place) {
                                const temp: IPaymentParticipant = participants[i];
                                participants[i] = participants[i + 1];
                                participants[i + 1] = temp;
                            }
                        }
                    }
                }
            }
        }
        return participants
    }

    renResultRows(): JSX.Element[] {
        const response: JSX.Element[] = [];
        const stagesInfo = this.state.stagesInfo;
        const participantsResults = this.props.results.filter(r => r.competition === this.props.competition.id).sort(r => r.place);
        participantsResults.forEach((pR: IResult, i: number) => {
            const sportsman = this.props.sportsmen.find(s => s.id === pR.sportsman);
            const participantStages = this.props.stages.filter(s => s.result === pR.id && s.sportsman === pR.sportsman).sort(s => s.stage_num);
            response.push(
                <tr key={i}>
                    <td>{pR.place}</td>
                    <td>{`${sportsman?.surname} ${sportsman?.name[0]}. ${sportsman?.patronymic ? sportsman.patronymic[0] + "." : ""}`}</td>
                    {participantStages && participantStages.length > 0 ?
                        participantStages.map((stage: IStage) => {
                            const res: JSX.Element[] = [];
                            res.push(<td>{stage.points}</td>)
                            res.push(<td>{stage.place}</td>)
                            return res;
                        }) : null}
                    {participantStages.length < stagesInfo.length ?
                        this.renEmptyStageRow(stagesInfo.length, participantStages.length)
                        : null}
                    <td>{pR.points}</td>
                </tr>
            )
        })
        return response;
    }

    renStageCircleNumHeaderRow(sI: IStage_Info): JSX.Element[] {
        const response: JSX.Element[] = [];
        for (let i = 1; i <= sI.circle_count; i++) {
            response.push(
                <th key={i + 100} colSpan={3}>Круг #{i}</th>
            )
        }
        return response;
    }
    renStagePointPlaceHeaderRow(sI: IStage_Info): JSX.Element[] {
        const response: JSX.Element[] = [];
        for (let i = 0; i < sI.circle_count; i++) {
            response.push(<th key={i + 100}>Время</th>);
            response.push(<th key={i + 75}>Очки</th>);
            response.push(<th key={i + 50}>Место</th>);
        }
        return response;
    }
    renStageRows(stageNum: number): JSX.Element[] {
        const response: JSX.Element[] = [];
        const stageInfo = this.state.stagesInfo.find(s => s.stage_number === stageNum) as IStage_Info
        const participants = this.sortParticipantsByPlaceInStage(stageNum, [...this.state.participants]);
        participants.forEach((p: IPaymentParticipant, i: number) => {
            const sportsman = this.props.sportsmen.find(s => s.id === p.sportsman);
            const participantResult = this.props.results.find(r => r.sportsman === sportsman?.id
                && r.competition === this.props.competition.id);
            const participantStage = this.props.stages.find(s => s.result === participantResult?.id
                && s.sportsman === sportsman?.id
                && s.stage_num === stageNum);
            const participantCircles = this.props.circles.filter(c => c.stage === participantStage?.id
                && c.sportsman === sportsman?.id).sort(c => c.circle_num);
            response.push(
                <tr key={i}>
                    <td>{participantStage ? participantStage.place : " "}</td>
                    <td>{sportsman ?
                        `${sportsman?.surname} 
                        ${sportsman?.name[0]}. 
                        ${sportsman?.patronymic ? sportsman.patronymic[0] + "." : ""}`
                        : " "}
                    </td>
                    {participantCircles && participantCircles.length > 0 ?
                        participantCircles.map((circle: ICircle, j: number) => {
                            const res: JSX.Element[] = [];
                            res.push(<td key={i + 100}>{circle.time_of_finish}</td>)
                            res.push(<td key={i + 75}>{circle.points}</td>)
                            res.push(<td key={i + 50}>{circle.place}</td>)
                            return res;
                        }) : null}
                    {participantCircles && participantCircles.length < stageInfo.circle_count ?
                        this.renEmptyCircleRow(stageInfo, participantCircles.length) : null}
                    <td>{participantStage ? participantStage.points : " "}</td>
                </tr>
            )
        })
        return response;
    }
    renEmptyStageRow(stagesInfoLength: number, stagesLength: number): JSX.Element[] {
        const res: JSX.Element[] = [];
        for (let i = 0; i < (stagesInfoLength - stagesLength); i++) {
            res.push(<td key={i + 100}></td>)
            res.push(<td key={i + 75}></td>)
        }
        return res;
    }
    renEmptyCircleRow(stageInfo: IStage_Info, circleLength: number): JSX.Element[] {
        const res: JSX.Element[] = [];
        for (let i = 0; i < (stageInfo.circle_count - circleLength); i++) {
            res.push(<td key={i + 100}></td>)
            res.push(<td key={i + 75}></td>)
            res.push(<td key={i + 50}></td>)
        }
        return res;
    }

    render() {
        const competition = this.props.competition;
        const stagesInfo = this.state.stagesInfo;
        return (
            <div className="result-detail-container">
                <div className="result-detail">
                    <h5 className="result-detail__title">Результаты соревнования: {competition.title}</h5>
                    {this.props.user && this.props.user.role === 2 &&
                        <Link to={`/results/${competition.id}`}>Редактировать</Link>
                    }
                    <button className="btn-close" onClick={() => this.props.changeCompetitionHandler(null)} />
                    <div className="result-detail__main-result">
                        <table className="table table-bordered table-hovered">
                            <thead>
                                <tr>
                                    <th className="place" rowSpan={2}>Место</th>
                                    <th className="fio" rowSpan={2}>ФИО</th>
                                    {stagesInfo.map((sI: IStage_Info, i: number) => (
                                        <th key={i} colSpan={2}>Стадия #{sI.stage_number}</th>
                                    ))}
                                    <th rowSpan={2} className="summary">Итого</th>
                                </tr>
                                <tr>
                                    {stagesInfo.map((sI: IStage_Info, i: number) => {
                                        const ren: JSX.Element[] = [];
                                        ren.push(<th key={i + 75}>Очки</th>);
                                        ren.push(<th key={i + 50}>Место</th>);
                                        return ren;
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renResultRows()}
                            </tbody>
                        </table>
                    </div>
                    {stagesInfo.map((sI: IStage_Info, i: number) => {
                        return (
                            <div className="result-detail__stage-result" key={i}>
                                <h5>Результаты стадии #{sI.stage_number} {sI.comment.length > 0 ? sI.comment : ""}  (Дистанция каждого круга: {sI.one_circle_distance}м)</h5>
                                <table className="table table-bordered table-hovered">
                                    <thead>
                                        <tr>
                                            <th className="place" rowSpan={2}>Место</th>
                                            <th className="fio" rowSpan={2}>ФИО</th>
                                            {}
                                            {this.renStageCircleNumHeaderRow(sI)}
                                            <th rowSpan={2} className="summary">Итого</th>
                                        </tr>
                                        <tr>
                                            {this.renStagePointPlaceHeaderRow(sI)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renStageRows(sI.stage_number)}
                                    </tbody>
                                </table>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ResultDetail;