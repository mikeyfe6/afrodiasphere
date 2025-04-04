import * as React from "react";

import { Link } from "gatsby";

import * as notFoundStyles from "../../styles/modules/pages/not-found.module.scss";

const NotFound = () => {
    return (
        <>
            <div className={notFoundStyles.notFound}>
                <h1>Oeps.. (nog) niks hier..</h1>

                <div>
                    <Link to="/">Home</Link>
                    <Link to="/">Creëer een account!</Link>
                </div>
            </div>
        </>
    );
};

export default NotFound;
