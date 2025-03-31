import * as React from "react";

import { Link } from "gatsby";

import * as notFoundStyles from "../../styles/modules/ui/not-found.module.scss";

const NotFound = () => {
    return (
        <>
            <div className={notFoundStyles.notFound}>
                <h1>Oeps.. Niks hier..</h1>
                <Link to="/">Home</Link>
            </div>
        </>
    );
};

export default NotFound;
