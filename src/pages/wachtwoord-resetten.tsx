import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/layout";
import ResetPassword from "../components/ui/resetPwd";
import Seo from "../components/seo";

import mamaAfrica from "../images/mamafrica.png";

import * as styles from "../styles/modules/pages/resetpwd.module.scss";

// TODO: naam naar wachtwoord-herstellen veranderen

const ResetPwdPage: React.FC<PageProps> = () => (
    <Layout>
        <section className={styles.resetPwd}>
            <div>
                <h1>Nieuw wachtwoord</h1>
                <p>
                    Voer hieronder jouw verificatiecode en een nieuwe wachtwoord
                    in
                </p>
                <ResetPassword />
            </div>
            <img src={mamaAfrica} alt="" />
        </section>
    </Layout>
);

export default ResetPwdPage;

export const Head: HeadFC = () => {
    return <Seo title="Reset wachtwoord" pathname="/wachtwoord-resetten/" />;
};
