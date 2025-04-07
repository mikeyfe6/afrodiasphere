import React, { useState, useEffect } from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/profileInfo.module.scss";

const Password: React.FC<PasswordProps> = ({
    userId,
    apiURL,
    token,
    username,
    password,
    setPassword,
    setProfileSuccess,
    setValidationMessage,
}) => {
    const [validationError, setValidationError] = useState<string | null>(null);

    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
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

        setValidationError(null);
        setValidationMessage(null);
        return true;
    };

    const submitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
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
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    return (
        <form
            onSubmit={submitPassword}
            className={styles.profileField}
            noValidate
        >
            <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                value={username}
                readOnly
                hidden
            />
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
