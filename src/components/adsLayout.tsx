import * as React from "react";

import ResponsiveTag from "./helpers/respoTag";

const AdsLayout = ({ children }) => {
    return (
        <>
            <div style={{ height: "100vh", marginBottom: "-58px" }}>
                <main>{children}</main>
            </div>

            {process.env.NODE_ENV === "development" && <ResponsiveTag />}
        </>
    );
};

export default AdsLayout;
