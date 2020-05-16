import React, { Component } from 'react';
import { ISportsman, IPassport, IBirthSertificate, ICompetition } from '../../../../../@Types/types';
import DateTimePicker from '../../../../widgets/DateTimePicker';

import './ListItem.scss';

interface Props {
    competition: ICompetition;
    sportsman: ISportsman;
    passport: IPassport | null;
    birthSertificate: IBirthSertificate | null;
    receipt: string | null;
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
    validationStatusChangeHandler: (val: boolean) => void;
    docTypeChangeHandler: (id: number, value: number) => void;
    receiptChangeHandler: (id: number, value: string) => void;
}
interface State {
    docType: number;
    sportsman: ISportsman;
    passport: IPassport | null;
    birthSertificate: IBirthSertificate | null;
    receipt: string | null;
    nameError: boolean;
    surnameError: boolean;
    patronymicError: boolean;
    birthdayError: boolean;
    rankError: boolean;
    teamError: boolean;
    passSeriesError: boolean;
    passNumError: boolean;
    passPlaceError: boolean;
    passOrgError: boolean;
    passOrgCodeError: boolean;
    passDateError: boolean;
    birthSertSeriesError: boolean;
    birthSertNumError: boolean;
    birthSertPlaceError: boolean;
    birthSertDateError: boolean;
    receiptError: boolean;
}

class ListItem extends Component<Props, State> {
    private receiptRef = React.createRef<HTMLInputElement>();
    constructor(props: Props) {
        super(props);
        this.state = {
            docType: 0,
            sportsman: JSON.parse(JSON.stringify(props.sportsman)),
            passport: JSON.parse(JSON.stringify(props.passport)),
            birthSertificate: JSON.parse(JSON.stringify(props.birthSertificate)),
            receipt: JSON.parse(JSON.stringify(props.receipt)),
            nameError: false,
            surnameError: false,
            patronymicError: false,
            birthdayError: false,
            rankError: false,
            teamError: false,
            passDateError: false,
            passNumError: false,
            passOrgCodeError: false,
            passOrgError: false,
            passPlaceError: false,
            passSeriesError: false,
            birthSertDateError: false,
            birthSertNumError: false,
            birthSertPlaceError: false,
            birthSertSeriesError: false,
            receiptError: false
        }
        this.changeDocTypeHandler = this.changeDocTypeHandler.bind(this);
        this.validation = this.validation.bind(this);
    }
    componentDidMount() {
        this.setState({
            sportsman: JSON.parse(JSON.stringify(this.props.sportsman)),
            passport: JSON.parse(JSON.stringify(this.props.passport)),
            birthSertificate: JSON.parse(JSON.stringify(this.props.birthSertificate)),
            receipt: JSON.parse(JSON.stringify(this.props.receipt))
        }, () => this.validation());
    }
    componentDidUpdate(prevProps: Props, prevState: State) {
        if (JSON.stringify(prevProps.sportsman) !== JSON.stringify(this.props.sportsman)
            || JSON.stringify(prevProps.passport) !== JSON.stringify(this.props.passport)
            || JSON.stringify(prevProps.birthSertificate) !== JSON.stringify(this.props.birthSertificate)
            || JSON.stringify(prevProps.receipt) !== JSON.stringify(this.props.receipt)) {
            this.setState({
                sportsman: JSON.parse(JSON.stringify(this.props.sportsman)),
                passport: JSON.parse(JSON.stringify(this.props.passport)),
                birthSertificate: JSON.parse(JSON.stringify(this.props.birthSertificate)),
                receipt: JSON.parse(JSON.stringify(this.props.receipt))
            }, () => this.validation());
        }
    }

    validation() {
        let nameError: boolean = false;
        let surnameError: boolean = false;
        let patronymicError: boolean = false;
        let birthdayError: boolean = false;
        let rankError: boolean = false;
        let teamError: boolean = false;
        let passDateError: boolean = false;
        let passNumError: boolean = false;
        let passOrgCodeError: boolean = false;
        let passOrgError: boolean = false;
        let passPlaceError: boolean = false;
        let passSeriesError: boolean = false;
        let birthSertDateError: boolean = false;
        let birthSertNumError: boolean = false;
        let birthSertPlaceError: boolean = false;
        let birthSertSeriesError: boolean = false;
        let receiptError: boolean = false;
        let formStatus: boolean = true;
        const sportsman = this.state.sportsman;
        const pass = this.state.passport;
        const birthSert = this.state.birthSertificate;
        const receipt = this.state.receipt;
        const competition = this.props.competition;
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const formatWithSpace = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const nums = /^\d+$/;
        if ((sportsman.name.length > 0 && sportsman.name.length < 2)
            || format.test(sportsman.name)
            || nums.test(sportsman.name)) {
            nameError = true;
            formStatus = false;
        } else if (sportsman.name.length === 0) {
            formStatus = false;
        }
        if ((sportsman.surname.length > 0 && sportsman.surname.length < 2)
            || format.test(sportsman.surname)
            || nums.test(sportsman.surname)) {
            surnameError = true;
            formStatus = false;
        } else if (sportsman.surname.length === 0) {
            formStatus = false;
        }
        if ((sportsman.patronymic.length > 0 && sportsman.patronymic.length < 2)
            || format.test(sportsman.patronymic)
            || nums.test(sportsman.patronymic)) {
            patronymicError = true;
            formStatus = false;
        } else if (sportsman.patronymic.length === 0) {
            formStatus = false;
        }
        if (formatWithSpace.test(sportsman.rank)) {
            rankError = true;
            formStatus = false;
        } else if (sportsman.rank.length === 0) {
            formStatus = false;
        }
        if (formatWithSpace.test(sportsman.team)) {
            teamError = true;
            formStatus = false;
        } else if (sportsman.team.length === 0) {
            formStatus = false;
        }
        if (this.calculateAge(new Date(sportsman.birthday)) < competition.age_limit) {
            birthdayError = true;
            formStatus = false;
        }
        if (pass) {
            if (pass.date_of_issue < sportsman.birthday) {
                passDateError = true;
                formStatus = false;
            }
            if ((pass.series.length > 0 && pass.series.length < 4) || (pass.series.length > 0 && !nums.test(pass.series))) {
                passSeriesError = true;
                formStatus = false;
            } else if (pass.series.length === 0) {
                formStatus = false;
            }
            if ((pass.number.length > 0 && pass.number.length < 6) || (pass.number.length > 0 && !nums.test(pass.number))) {
                passNumError = true;
                formStatus = false;
            } else if (pass.number.length === 0) {
                formStatus = false;
            }
            if (pass.code_of_organization.length > 0 && pass.code_of_organization.length < 7) {
                passOrgCodeError = true;
                formStatus = false;
            } else if (pass.code_of_organization.length === 0) {
                formStatus = false;
            }
            if (formatWithSpace.test(pass.organization_of_issue)
                || nums.test(pass.organization_of_issue)
                || (pass.organization_of_issue.length > 0 && pass.organization_of_issue.length < 10)) {
                passOrgError = true;
                formStatus = false;
            } else if (pass.organization_of_issue.length === 0) {
                formStatus = false;
            }
            if ((pass.place_of_issue.length > 0 && pass.place_of_issue.length < 3)
                || nums.test(pass.place_of_issue)
                || formatWithSpace.test(pass.place_of_issue)) {
                passPlaceError = true;
                formStatus = false;
            } else if (pass.place_of_issue.length === 0) {
                formStatus = false;
            }
        } else if (birthSert) {
            if (birthSert.date_of_issue < sportsman.birthday) {
                birthSertDateError = true;
                formStatus = false;
            }
            if (birthSert.series.length > 0 && birthSert.series.length < 5) {
                birthSertSeriesError = true;
                formStatus = false;
            } else if (birthSert.series.length === 0) {
                formStatus = false;
            }
            if ((birthSert.number.length > 0 && !nums.test(birthSert.number)) || (birthSert.number.length > 0 && birthSert.number.length < 10)) {
                birthSertNumError = true;
                formStatus = false;
            } else if (birthSert.number.length === 0) {
                formStatus = false;
            }
            if ((birthSert.place_of_issue.length > 0 && birthSert.place_of_issue.length < 3)
                || nums.test(birthSert.place_of_issue)
                || formatWithSpace.test(birthSert.place_of_issue)) {
                birthSertPlaceError = true;
                formStatus = false;
            } else if (birthSert.place_of_issue.length === 0) {
                formStatus = false;
            }
        }
        if (competition.entry_fee > 0 && (!receipt || receipt.length === 0)) {
            receiptError = true;
            formStatus = false;
        }
        this.setState({
            nameError,
            surnameError,
            patronymicError,
            birthdayError,
            rankError,
            teamError,
            passDateError,
            passNumError,
            passOrgCodeError,
            passOrgError,
            passPlaceError,
            passSeriesError,
            birthSertDateError,
            birthSertNumError,
            birthSertPlaceError,
            birthSertSeriesError,
            receiptError
        }, () => this.props.validationStatusChangeHandler(formStatus));
    }

    calculateAge(birthday: Date) {
        if (!birthday.getTime)
            return 0;
        let ageDifMs = Date.now() - birthday.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age;
    }

    changeDocTypeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ docType: Number(event.target.value) }, () => {
            this.props.docTypeChangeHandler(this.props.index, this.state.docType)
        })
    }

    uploadFile() {
        if (this.receiptRef) {
            const func = this.props.receiptChangeHandler;
            const id = this.props.index;
            let file: any = this.receiptRef.current?.files
            let files = file[0];
            var reader = new FileReader();
            reader.onload = function (e: any) {
                // let img = new Image();
                // img.src = e.target.result;
                // console.log(img)
                func(id, e.target.result);
            }
            reader.readAsDataURL(files);
        }
    }

    render() {
        const sportsman = this.state.sportsman;
        const pass = this.state.passport;
        const birthSert = this.state.birthSertificate;
        const index = this.props.index;
        return (
            <div className="list-item">
                <h5>Запись #{this.props.index + 1}</h5>
                <div className="personal-data">
                    <div className="surname">
                        <label htmlFor="surname">Фамилия</label>
                        <input
                            value={sportsman.surname}
                            className={this.state.surnameError ? "form-control border border-danger" : "form-control"}
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
                            className={this.state.nameError ? "form-control border border-danger" : "form-control"}
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
                            className={this.state.patronymicError ? "form-control border border-danger" : "form-control"}
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
                        className={this.state.birthdayError ? "border border-danger" : ""}
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
                                    className={this.state.passSeriesError ? "form-control border border-danger" : "form-control"}
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
                                    className={this.state.passNumError ? "form-control border border-danger" : "form-control"}
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
                                    className={this.state.passPlaceError ? "form-control border border-danger" : "form-control"}
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
                                    className={this.state.passOrgError ? "form-control border border-danger" : "form-control"}
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
                                className={this.state.passDateError ? "border border-danger" : ""}
                            />
                            <div className="orgCode">
                                <label htmlFor="orgCode">Код организации</label>
                                <input
                                    className={this.state.passOrgCodeError ? "form-control border border-danger" : "form-control"}
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
                                    className={this.state.birthSertSeriesError ? "form-control border border-danger" : "form-control"}
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
                                    className={this.state.birthSertNumError ? "form-control border border-danger" : "form-control"}
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
                                    className={this.state.birthSertPlaceError ? "form-control border border-danger" : "form-control"}
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
                                changeDate={(date: Date) => this.props.birthSertDateChangeHangler(index, date)}
                                className={this.state.birthSertDateError ? "border border-danger" : ""}
                            />
                        </div>
                    }
                </div>
                <div className="sport-data">
                    <div className="rank">
                        <label htmlFor="rank">Спортивный разряд</label>
                        <input
                            value={sportsman.rank}
                            className={this.state.rankError ? "form-control border border-danger" : "form-control"}
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
                            className={this.state.teamError ? "form-control border border-danger" : "form-control"}
                            type="text"
                            name="team"
                            id="team"
                            maxLength={30}
                            onChange={e => this.props.teamChangeHangler(index, e.target.value)} />
                    </div>
                </div>
                {this.props.competition.entry_fee > 0 ?
                    <div className="upload-receipt">
                        <label htmlFor="file">Загрузите чек</label>
                        <input
                            onChange={() => this.uploadFile()}
                            className={this.state.receiptError ? "border border-danger" : ""}
                            type="file"
                            id="file"
                            ref={this.receiptRef} />
                        <img src="" id="img" />
                    </div>
                    : null}
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