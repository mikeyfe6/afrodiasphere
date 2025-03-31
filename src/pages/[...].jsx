import * as React from "react";

import { Router, useLocation } from "@reach/router";

import Layout from "../components/layout";
import PrivateRoute from "../components/app/PrivateRoute";
import Dashboard from "../components/app/Dashboard";
import Login from "../components/app/Login";
import NotFound from "../components/app/NotFound";
import Seo from "../components/seo";

const App = () => (
    <Layout>
        <Router>
            <PrivateRoute component={Dashboard} path="/dashboard/" />
            <Login path="/login/" />
            <NotFound default />
        </Router>
    </Layout>
);
export default App;

export const Head = () => {
    const location = useLocation();

    let title, pathname;

    switch (location.pathname) {
        case "/dashboard/":
            title = "Dashboard";
            pathname = "/dashboard/";
            break;
        case "/login/":
            title = "Login / Registreer";
            pathname = "/login/";
            break;
        default:
            title = "404";
            pathname = "/";
    }

    return <Seo title={title} pathname={pathname} />;
};
