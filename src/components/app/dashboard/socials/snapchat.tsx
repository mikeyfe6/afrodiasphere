import * as React from "react";

import * as styles from "../../../../styles/modules/dashboard/socials.module.scss";

const Snapchat: React.FC<SnapchatProps> = ({
    snLink,
    setSnLink,
    handleSmLinkChange,
    loadingData,
}) => {
    const setSnHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSnLink = e.target.value.toLowerCase();
        setSnLink(newSnLink);

        handleSmLinkChange("snapchat", newSnLink);
    };

    return (
        <form className={styles.socialField}>
            <div>
                <label htmlFor="snlink">
                    <i
                        className="fa-brands fa-snapchat"
                        style={{ color: "#F7F401", fill: "red" }}
                    />
                    <span>snapchat.com/</span>
                </label>
                <input
                    id="snlink"
                    name="snlink"
                    type="text"
                    placeholder="jouwprofiel"
                    value={snLink}
                    onChange={setSnHandler}
                    disabled={loadingData}
                />
            </div>
        </form>
    );
};

export default Snapchat;
