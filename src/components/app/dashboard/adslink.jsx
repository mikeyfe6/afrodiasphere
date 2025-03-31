import * as React from "react";

import { Link } from "gatsby";

import * as styles from "../../../styles/modules/dashboard/adslink.module.scss";

const AdsLink = ({ slug, baseURL }) => {
    return (
        <div className={styles.adsLink}>
            <div className={styles.adsPrefix}>
                <b>Afrodiasphere URL</b>
            </div>

            <div className={styles.adsSlug}>
                {slug ? (
                    <Link to={`/${slug}/`} title={`${baseURL}/${slug}/`}>
                        <span>・</span>
                        <span>/</span>
                        <span>{slug}</span>
                    </Link>
                ) : (
                    <p>Link wordt gemaakt...</p>
                )}
            </div>
        </div>
    );
};

export default AdsLink;
