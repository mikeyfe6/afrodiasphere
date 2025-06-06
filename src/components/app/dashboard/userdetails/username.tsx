import React, { useState, useEffect } from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/profileInfo.module.scss";

const Username: React.FC<UsernameProps> = ({
    userId,
    apiURL,
    token,
    username,
    setUsername,
    setProfileSuccess,
    setValidationMessage,
    loadingData,
}) => {
    const [initialValue, setInitialValue] = useState(username);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!initialValue) {
            setInitialValue(username);
        }
    });

    const setUsernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""));
        setValidationError(null);
        setValidationMessage(null);
    };

    const validateInput = (value: string) => {
        if (value.length < 2) {
            const errorMessage = "Minstens 2 karakters";
            setValidationError(errorMessage);
            setValidationMessage(errorMessage);
            return false;
        }

        const regex = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/;

        if (!regex.test(value)) {
            const errorMessage =
                "Alleen letters, cijfers en speciale tekens zijn beperkt tot een punt.";
            setValidationError(errorMessage);
            setValidationMessage(errorMessage);
            return false;
        }

        setValidationError(null);
        setValidationMessage(null);
        return true;
    };

    const submitUsername = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateInput(username)) {
            return;
        }

        setIsSubmitting(true);

        const params = { username: username };

        try {
            await axios.put(`${apiURL}/api/users/${userId}`, params, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setProfileSuccess("Gebruikersnaam succesvol geüpdatet");
            setTimeout(() => setProfileSuccess(null), 5000);
            setInitialValue(username);
        } catch (error) {
            console.error("Error updating username:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={submitUsername}
            className={styles.profileField}
            noValidate
        >
            <label htmlFor="username">Gebruikersnaam</label>
            <input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={setUsernameHandler}
                disabled={loadingData || isSubmitting}
                style={{ color: validationError ? "#c60319" : "inherit" }}
            />
            <button
                type="submit"
                title="Sla gebruikersnaam op"
                disabled={username === initialValue || isSubmitting}
            >
                <i className="fa-solid fa-floppy-disk fa-lg" />
            </button>
        </form>
    );
};

export default Username;
