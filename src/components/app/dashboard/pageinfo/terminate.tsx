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
    links,
    username,
    setValidationMessage,
}) => {
    const [deleteAds, setDeleteAds] = useState("");
    const [validationError, setValidationError] = useState(null);

    const setDeleteHandler = (e) => {
        setDeleteAds(e.target.value.toLowerCase().replace(/\s+/g, ""));
        setValidationError(null);
        setValidationMessage(null);
    };

    const validateInput = (value) => {
        if (username !== value) {
            const errorMessage =
                "Vul je gebruikersnaam in om je profiel te verwijderen.";
            setValidationError(errorMessage);
            setValidationMessage(errorMessage);
            return false;
        }

        setValidationError(null);
        setValidationMessage(null);
        return true;
    };

    const submitDeleteAds = async (e) => {
        e.preventDefault();

        if (!validateInput(deleteAds)) {
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
            console.error("Error deleting ADS:", error);
        }
    };

    return (
        <form
            onSubmit={submitDeleteAds}
            className={styles.profileField}
            noValidate
        >
            <label htmlFor="deleteAds">Verwijder profiel</label>
            <input
                id="deleteAds"
                onChange={setDeleteHandler}
                value={deleteAds}
                type="text"
                name="deleteAds"
                placeholder="controle: profielnaam?"
                style={{ color: validationError ? "#c60319" : "inherit" }}
            />

            <button
                type="submit"
                title="Verwijder account"
                className={styles.terminateBtn}
                disabled={deleteAds === ""}
            >
                <i className="fa-solid fa-trash-can fa-lg" />
            </button>
        </form>
    );
};

export default Terminate;
