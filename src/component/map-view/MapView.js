import React from "react";
import "src/component/map-view/MapView.css";
import GoogleMapReact from 'google-map-react'
import Marker from "src/component/map-view/Marker";

export class MapView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        this.state.maps && this.setPolylines();
        const cities = this.props.cities;
        return (
            <div className="MapView" style={{width: '50%', height: '400px'}}>
                    <GoogleMapReact
                        // bootstrapURLKeys={{key: ""}}
                        center={{lat: cities[0].x, lng: cities[0].y}}
                        defaultZoom={12}
                        onGoogleApiLoaded={({map, maps}) => this.setMapAndMaps(map, maps)}>
                        {cities.map(city => (
                            <Marker key={city.name} lat={city.x} lng={city.y}/>
                        ))}
                    </GoogleMapReact>
            </div>
        )
    }

    setMapAndMaps(map, maps) {
        this.setState({map: map, maps: maps});
    }

    setPolylines() {
        const {map, maps} = this.state;
        const cities = this.props.cities;
        const path = cities.map((city) => this.toLatLng(city, maps));
        let polyline = new maps.Polyline({
            path: path,
            geodesic: false,
            strokeColor: "red",
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        polyline.setMap(map);
        const bounds = new maps.LatLngBounds();
        path.forEach(city => bounds.extend(city));
        map.fitBounds(bounds);
    }

    toLatLng(city, maps) {
        return new maps.LatLng(city.x, city.y);
    }
}