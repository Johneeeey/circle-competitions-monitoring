import React, { Component } from 'react';
import { ISportsmenListItem, ICompetition } from '../../../../@Types/types';

import ListItem from './ListItem';

import './SportsmenList.scss';

interface Props {
    competition: ICompetition;
    sportsmen: ISportsmenListItem[];
    deleteSportsman: (index: number) => void;
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
                        index={i}
                        key={i}
                        deleteItem={this.props.deleteSportsman}
                        nameChangeHangler={this.props.nameChangeHangler}
                        surnameChangeHangler={this.props.surnameChangeHangler}
                        patronymicChangeHangler={this.props.patronymicChangeHangler}
                        birthdayChangeHangler={this.props.birthdayChangeHangler}
                        rankChangeHangler={this.props.rankChangeHangler}
                        teamChangeHangler={this.props.teamChangeHangler}
                        passNumChangeHangler={this.props.passNumChangeHangler}
                        passSeriesChangeHangler={this.props.passSeriesChangeHangler}
                        passPlaceChangeHangler={this.props.passPlaceChangeHangler}
                        passOrgChangeHangler={this.props.passOrgChangeHangler}
                        passOrgCodeChangeHangler={this.props.passOrgCodeChangeHangler}
                        passDateChangeHangler={this.props.passDateChangeHangler}
                        birthSertSeriesChangeHangler={this.props.birthSertSeriesChangeHangler}
                        birthSertNumberChangeHangler={this.props.birthSertNumberChangeHangler}
                        birthSertPlaceChangeHangler={this.props.birthSertPlaceChangeHangler}
                        birthSertDateChangeHangler={this.props.birthSertDateChangeHangler}
                        validationStatusChangeHandler={this.props.validationStatusChangeHandler}
                        docTypeChangeHandler={this.props.docTypeChangeHandler} />
                ))}
            </div>
        )
    }
}

export default SportsmenList;