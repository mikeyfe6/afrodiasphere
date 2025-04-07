import * as React from "react";

import type { HeadFC, PageProps } from "gatsby";

import Layout from "../components/layout";
import ForgetPassword from "../components/ui/forgetPwd";
import Seo from "../components/seo";

import mamaAfrica from "../images/mamafrica.png";

import * as styles from "../styles/modules/pages/forgetpwd.module.scss";

const ForgetPwdPage: React.FC<PageProps> = () => (
    <Layout>
        <section className={styles.forgetPwd}>
            <h1>Wachtwoord vergeten</h1>
            <div>
                <p>
                    Voer hieronder jouw e-mailadres in & je ontvangt een e-mail
                    met daarin de verificatiecode voor het resetten van jouw
                    wachtwoord
                </p>
                <ForgetPassword />
            </div>
            <img src={mamaAfrica} alt="" />
        </section>
    </Layout>
);

export default ForgetPwdPage;

export const Head: HeadFC = () => {
    return <Seo title="Reset wachtwoord" pathname="/wachtwoord-vergeten/" />;
};
