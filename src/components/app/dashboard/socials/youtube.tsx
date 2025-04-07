import * as React from "react";

import * as styles from "../../../../styles/modules/dashboard/socials.module.scss";

const Youtube: React.FC<YoutubeProps> = ({
    ytLink,
    setYtLink,
    handleSmLinkChange,
    loadingData,
}) => {
    const setYtHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newYtLink = e.target.value.toLowerCase();
        setYtLink(newYtLink);

        handleSmLinkChange("youtube", newYtLink);
    };

    return (
        <form className={styles.socialField}>
            <div>
                <label htmlFor="ytlink">
                    <i
                        className="fa-brands fa-youtube"
                        style={{ color: "#F70001" }}
                    />
                    <span>youtube.com/</span>
                </label>
                <input
                    id="ytlink"
                    name="ytlink"
                    type="text"
                    placeholder="jouwprofiel"
                    value={ytLink}
                    onChange={setYtHandler}
                    disabled={loadingData}
                />
            </div>
        </form>
    );
};

export default Youtube;
