import * as React from "react";

import * as styles from "../../../../styles/modules/dashboard/socials.module.scss";

const Twitter = ({ twLink, setTwLink, handleSmLinkChange, loadingData }) => {
    const setTwHandler = (e) => {
        const newTwLink = e.target.value.toLowerCase();
        setTwLink(newTwLink);

        handleSmLinkChange("twitter", newTwLink);
    };

    return (
        <form className={styles.socialField}>
            <div>
                <label htmlFor="twlink">
                    <i
                        className="fa-brands fa-x-twitter"
                        style={{ color: "#000" }}
                    />
                    <span>x.com/</span>
                </label>
                <input
                    id="twlink"
                    name="twlink"
                    type="text"
                    placeholder="jouwprofiel"
                    value={twLink}
                    onChange={setTwHandler}
                    disabled={loadingData}
                />
            </div>
        </form>
    );
};

export default Twitter;
