import React from "react";
import pin from "src/assets/marker.png";

const Marker = () => {
    const size = 25;
    const style = {
        position: "absolute",
        left: -(size / 2),
        bottom: 0
    };
    return (
        <img style={style} width={size} src={pin} alt="marker"/>
    );
};

export default Marker;