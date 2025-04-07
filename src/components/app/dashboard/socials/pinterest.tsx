import * as React from "react";

import * as styles from "../../../../styles/modules/dashboard/socials.module.scss";

const Pinterest: React.FC<PinterestProps> = ({
    piLink,
    setPiLink,
    handleSmLinkChange,
    loadingData,
}) => {
    const setPiHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPiLink = e.target.value.toLowerCase();
        setPiLink(newPiLink);

        handleSmLinkChange("pinterest", newPiLink);
    };

    return (
        <form className={styles.socialField}>
            <div>
                <label htmlFor="pilink">
                    <i
                        className="fa-brands fa-pinterest"
                        style={{ color: "#DF0318" }}
                    />
                    <span>pinterest.com/</span>
                </label>
                <input
                    id="pilink"
                    name="pilink"
                    type="text"
                    placeholder="jouwprofiel"
                    value={piLink}
                    onChange={setPiHandler}
                    disabled={loadingData}
                />
            </div>
        </form>
    );
};

export default Pinterest;
