import React, { Component } from 'react';
import { ICompetition, ICompetitionType } from '../../../../@Types/types';
import { connect } from 'react-redux';
import DateService from '../../../../services/dateService';
import './CompetitionDetail.scss';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


interface DetailProps {
    competition: ICompetition;
    types: ICompetitionType[];
}

class CompetitionDetail extends Component<DetailProps> {
    render() {
        const start = DateService.GetShortDate(this.props.competition.date_of_start);
        const end = DateService.GetShortDate(this.props.competition.date_of_end);
        const competition = this.props.competition;
        return (
            <div className="competition-detail">
                <h4>{competition.title}</h4>
                <div className="map-block">
                    <Map
                        center={[competition.lng, competition.lat]}
                        zoom={11}>
                        <TileLayer
                            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://osm.org/copyright">Сopyright</a>'
                        />
                        <Marker position={[competition.lng, competition.lat]}>
                            <Popup>
                                <span>{competition.summary_addr}</span>
                            </Popup>
                        </Marker>
                    </Map>
                </div>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Тип соревнования</td>
                            <td>{this.props.types.find(t => t.id === this.props.competition.type)?.name}</td>
                        </tr>
                        <tr>
                            <td>Даты проведения</td>
                            <td>{start + " - " + end}</td>
                        </tr>
                        <tr>
                            <td>Организатор</td>
                            <td>{competition.organizer}</td>
                        </tr>
                        <tr>
                            <td>Первичный взнос</td>
                            <td>{competition.entry_fee}</td>
                        </tr>
                        <tr>
                            <td>Город</td>
                            <td>{competition.city}</td>
                        </tr>
                        <tr>
                            <td>Улица</td>
                            <td>{competition.street}</td>
                        </tr>
                        <tr>
                            <td>Дом</td>
                            <td>{competition.house_num}</td>
                        </tr>
                        <tr>
                            <td>Строение</td>
                            <td>{competition.building}</td>
                        </tr>
                        <tr>
                            <td>Квартира</td>
                            <td>{competition.office_flat}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    types: state.filter.types
})

export default connect(mapStateToProps)(CompetitionDetail);