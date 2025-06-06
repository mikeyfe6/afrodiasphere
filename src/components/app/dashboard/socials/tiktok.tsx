import * as React from "react";

import * as styles from "../../../../styles/modules/dashboard/socials.module.scss";

const TikTok: React.FC<TikTokProps> = ({
    tkLink,
    setTkLink,
    handleSmLinkChange,
    loadingData,
}) => {
    const setTkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <span>tiktok.com/</span>
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
