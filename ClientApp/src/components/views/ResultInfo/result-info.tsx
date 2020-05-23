import React, { Component } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { connect } from 'react-redux';
import competitionService from '../../../services/competition.service';
import ResultService from '../../../services/result.service';
import { response, request } from '../../../actions/user.action';
import {
    GetResults,
    GetStages,
    GetCircles
} from '../../../actions/result.action';
import { Dispatch } from 'redux';
import {
    IUser,
    ICompetition,
    IResult,
    IStage,
    ICircle,
    ISportsman,
    ICompetitionType,
    Competition,
    IStage_Info,
    Sportsman,
    Result,
    Stage
} from '../../../@Types/types';

import './ResultInfo.scss';

import InfoFilter from './InfoFilter';
import CirclesResults from './CirclesResults';

interface MatchParams {
    id?: string
}
interface ResultInfoProps extends RouteComponentProps<MatchParams> {
    user: IUser;
    sportsmen: ISportsman[];
    competitions: ICompetition[];
    competitionTypes: ICompetitionType[];
    allResults: IResult[];
    allStages: IStage[];
    allCircles: ICircle[];
    request: () => void;
    response: () => void;
    getResults: () => void;
    getStages: () => void;
    getCircles: () => void;
}
interface ResultInfoState {
    showCompetitionFilter: boolean;
    competitions: ICompetition[];
    selectedCompetition: ICompetition;
    participants: ISportsman[];
    selectedParticipant: ISportsman;
    selectedStageNumber: number;
    stagesInfo: IStage_Info[];
    allCompetitionResults: IResult[];
    allCompetitionStages: IStage[];
    allCompetitionCircles: ICircle[];
    result: IResult;
    stage: IStage;
    circles: ICircle[];
}

class ResultInfo extends Component<ResultInfoProps, ResultInfoState> {
    constructor(props: ResultInfoProps) {
        super(props);
        this.state = {
            showCompetitionFilter: true,
            competitions: [],
            selectedCompetition: new Competition(),
            selectedParticipant: new Sportsman(),
            selectedStageNumber: 1,
            participants: [],
            stagesInfo: [],
            allCompetitionCircles: [],
            allCompetitionResults: [],
            allCompetitionStages: [],
            result: new Result(),
            stage: new Stage(),
            circles: []
        }
        this.handleChangeCompetition = this.handleChangeCompetition.bind(this);
        this.handleChangeParticipant = this.handleChangeParticipant.bind(this);
        this.handleChangeStageNumber = this.handleChangeStageNumber.bind(this);
        this.handleChangeTimeOfFinish = this.handleChangeTimeOfFinish.bind(this);
        this.handleChangePoints = this.handleChangePoints.bind(this);
        this.updateResultInfo = this.updateResultInfo.bind(this);
        this.recalculate = this.recalculate.bind(this);
        this.save = this.save.bind(this);
    }
    componentDidMount() {
        const id = Number(this.props.match.params.id);
        const allCompetitions = this.props.competitions.filter((c: ICompetition) => new Date() >= new Date(c.date_of_start));
        const selectedCompetition = allCompetitions.find(c => c.id === id) || allCompetitions[0];
        if (selectedCompetition) {
            let stagesInfo: IStage_Info[] = [];
            competitionService.GetCompetitionStagesInfo(selectedCompetition.id)
                .then((stages: IStage_Info[]) => {
                    stagesInfo = stages;
                })
                .then(() => {
                    let participants: ISportsman[] = [];
                    competitionService.GetParticipants(selectedCompetition.id)
                        .then(data => {
                            data.forEach(d => {
                                const sp = this.props.sportsmen.find(s => s.id === d.sportsman);
                                if (sp) {
                                    participants.push(sp)
                                }
                            })
                        })
                        .then(() => {
                            const selectedParticipant = participants[0];
                            if (selectedParticipant) {
                                this.setState({
                                    stagesInfo,
                                    competitions: allCompetitions,
                                    selectedCompetition,
                                    participants,
                                    selectedParticipant,
                                    allCompetitionResults: this.getParticipantsResults(selectedCompetition.id),
                                    allCompetitionStages: this.getAllStagesOfCompetition(selectedCompetition.id),
                                    allCompetitionCircles: this.getAllCirclesOfCompetition(selectedCompetition.id)
                                }, () => this.updateResultInfo());
                            }
                        })
                })
        }
    }
    componentDidUpdate(prevProps: ResultInfoProps, prevState: ResultInfoState) {
        const id = Number(this.props.match.params.id);
        const allCompetitions = this.props.competitions.filter((c: ICompetition) => new Date() >= new Date(c.date_of_start));
        const selectedCompetition = this.state.selectedCompetition.id !== 0 ? this.state.selectedCompetition
            : allCompetitions.find(c => c.id === id) || allCompetitions[0];
        if (selectedCompetition && selectedCompetition.id !== prevState.selectedCompetition.id) {
            let stagesInfo: IStage_Info[] = [];
            competitionService.GetCompetitionStagesInfo(selectedCompetition.id)
                .then((stages: IStage_Info[]) => {
                    stagesInfo = stages;
                })
                .then(() => {
                    let participants: ISportsman[] = [];
                    competitionService.GetParticipants(selectedCompetition.id)
                        .then(data => {
                            data.forEach(d => {
                                const sp = this.props.sportsmen.find(s => s.id === d.sportsman);
                                if (sp) {
                                    participants.push(sp)
                                }
                            })
                        })
                        .then(() => {
                            const selectedParticipant = participants[0];
                            if (prevState.competitions.length !== allCompetitions.length
                                || prevState.participants.length !== participants.length
                                || prevState.stagesInfo.length !== stagesInfo.length) {
                                this.setState({
                                    competitions: allCompetitions,
                                    stagesInfo,
                                    selectedCompetition,
                                    participants,
                                    selectedParticipant,
                                    allCompetitionResults: this.getParticipantsResults(selectedCompetition.id),
                                    allCompetitionStages: this.getAllStagesOfCompetition(selectedCompetition.id),
                                    allCompetitionCircles: this.getAllCirclesOfCompetition(selectedCompetition.id)
                                }, () => this.updateResultInfo())
                            }
                        })
                })
        }
    }

    updateResultInfo() {
        const competition = this.state.selectedCompetition;
        const sportsman = this.state.selectedParticipant;
        const stage_num = this.state.selectedStageNumber;
        const stagesInfo = this.state.stagesInfo;

        const selectedStageInfo = stagesInfo.find(s => s.stage_number === stage_num) as IStage_Info;
        let result = this.getResult(competition.id, sportsman.id);
        if (result) {
            let stage = this.getStage(result.id, stage_num);
            if (stage) {
                let circles = this.getCircles(stage.id).sort(c => c.circle_num);
                if (circles.length < selectedStageInfo?.circle_count) {
                    for (let i = 1; i <= selectedStageInfo?.circle_count; i++) {
                        if (!circles.find(c => c.circle_num === i)) {
                            circles.push({
                                id: 0,
                                circle_num: i,
                                circle_name: "",
                                stage: stage.id,
                                distance: selectedStageInfo?.one_circle_distance,
                                sportsman: sportsman.id,
                                time_of_finish: "00:00:00",
                                points: 0,
                                place: 0
                            })
                        }
                    }
                }
                this.setState({
                    result,
                    stage,
                    circles
                })
            } else {
                stage = {
                    id: 0,
                    result: result.id,
                    sportsman: sportsman.id,
                    stage_num: stage_num,
                    stage_name: "",
                    points: 0,
                    place: 0,
                }
                let circles: ICircle[] = [];
                for (let i = 1; i <= selectedStageInfo?.circle_count; i++) {
                    circles.push({
                        id: 0,
                        circle_num: i,
                        circle_name: "",
                        stage: 0,
                        distance: selectedStageInfo?.one_circle_distance,
                        sportsman: sportsman.id,
                        time_of_finish: "00:00:00",
                        points: 0,
                        place: 0
                    })
                }
                this.setState({
                    result,
                    stage,
                    circles
                })
            }
        } else {
            result = {
                id: 0,
                competition: competition.id,
                sportsman: sportsman.id,
                points: 0,
                place: 0
            }
            const stage = {
                id: 0,
                result: result.id,
                sportsman: sportsman.id,
                stage_num: stage_num,
                stage_name: "",
                points: 0,
                place: 0,
            }
            let circles: ICircle[] = [];
            for (let i = 1; i <= selectedStageInfo?.circle_count; i++) {
                circles.push({
                    id: 0,
                    circle_num: i,
                    circle_name: "",
                    stage: 0,
                    distance: selectedStageInfo?.one_circle_distance,
                    sportsman: sportsman.id,
                    time_of_finish: "00:00:00",
                    points: 0,
                    place: 0
                })
            }
            this.setState({
                result,
                stage,
                circles
            })
        }
    }
    getResult(competitionId: number, sportsmanId: number): IResult | undefined {
        return this.props.allResults.find(r => r.competition === competitionId && r.sportsman === sportsmanId);
    }
    getParticipantsResults(competitionId: number): IResult[] {
        return this.props.allResults.filter(r => r.competition === competitionId);
    }
    getStage(resultId: number, stageNum: number): IStage | undefined {
        return this.props.allStages.find(s => s.result === resultId && s.stage_num === stageNum);
    }
    getStagesWithNum(competitionId: number, stageNum: number): IStage[] {
        const response: IStage[] = [];
        const results = this.getParticipantsResults(competitionId);
        results.forEach(r => {
            const stages = this.props.allStages.filter(s => s.result === r.id && s.stage_num === stageNum);
            stages.forEach(s => response.push(s))
        })
        return response;
    }
    getAllStagesOfCompetition(competitionId: number): IStage[] {
        const response: IStage[] = [];
        const results = this.getParticipantsResults(competitionId);
        results.forEach(r => {
            const stages = this.props.allStages.filter(s => s.result === r.id);
            stages.forEach(s => response.push(s))
        })
        return response;
    }
    getParticipantsStages(results: IResult[], stageNum: number): IStage[] {
        const stages: IStage[] = [];
        results.forEach((r: IResult) => {
            const stage = this.props.allStages.find(s => s.result === r.id && s.stage_num === stageNum);
            if (stage) {
                stages.push(stage);
            }
        })
        return stages;
    }
    getCircles(stageId: number): ICircle[] {
        return this.props.allCircles.filter(c => c.stage === stageId);
    }
    getAllCirclesOfCompetition(competitionId: number): ICircle[] {
        const response: ICircle[] = [];
        const stages = this.getAllStagesOfCompetition(competitionId);
        stages.forEach(s => {
            const circles = this.props.allCircles.filter(c => c.stage === s.id);
            circles.forEach(c => response.push(c));
        })
        return response;
    }
    getParticipantsCircles(stages: IStage[], circleNum: number): ICircle[] {
        const circles: ICircle[] = [];
        stages.forEach((stage: IStage) => {
            const circle = this.props.allCircles.find(c => c.stage === stage.id && c.circle_num === circleNum);
            if (circle) {
                circles.push(circle);
            }
        })
        return circles;
    }

    handleChangeCompetition(event: React.ChangeEvent<HTMLSelectElement>) {
        const allCompetitions = this.props.competitions;
        this.setState({
            selectedCompetition: allCompetitions.find((c: ICompetition) => c.id === Number(event.target.value)) || new Competition()
        }, () => this.updateResultInfo());
    }
    handleChangeParticipant(event: React.ChangeEvent<HTMLSelectElement>) {
        const sportsmen = this.props.sportsmen;
        this.setState({
            selectedParticipant: sportsmen.find((s: ISportsman) => s.id === Number(event.target.value)) || new Sportsman()
        }, () => this.updateResultInfo())
    }
    handleChangeStageNumber(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            selectedStageNumber: Number(event.target.value)
        }, () => this.updateResultInfo())
    }

    handleChangeTimeOfFinish(idx: number, value: string) {
        const circles = [...this.state.circles];
        circles[idx].time_of_finish = value;
        this.setState({ circles });
    }
    handleChangePoints(idx: number, value: number) {
        const circles = [...this.state.circles];
        circles[idx].points = value;
        this.setState({ circles }, () => this.recalculate());
    }

    recalculate() {
        const circles = [...this.state.circles];
        const stage = Object.assign({}, this.state.stage);
        const stagePrevPoints = stage.points;
        const result = Object.assign({}, this.state.result);
        let circlesPointsSum = 0;
        circles.forEach(c => circlesPointsSum += c.points);
        stage.points = circlesPointsSum;
        result.points = (result.points - stagePrevPoints + stage.points);
        this.setState({
            stage,
            result
        })
        // const competition = this.state.selectedCompetition;
        // const stageNum = this.state.selectedStageNumber;
        // const participants = this.state.participants;
        // const selectedParticipant = this.state.selectedParticipant;
        // const stagesInfo = this.state.stagesInfo;
        // const currentStageInfo = stagesInfo.find(s => s.stage_number === stageNum);
        // const result = this.state.result;
        // const stage = this.state.stage;
        // const circle = this.state.circles.find(c => c.circle_num === circleNum) as ICircle;

        // let results = this.getParticipantsResults(competition.id);
        // if (results.length < participants.length) {
        //     participants.forEach((p: ISportsman) => {
        //         if (!results.find(r => r.sportsman === p.id)) {
        //             results.push({
        //                 id: 0,
        //                 competition: competition.id,
        //                 sportsman: p.id,
        //                 points: 0,
        //                 place: 0
        //             })
        //         }
        //     })
        // }
        // let stages = this.getParticipantsStages(results, stageNum);
        // if (stages.length < participants.length) {
        //     participants.forEach((p: ISportsman) => {
        //         if (!stages.find(s => s.sportsman === p.id)) {
        //             stages.push({
        //                 id: 0,
        //                 result: 0,
        //                 sportsman: p.id,
        //                 stage_num: stageNum,
        //                 stage_name: "",
        //                 points: 0,
        //                 place: 0
        //             })
        //         }
        //     })
        // }
        // let circles = this.getParticipantsCircles(stages, circleNum);
        // if (circles.length < participants.length) {
        //     participants.forEach((p: ISportsman) => {
        //         if (!circles.find(c => c.sportsman === p.id)) {
        //             circles.push({
        //                 id: 0,
        //                 circle_name: "",
        //                 circle_num: circleNum,
        //                 stage: 0,
        //                 distance: currentStageInfo?.one_circle_distance || 100,
        //                 time_of_finish: "00:00:00",
        //                 points: 0,
        //                 place: 0,
        //                 sportsman: p.id
        //             })
        //         }
        //     })
        // }
        // for (let i = 0; i < circles.length; i++) {
        //     if (circles[i].sportsman === selectedParticipant.id) {
        //         circles[i] = circle;
        //     }
        // }
        // circles = ResultService.RecalculationCirclePlaces(circles);
        //записать в состояние новый круг с новыми данными (в общий массив кругов и кругов по стадии) (найти его в circles по participant и circle_num)
        //после запустить метод перерасчета стадий
    }

    save() {
        let result = this.state.result;
        let stage = this.state.stage;
        let circles = this.state.circles;
        this.props.request();
        ResultService.SaveResult(result)
            .then((res: IResult) => {
                stage.result = res.id;
                ResultService.SaveStage(stage)
                    .then((st: IStage) => {
                        circles.forEach(c => c.stage = st.id);
                        ResultService.SaveCircles(circles.filter(c => c.points > 0))
                            .then((circs: ICircle[]) => {
                                this.setState({
                                    result: res,
                                    stage: st,
                                    circles: circs
                                }, () => {
                                    this.props.getResults();
                                    this.props.getStages();
                                    this.props.getCircles();
                                });
                            })
                            .then(() => this.props.response())
                    })
            })
    }

    render() {
        const user = this.props.user;
        const competitions = this.state.competitions;
        const participants = this.state.participants;
        const circles = this.state.circles;
        const stagesNums = this.state.stagesInfo.map(s => s.stage_number);
        const selectedCompetition = this.state.selectedCompetition;
        const selectedParticipant = this.state.selectedParticipant;
        const selectedStageNumber = this.state.selectedStageNumber;
        if (!user || user.role !== 2) {
            return <Redirect to='/results' />
        }
        return (
            <div className="result-info-container container-fluid">
                <div className="info-body container">
                    <InfoFilter
                        stagesNums={stagesNums}
                        selectedStageNum={selectedStageNumber}
                        showCompetitionsFilter={this.state.showCompetitionFilter}
                        competitions={competitions}
                        participants={participants}
                        selectedCompetition={selectedCompetition}
                        selectedParticipant={selectedParticipant}
                        handleChangeCompetition={this.handleChangeCompetition}
                        handleChangeParticipant={this.handleChangeParticipant}
                        handleChangeStageNumber={this.handleChangeStageNumber}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => this.save()}>
                        Сохранить и обновить
                    </button>
                    <CirclesResults
                        circles={circles}
                        handleChangePoints={this.handleChangePoints}
                        handleChangeTimeOfFinish={this.handleChangeTimeOfFinish}
                    />
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user.user,
    allResults: JSON.parse(JSON.stringify(state.result.results)),
    allStages: JSON.parse(JSON.stringify(state.result.stages)),
    allCircles: JSON.parse(JSON.stringify(state.result.circles)),
    competitions: state.competition.competitions,
    sportsmen: state.sportsman.sportsmen,
    competitionTypes: state.filter.types,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getResults: () => dispatch(GetResults() as any),
    getStages: () => dispatch(GetStages() as any),
    getCircles: () => dispatch(GetCircles() as any),
    request: () => dispatch(request()),
    response: () => dispatch(response())
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultInfo);