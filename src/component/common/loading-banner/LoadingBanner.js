import React from "react";
import banner from "src/assets/loading-banner.gif";
import "src/component/common/loading-banner/LoadingBanner.css";

export const LoadingBanner = () => {
    const size = 500;
    return (
        <div className="LoadingBanner">
            <img src={banner} width={size} alt={"loading..."}></img>
        </div>
    )
};