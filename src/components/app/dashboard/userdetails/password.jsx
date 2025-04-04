import React, { useState, useEffect } from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/profileInfo.module.scss";

const Password = ({
    userId,
    apiURL,
    token,
    password,
    setPassword,
    setProfileSuccess,
    setValidationMessage,
}) => {
    const [validationError, setValidationError] = useState(null);

    const setPasswordHandler = (e) => {
        setPassword(e.target.value);
        setValidationError(null);
        setValidationMessage(null);
    };

    const validateInput = (value) => {
        if (value.length < 2) {
            const errorMessage = "Minstens 2 karakters";
            setValidationError(errorMessage);
            setValidationMessage(errorMessage);
            return false;
        }

        setValidationError(null);
        setValidationMessage(null);
        return true;
    };

    const submitPassword = async (e) => {
        e.preventDefault();

        if (!validateInput(password)) {
            return;
        }

        const params = { password: password };

        try {
            await axios.put(`${apiURL}/api/users/${userId}`, params, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setProfileSuccess("Wachtwoord succesvol geüpdatet");
            setTimeout(() => setProfileSuccess(null), 5000);
            setPassword("");
        } catch {
            console.error("Error updating password:", error);
            setError("Gaat er iets mis met het updaten van je wachtwoord");
            setTimeout(() => setError(null), 5000);
        }
    };

    return (
        <form
            onSubmit={submitPassword}
            className={styles.profileField}
            noValidate
        >
            <label htmlFor="password">Wachtwoord</label>
            <input
                id="password"
                onChange={setPasswordHandler}
                value={password}
                placeholder="*********"
                type="password"
                name="password"
                style={{ color: validationError ? "#c60319" : "inherit" }}
                autoComplete="new-password"
            />

            <button
                type="submit"
                title="Sla nieuw wachtwoord op"
                className={styles.updateBtn}
                disabled={password === ""}
            >
                <i className="fa-solid fa-floppy-disk fa-lg" />
            </button>
        </form>
    );
};

export default Password;
