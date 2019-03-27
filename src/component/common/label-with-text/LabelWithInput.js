import React from "react";
import "src/component/common/label-with-text/LabelWithInput.css";

export const LabelWithInput = (props) => {
    return (
        <div className="LabelWithInput">
            <h3>{props.label}:</h3>
            <input type="text" className="Input" value={props.value} onChange={props.onChange}/>
        </div>
    );
};