import React, { useState } from "react";

import { navigate } from "gatsby";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/profileInfo.module.scss";

import { logout } from "../../../../services/auth";

const Terminate = ({
    docId,
    userId,
    apiURL,
    token,
    setError,
    links,
    username,
    loadingData,
}) => {
    const [deleteAds, setDeleteAds] = useState("");

    const setDeleteHandler = (e) => {
        setDeleteAds(e.target.value.toLowerCase().replace(/\s+/g, ""));
    };

    const submitDeleteAds = async (e) => {
        e.preventDefault();

        if (deleteAds !== username) {
            setError(
                "Verkeerde profielnaam. Vul je profielnaam in om je profiel te verwijderen."
            );
            setTimeout(() => setError(null), 5000);
            return;
        }

        try {
            const jwtTokens = { headers: { Authorization: `Bearer ${token}` } };

            if (links?.length) {
                await Promise.all(
                    links.map((link) =>
                        axios
                            .delete(
                                `${apiURL}/api/links/${link.documentId}`,
                                jwtTokens
                            )
                            .catch((err) => {
                                console.error(
                                    `Failed to delete link: ${link.documentId}`,
                                    err
                                );
                            })
                    )
                );
            }

            await axios
                .delete(`${apiURL}/api/pages/${docId}`, jwtTokens)
                .catch((err) => {
                    console.error("Failed to delete page", err);
                    throw new Error("Failed to delete page");
                });

            await axios
                .delete(`${apiURL}/api/users/${userId}`, jwtTokens)
                .catch((err) => {
                    console.error("Failed to delete user", err);
                });

            logout(() => navigate("/login/"));
        } catch (error) {
            console.error("Error in submitDeleteAds:", error);
            setError("Verwijderen van je account mislukt");
            setTimeout(() => setError(null), 5000);
        }
    };

    return (
        <form onSubmit={submitDeleteAds} className={styles.profileField}>
            <label htmlFor="deleteAds">Verwijder profiel</label>
            <input
                onChange={setDeleteHandler}
                value={deleteAds}
                type="text"
                name="deleteAds"
                id="deleteAds"
                placeholder="controle: profielnaam?"
                maxLength="25"
            />

            <button
                type="submit"
                className={styles.terminateBtn}
                disabled={loadingData || deleteAds === ""}
            >
                <i className="fa-solid fa-trash-can fa-lg" />
            </button>
        </form>
    );
};

export default Terminate;
