import * as React from "react";

import type { RouteComponentProps } from "@reach/router";

import { Link } from "gatsby";

import * as notFoundStyles from "../../styles/modules/pages/not-found.module.scss";

const NotFound: React.FC<RouteComponentProps> = () => {
    return (
        <>
            <div className={notFoundStyles.notFound}>
                <h1>Oeps.. (nog) niks hier..</h1>

                <div>
                    <Link to="/">Home</Link>
                    <Link to="/login/">Creëer een account!</Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;
