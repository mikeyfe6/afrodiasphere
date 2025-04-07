import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import { Router } from "@reach/router";

import Layout from "../components/layout";
import PrivateRoute from "../components/app/privateRoute";
import Dashboard from "../components/app/dashboard";
import Login from "../components/app/login";
import NotFound from "../components/app/notFound";
import Seo from "../components/seo";

// TODO: exclude this page with noindex in seo component

const App: React.FC<PageProps> = () => (
    <Layout>
        <Router>
            <PrivateRoute component={Dashboard} path="/dashboard/" />
            <Login path="/login/" />
            <NotFound default />
        </Router>
    </Layout>
);
export default App;

export const Head: HeadFC<PageProps> = ({ location }) => {
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
