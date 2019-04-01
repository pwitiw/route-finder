import React from "react";
import "src/component/common/button/Button.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const ButtonType = {
    INFO: "Info",
    WARNING: "Warning"
};

export const Button = (props) => {
    const {icon} = props;
    const buttonType= props.type ===ButtonType.WARNING ? ButtonType.WARNING : ButtonType.INFO;
    const className = ["Button", buttonType].join(" ");
    return (
        <button className={className}
                disabled={props.disabled}
                type="button"
                onClick={props.onClick}>
            {icon && <FontAwesomeIcon size="2x" className="Icon" icon={icon}/>}
            <h3>{props.value}</h3>
        </button>
    );
};