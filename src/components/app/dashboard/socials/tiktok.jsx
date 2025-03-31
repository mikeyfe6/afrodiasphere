import * as React from "react";

import * as styles from "../../../../styles/modules/dashboard/socials.module.scss";

const TikTok = ({ tkLink, setTkLink, handleSmLinkChange, loadingData }) => {
    const setTkHandler = (e) => {
        const newTkLink = e.target.value.toLowerCase();
        setTkLink(newTkLink);

        handleSmLinkChange("tiktok", newTkLink);
    };

    return (
        <form className={styles.socialField}>
            <div>
                <label htmlFor="tklink">
                    <i
                        className="fa-brands fa-tiktok"
                        style={{ color: "#4BE1EB" }}
                    />
                    tiktok.com/
                </label>
                <input
                    id="tklink"
                    name="tklink"
                    type="text"
                    placeholder="jouwprofiel"
                    value={tkLink}
                    onChange={setTkHandler}
                    disabled={loadingData}
                />
            </div>
        </form>
    );
};

export default TikTok;
