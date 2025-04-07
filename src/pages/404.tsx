import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

// ! wordt niet gebruikt door [...].tsx

const NotFoundPage: React.FC<PageProps> = () => (
    <Layout>
        <div style={{ margin: "2.5em" }}>
            {" "}
            <h1>404: Not Found</h1>
            <p style={{ color: "#fcfcfc" }}>
                You just hit a route that doesn&#39;t exist... the sadness.
            </p>
        </div>
    </Layout>
);

export default NotFoundPage;

export const Head: HeadFC = () => {
    return <Seo title="404: Not found" pathname="/404/" />;
};
