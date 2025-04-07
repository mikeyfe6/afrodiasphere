import * as React from "react";

import * as styles from "../../../../styles/modules/dashboard/socials.module.scss";

const Whatsapp: React.FC<WhatsappProps> = ({
    waLink,
    setWaLink,
    handleSmLinkChange,
    loadingData,
}) => {
    const setWaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWaLink = e.target.value.toLowerCase();
        setWaLink(newWaLink);

        handleSmLinkChange("whatsapp", newWaLink);
    };

    return (
        <form className={styles.socialField}>
            <div>
                <label htmlFor="walink">
                    <i
                        className="fa-brands fa-whatsapp"
                        style={{ color: "#3FD252" }}
                    />
                    <span>wa.me/</span>
                </label>
                <input
                    id="walink"
                    name="walink"
                    type="text"
                    maxLength={15}
                    placeholder="bijv. 31612345678"
                    value={waLink}
                    onChange={setWaHandler}
                    disabled={loadingData}
                />
            </div>
        </form>
    );
};

export default Whatsapp;
