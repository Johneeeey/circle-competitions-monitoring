import React, { Component } from 'react';
import { ICompetition, IStage_Info, ISportsman, IPaymentParticipant, IResult, IStage, ICircle } from '../../../../@Types/types';
import CompetitionService from '../../../../services/competition.service';

import './ResultDetail.scss'
import '../../../../styles/_buttons.scss';

interface DetailProps {
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
        CompetitionService.GetParticipants(this.props.competition.id)
            .then((participants: IPaymentParticipant[]) => {
                this.setState({ participants });
            })
    }

    renResultRows(): JSX.Element[] {
        const response: JSX.Element[] = [];
        const participants = [...this.state.participants];
        const participantsResults = this.props.results.filter(r => r.competition === this.props.competition.id).sort(r => r.place);
        participantsResults.forEach((pR: IResult, i: number) => {
            const sportsman = this.props.sportsmen.find(s => s.id === pR.sportsman);
            const participantStages = this.props.stages.filter(s => s.result == pR.id && s.sportsman == pR.sportsman).sort(s => s.stage_num);
            response.push(
                <tr key={i}>
                    <td>{pR.place}</td>
                    <td>{`${sportsman?.surname} ${sportsman?.name[0]}. ${sportsman?.patronymic ? sportsman.patronymic[0] + "." : ""}`}</td>
                    {participantStages.map((stage: IStage) => {
                        const res: JSX.Element[] = [];
                        res.push(<td>{stage.points}</td>)
                        res.push(<td>{stage.place}</td>)
                        return res;
                    })}
                    <td>{pR.points}</td>
                </tr>
            )
        })
        return response;
    }

    render() {
        const competition = this.props.competition;
        const stagesInfo = this.state.stagesInfo;
        return (
            <div className="result-detail-container">
                <div className="result-detail">
                    <h5 className="result-detail__title">Результаты соревнования: {competition.title}</h5>
                    <button className="btn-close" onClick={() => this.props.changeCompetitionHandler(null)} />
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
                                    ren.push(<th key={i}>Очки</th>);
                                    ren.push(<th key={i + 1}>Место</th>);
                                    return ren;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.renResultRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ResultDetail;