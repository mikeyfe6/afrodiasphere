import * as React from "react";

import * as styles from "../../../../styles/modules/dashboard/socials.module.scss";

const Patreon: React.FC<PatreonProps> = ({
    paLink,
    setPaLink,
    handleSmLinkChange,
    loadingData,
}) => {
    const setPaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPaLink = e.target.value.toLowerCase();
        setPaLink(newPaLink);

        handleSmLinkChange("patreon", newPaLink);
    };

    return (
        <form className={styles.socialField}>
            <div>
                <label htmlFor="palink">
                    <i
                        className="fa-brands fa-patreon"
                        style={{ color: "#000000" }}
                    />
                    <span>patreon.com/</span>
                </label>
                <input
                    id="palink"
                    name="palink"
                    type="text"
                    placeholder="jouwprofiel"
                    value={paLink}
                    onChange={setPaHandler}
                    disabled={loadingData}
                />
            </div>
        </form>
    );
};

export default Patreon;
