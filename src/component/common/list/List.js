import React from "react";
import "src/component/common/list/List.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const List = (props) => {
    const content = props.cities
        .map((city, index) => <Row key={index} name={city} icon={props.onRemove}
                                   onRemove={() => props.onRemove(index)}/>);
    return (
        <div className="List">
            <ol>
                {content}
            </ol>
        </div>
    );
};

const Row = (props) => {
    let removeIcon;
    if (props.icon) {
        removeIcon = (
            <div className="Icon" onClick={props.onRemove}>
                <FontAwesomeIcon icon="trash"/>
            </div>
        );
    }
    return (
        <div className="Row">
            <li>{props.name}</li>
            {removeIcon}
        </div>
    )
};