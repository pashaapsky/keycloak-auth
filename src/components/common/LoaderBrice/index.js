import React from "react";

function LoaderBrice({className, ...restProps}) {
    return (
        <div className={className ? `keycloak-loading ${className}` : "keycloak-loading"} {...restProps}>
            <div className="banter-loader">
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
                <div className="banter-loader__box"></div>
            </div>
        </div>
    );
}

export default LoaderBrice;