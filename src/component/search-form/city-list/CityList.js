import React from "react";
import "src/component/search-form/city-list/CityList.css"
import {i18n} from "src/utils/i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const CityList = (props) => {
    const cities = props.cities.map((city, index) => <CityRow key={index} no={index + 1} name={city}
                                                              onRemove={() => props.onRemove(index)}/>);
    return (
        <div className={"CityList"}>
            <h1>{i18n.cityForm.cities}</h1>
            <div className="List">
                {cities}
            </div>
        </div>
    );
};

const CityRow = (props) => {
    return (
        <div className="CityRow">
            <h4>{props.no}. {props.name} </h4>
            <div className="ClickableIcon" onClick={props.onRemove}>
                <FontAwesomeIcon icon="trash"/>
            </div>
        </div>
    )
};