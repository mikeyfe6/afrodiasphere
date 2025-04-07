import React, { ReactNode } from "react";

import ResponsiveTag from "./helpers/respoTag";

const AdsLayout = ({ children }: { children: ReactNode }) => {
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
