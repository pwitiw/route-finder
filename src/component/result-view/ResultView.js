import React from "react";
import {i18n} from "src/utils/i18n";
import "src/component/result-view/ResultView.css";
import {MapResult} from "src/component/result-view/map-result/MapResult";
import {List} from "src/component/common/list/List";
import {Button} from "src/component/common/button/Button";

export const ResultView = (props) => {
    const cities = props.cities.map(city => city.name);
    return (
        <div className="ResultView">
            <h3 className="Title">{i18n.result.title}</h3>
            <div className="Content">
                <List cities={cities}/>
                <MapResult cities={props.cities}/>
            </div>
            <Button value={i18n.repeat} onClick={props.onRepeat} icon="redo"/>
        </div>
    )
};