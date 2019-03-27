import React from "react";
import banner from "src/assets/loading-banner.gif";

export const LoadingBanner = () => {
    const size = 300;
    return (
        <div>
            <img src={banner} width={size} alt={"loading..."}></img>
        </div>
    )
};