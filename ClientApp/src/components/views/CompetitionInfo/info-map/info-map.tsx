import React, { Component } from 'react';
import { ICompetition } from '../../../../@Types/types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import ReactLeafletSearch from "react-leaflet-search";

import './InfoMap.scss';

interface MapProps {
    competition: ICompetition;
}

class InfoMap extends Component<MapProps> {
    render() {
        const competition = this.props.competition;
        return (
            <div className="info-map">
                <Map
                    center={[competition.lng, competition.lat]}
                    zoom={11}>
                    <TileLayer
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://osm.org/copyright">Сopyright</a>'
                    />
                    <ReactLeafletSearch
                        position="topleft"
                        zoom={11} />;
                    <Marker position={[competition.lng, competition.lat]}>
                        <Popup>
                            <span>{competition.summary_addr}</span>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}

export default InfoMap;