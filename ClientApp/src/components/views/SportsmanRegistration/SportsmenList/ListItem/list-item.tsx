import React, { Component } from 'react';
import { ISportsman, IPassport, IBirthSertificate } from '../../../../../@Types/types';
import DateTimePicker from '../../../../widgets/DateTimePicker';

import './ListItem.scss';

interface Props {
    sportsman: ISportsman;
    passport: IPassport | null;
    birhSertificate: IBirthSertificate | null;
    index: number;
    deleteItem: (index: number) => void;
    nameChangeHangler: (id: number, value: string) => void;
    surnameChangeHangler: (id: number, value: string) => void;
    patronymicChangeHangler: (id: number, value: string) => void;
    birthdayChangeHangler: (id: number, value: Date) => void;
    rankChangeHangler: (id: number, value: string) => void;
    teamChangeHangler: (id: number, value: string) => void;
    passNumChangeHangler: (id: number, value: string) => void;
    passSeriesChangeHangler: (id: number, value: string) => void;
    passPlaceChangeHangler: (id: number, value: string) => void;
    passOrgChangeHangler: (id: number, value: string) => void;
    passOrgCodeChangeHangler: (id: number, value: string) => void;
    passDateChangeHangler: (id: number, value: Date) => void;
    birthSertSeriesChangeHangler: (id: number, value: string) => void;
    birthSertNumberChangeHangler: (id: number, value: string) => void;
    birthSertPlaceChangeHangler: (id: number, value: string) => void;
    birthSertDateChangeHangler: (id: number, value: Date) => void;
}
interface State {
    docType: number;
}

class ListItem extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            docType: 0
        }
        this.changeDocTypeHandler = this.changeDocTypeHandler.bind(this);
    }
    changeDocTypeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ docType: Number(event.target.value) })
    }
    render() {
        const sportsman = this.props.sportsman;
        const pass = this.props.passport;
        const birthSert = this.props.birhSertificate;
        const index = this.props.index;
        return (
            <div className="list-item">
                <h5>Запись #{this.props.index + 1}</h5>
                <div className="personal-data">
                    <div className="surname">
                        <label htmlFor="surname">Фамилия</label>
                        <input
                            value={sportsman.surname}
                            className="form-control"
                            type="text"
                            name="surname"
                            id="surname"
                            maxLength={30}
                            onChange={e => this.props.surnameChangeHangler(index, e.target.value)} />
                    </div>
                    <div className="name">
                        <label htmlFor="name">Имя</label>
                        <input
                            value={sportsman.name}
                            className="form-control"
                            type="text"
                            name="name"
                            id="name"
                            maxLength={30}
                            onChange={e => this.props.nameChangeHangler(index, e.target.value)} />
                    </div>
                    <div className="patronymic">
                        <label htmlFor="patronymic">Отчество</label>
                        <input
                            value={sportsman.patronymic}
                            className="form-control"
                            type="text"
                            name="patronymic"
                            id="patronymic"
                            maxLength={30}
                            onChange={e => this.props.patronymicChangeHangler(index, e.target.value)} />
                    </div>
                    <DateTimePicker
                        readOnly={false}
                        value={sportsman.birthday}
                        secondField={false}
                        changeDate={(date: Date) => this.props.birthdayChangeHangler(index, date)}
                    />
                </div>
                <div className="document-data">
                    <div className="doc-type">
                        <label htmlFor="doc-type">Тип документа</label>
                        <select
                            value={this.state.docType}
                            className="form-control"
                            name="doc-type"
                            id="doc-type"
                            onChange={this.changeDocTypeHandler}>
                            <option value={0}>Паспорт</option>
                            <option value={1}>Свидетельство о рождении</option>
                        </select>
                    </div>
                    {this.state.docType === 0 ?
                        <div className="passport">
                            <div className="series">
                                <label htmlFor="series">Серия</label>
                                <input
                                    className="form-control"
                                    value={pass?.series}
                                    type="text"
                                    name="series"
                                    id="series"
                                    maxLength={4}
                                    onChange={e => this.props.passSeriesChangeHangler(index, e.target.value)} />
                            </div>
                            <div className="number">
                                <label htmlFor="number">Номер</label>
                                <input
                                    className="form-control"
                                    value={pass?.number}
                                    type="text"
                                    name="number"
                                    id="number"
                                    maxLength={6}
                                    onChange={e => this.props.passNumChangeHangler(index, e.target.value)} />
                            </div>
                            <div className="issuePlace">
                                <label htmlFor="issuePlace">Место выдачи</label>
                                <input
                                    className="form-control"
                                    value={pass?.place_of_issue}
                                    type="text"
                                    name="issuePlace"
                                    id="issuePlace"
                                    maxLength={100}
                                    onChange={e => this.props.passPlaceChangeHangler(index, e.target.value)} />
                            </div>
                            <div className="issueOrg">
                                <label htmlFor="issueOrg">Организация выдачи</label>
                                <input
                                    className="form-control"
                                    value={pass?.organization_of_issue}
                                    type="text"
                                    name="issueOrg"
                                    id="issueOrg"
                                    maxLength={70}
                                    onChange={e => this.props.passOrgChangeHangler(index, e.target.value)} />
                            </div>
                            <DateTimePicker
                                readOnly={false}
                                value={pass?.date_of_issue || new Date()}
                                secondField={false}
                                changeDate={(date: Date) => this.props.passDateChangeHangler(index, date)}
                            />
                            <div className="orgCode">
                                <label htmlFor="orgCode">Код организации</label>
                                <input
                                    className="form-control"
                                    value={pass?.code_of_organization}
                                    type="text"
                                    name="orgCode"
                                    id="orgCode"
                                    maxLength={7}
                                    onChange={e => this.props.passOrgCodeChangeHangler(index, e.target.value)} />
                            </div>
                        </div>
                        :
                        <div className="birth-sertificate">
                            <div className="series">
                                <label htmlFor="series">Серия</label>
                                <input
                                    className="form-control"
                                    value={birthSert?.series}
                                    type="text"
                                    name="series"
                                    id="series"
                                    maxLength={5}
                                    onChange={e => this.props.birthSertSeriesChangeHangler(index, e.target.value)} />
                            </div>
                            <div className="number">
                                <label htmlFor="number">Номер</label>
                                <input
                                    className="form-control"
                                    value={birthSert?.number}
                                    type="text"
                                    name="number"
                                    id="number"
                                    maxLength={10}
                                    onChange={e => this.props.birthSertNumberChangeHangler(index, e.target.value)} />
                            </div>
                            <div className="issuePlace">
                                <label htmlFor="issuePlace">Место выдачи</label>
                                <input
                                    className="form-control"
                                    value={birthSert?.place_of_issue}
                                    type="text"
                                    name="issuePlace"
                                    id="issuePlace"
                                    maxLength={70}
                                    onChange={e => this.props.birthSertPlaceChangeHangler(index, e.target.value)} />
                            </div>
                            <DateTimePicker
                                readOnly={false}
                                value={birthSert?.date_of_issue || new Date()}
                                secondField={false}
                                changeDate={(date: Date) => this.props.birthSertDateChangeHangler(index,date)}
                            />
                        </div>
                    }
                </div>
                <div className="sport-data">
                    <div className="rank">
                        <label htmlFor="rank">Спортивный разряд</label>
                        <input
                            value={sportsman.rank}
                            className="form-control"
                            type="text"
                            name="rank"
                            id="rank"
                            maxLength={20}
                            onChange={e => this.props.rankChangeHangler(index, e.target.value)} />
                    </div>
                    <div className="team">
                        <label htmlFor="rank">Команда</label>
                        <input
                            value={sportsman.team}
                            className="form-control"
                            type="text"
                            name="team"
                            id="team"
                            maxLength={30}
                            onChange={e => this.props.teamChangeHangler(index, e.target.value)} />
                    </div>
                </div>
                <button
                    onClick={() => this.props.deleteItem(this.props.index)}
                    className="btn btn-link">
                    Удалить запись
                </button>
            </div>
        )
    }
}

export default ListItem;