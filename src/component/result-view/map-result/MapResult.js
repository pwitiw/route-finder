import React from "react";
import "src/component/result-view/map-result/MapResult.css";
import GoogleMap from 'google-map-react'
import Marker from "src/component/result-view/map-result/Marker";
import GoogleApi from "src/services/GoogleApi";

export class MapResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.cities.length === 0) {
            return null;
        }
        this.state.maps && this.setPolylines();
        const cities = this.props.cities;
        return (
            <div className="MapResult">
                <GoogleMap
                    // bootstrapURLKeys={{key: GoogleApi.KEY}}
                    center={{lat: cities[0].x, lng: cities[0].y}}
                    defaultZoom={12}
                    onGoogleApiLoaded={({map, maps}) => this.setMapAndMaps(map, maps)}>
                    {cities.map(city => (
                        <Marker key={city.name} lat={city.x} lng={city.y}/>
                    ))}
                </GoogleMap>
            </div>
        )
    }

    setMapAndMaps(map, maps) {
        this.setState({map: map, maps: maps});
    }

    setPolylines() {
        const {map, maps} = this.state;
        const cities = this.props.cities;
        const path = cities.map((city) => this.toLatLng(city, maps))
        path.push(path[0]);
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
        maps.Size(300, 300);
    }

    toLatLng(city, maps) {
        return new maps.LatLng(city.x, city.y);
    }
}