import * as React from "react";

import * as styles from "../../../../styles/modules/dashboard/socials.module.scss";

const Snapchat = ({ snLink, setSnLink, handleSmLinkChange, loadingData }) => {
    const setSnHandler = (e) => {
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
                        style={{ color: "#F7F401" }}
                    />
                    snapchat.com/
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
