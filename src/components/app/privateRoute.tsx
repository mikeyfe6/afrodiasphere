import * as React from "react";

import type { RouteComponentProps } from "@reach/router";

import { navigate } from "gatsby";

import { isLoggedIn } from "../../services/auth";

interface PrivateRouteProps extends RouteComponentProps {
    component: React.ComponentType<RouteComponentProps>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    ...rest
}) => {
    if (!isLoggedIn() && rest.location?.pathname !== `/login/`) {
        navigate("/login/");
        return null;
    }

    return <Component {...rest} />;
};

export default PrivateRoute;
