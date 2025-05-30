import * as React from "react";

import * as styles from "../../../../styles/modules/dashboard/socials.module.scss";

const Linkedin: React.FC<LinkedinProps> = ({
    liLink,
    setLiLink,
    handleSmLinkChange,
    loadingData,
}) => {
    const setLiHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLiLink = e.target.value.toLowerCase();
        setLiLink(newLiLink);

        handleSmLinkChange("linkedin", newLiLink);
    };

    return (
        <form className={styles.socialField}>
            <div>
                <label htmlFor="lilink">
                    <i
                        className="fa-brands fa-linkedin"
                        style={{ color: "#0366C3" }}
                    />
                    <span>linkedin.com/</span>
                </label>
                <input
                    id="lilink"
                    name="lilink"
                    type="text"
                    placeholder="jouwprofiel"
                    value={liLink}
                    onChange={setLiHandler}
                    disabled={loadingData}
                />
            </div>
        </form>
    );
};

export default Linkedin;
