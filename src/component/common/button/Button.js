import React from "react";
import "src/component/common/button/Button.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Button = (props) => {
    const {icon} = props;
    return (
        <button className="Button"
                disabled={props.disabled}
                type="submit"
                onClick={props.onClick}>
            {icon && <FontAwesomeIcon size="2x" className="Icon" icon={icon}/>}
            <h2>{props.value}</h2>
        </button>
    );
};