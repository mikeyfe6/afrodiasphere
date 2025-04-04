import * as React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";

import * as successStyles from "../styles/modules/pages/success.module.scss";

const SuccessPage = () => (
    <Layout>
        <div className={successStyles.success}>
            <div>
                <h1>Controleer je e-mail!</h1>
                <p>
                    Als jouw emailadres bestaat, onvtang je een e-mail met een
                    link om je wachtwoord te resetten.
                </p>
            </div>
        </div>
    </Layout>
);

export default SuccessPage;

export const Head = () => {
    return (
        <Seo title="Wachtwoord reset e-mail verzonden" pathname="/success/" />
    );
};
