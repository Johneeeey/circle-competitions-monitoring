import React, { Component } from 'react';
import { ISportsmenListItem, ICompetition } from '../../../../@Types/types';

import ListItem from './ListItem';

import './SportsmenList.scss';

interface Props {
    competition: ICompetition;
    sportsmen: ISportsmenListItem[];
    deleteSportsman: (index: number) => void;
    nameChangeHandler: (id: number, value: string) => void;
    surnameChangeHandler: (id: number, value: string) => void;
    patronymicChangeHandler: (id: number, value: string) => void;
    birthdayChangeHandler: (id: number, value: Date) => void;
    rankChangeHandler: (id: number, value: string) => void;
    teamChangeHandler: (id: number, value: string) => void;
    passNumChangeHandler: (id: number, value: string) => void;
    passSeriesChangeHangder: (id: number, value: string) => void;
    passPlaceChangeHandler: (id: number, value: string) => void;
    passOrgChangeHadgler: (id: number, value: string) => void;
    passOrgCodeChangeHandler: (id: number, value: string) => void;
    passDateChangeHandler: (id: number, value: Date) => void;
    birthSertSeriesChangeHandler: (id: number, value: string) => void;
    birthSertNumberChangeHandler: (id: number, value: string) => void;
    birthSertPlaceChangeHandler: (id: number, value: string) => void;
    birthSertDateChangeHandler: (id: number, value: Date) => void;
    validationStatusChangeHandler: (val: boolean) => void;
    docTypeChangeHandler: (id: number, value: number) => void;
    receiptChangeHandler: (id: number, value: string) => void;
}

class SportsmenList extends Component<Props> {
    render() {
        const sportsmen = JSON.parse(JSON.stringify(this.props.sportsmen));
        return (
            <div className="sportsmen-list">
                {sportsmen.map((s: ISportsmenListItem, i: number) => (
                    <ListItem
                        sportsman={s.sportsman}
                        competition={this.props.competition}
                        passport={s.pass}
                        birthSertificate={s.birthSertificate}
                        receipt={s.receipt}
                        index={i}
                        key={i}
                        deleteItem={this.props.deleteSportsman}
                        nameChangeHandler={this.props.nameChangeHandler}
                        surnameChangeHandler={this.props.surnameChangeHandler}
                        patronymicChangeHandler={this.props.patronymicChangeHandler}
                        birthdayChangeHandler={this.props.birthdayChangeHandler}
                        rankChangeHandler={this.props.rankChangeHandler}
                        teamChangeHandler={this.props.teamChangeHandler}
                        passNumChangeHandler={this.props.passNumChangeHandler}
                        passSeriesChangeHangder={this.props.passSeriesChangeHangder}
                        passPlaceChangeHandler={this.props.passPlaceChangeHandler}
                        passOrgChangeHadgler={this.props.passOrgChangeHadgler}
                        passOrgCodeChangeHandler={this.props.passOrgCodeChangeHandler}
                        passDateChangeHandler={this.props.passDateChangeHandler}
                        birthSertSeriesChangeHandler={this.props.birthSertSeriesChangeHandler}
                        birthSertNumberChangeHandler={this.props.birthSertNumberChangeHandler}
                        birthSertPlaceChangeHandler={this.props.birthSertPlaceChangeHandler}
                        birthSertDateChangeHandler={this.props.birthSertDateChangeHandler}
                        validationStatusChangeHandler={this.props.validationStatusChangeHandler}
                        docTypeChangeHandler={this.props.docTypeChangeHandler}
                        receiptChangeHandler={this.props.receiptChangeHandler} />
                ))}
            </div>
        )
    }
}

export default SportsmenList;