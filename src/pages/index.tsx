import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/layout";
import Intro from "../components/ui/intro";
import Slider from "../components/ui/slider";
import Maps from "../components/ui/maps";
import Seo from "../components/seo";

const IndexPage: React.FC<PageProps> = () => {
    return (
        <Layout>
            <Intro />
            <Slider />
            <Maps />
        </Layout>
    );
};

export default IndexPage;

export const Head: HeadFC = () => {
    return <Seo title="Home" />;
};
