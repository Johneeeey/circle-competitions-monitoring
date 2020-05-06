import React, { Component, createRef } from 'react';
import { ICompetition } from '../../../../@Types/types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import ReactLeafletSearch from "react-leaflet-search";

import './InfoMap.scss';

interface MapProps {
    competition: ICompetition;
    draggable: boolean;
    mapCenter: [number, number];
    handleChangeLatLng: (latlng: [number, number]) => void;
}
interface MapState {
    marker: {
        lat: number,
        lng: number
    }
}

class InfoMap extends Component<MapProps, MapState> {
    refMap = createRef<Map>();
    refMarker = createRef<Marker>();

    constructor(props: MapProps) {
        super(props);
        this.state = {
            marker: {
                lat: 0,
                lng: 0
            }
        }
    }

    componentDidMount() {
        this.setState({
            marker: {
                lat: this.props.competition.lat,
                lng: this.props.competition.lng
            }
        })
    }

    componentDidUpdate(prevProps: MapProps, prevState: MapState) {
        if (prevProps.competition.id !== this.props.competition.id) {
            this.setState({
                marker: {
                    lat: this.props.competition.lat,
                    lng: this.props.competition.lng
                }
            })
        }
    }


    updatePosition = () => {
        const marker = this.refMarker.current;
        if (marker != null) {
            const latlng = marker.leafletElement.getLatLng();
            this.setState({
                marker: latlng,
            })
            this.props.handleChangeLatLng([latlng.lat, latlng.lng])
        }
    }
    render() {
        const competition = this.props.competition;
        const markerPosition: [number, number] = [this.state.marker.lat, this.state.marker.lng]
        return (
            <div className="info-map">
                <Map
                    ref={this.refMap}
                    center={this.props.mapCenter}
                    zoom={11}>
                    <TileLayer
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://osm.org/copyright">Сopyright</a>'
                    />
                    <ReactLeafletSearch
                        position="topleft"
                        zoom={11} />;
                    <Marker
                        ondragend={this.updatePosition}
                        draggable={this.props.draggable}
                        ref={this.refMarker}
                        position={markerPosition}>
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