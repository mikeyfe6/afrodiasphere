import * as React from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/profileInfo.module.scss";

// TODO: add a doublecheck for the right password & validation & message !!!

const Password = ({
    userId,
    apiURL,
    token,
    setLoading,
    setError,
    password,
    setPassword,
}) => {
    const setPasswordHandler = (e) => {
        setPassword(e.target.value);
    };

    const submitPassword = async (e) => {
        e.preventDefault();

        const params = { password: password };
        try {
            await axios.put(`${apiURL}/api/users/${userId}`, params, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setError(null);
            setPassword("");
        } catch {
            setError("Gaat er iets mis met het updaten van je wachtwoord");
            setTimeout(() => setError(null), 5000);
        }
    };

    return (
        <form onSubmit={submitPassword} className={styles.profileField}>
            <label htmlFor="password">Wachtwoord</label>
            <input
                onChange={setPasswordHandler}
                value={password}
                placeholder="*********"
                type="password"
                name="password"
                id="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
                autoComplete="new-password"
            />

            <button
                type="submit"
                title="Sla nieuw wachtwoord op"
                className={styles.updateBtn}
                disabled={setLoading || password === ""}
            >
                <i className="fa-solid fa-floppy-disk fa-lg" />
            </button>
        </form>
    );
};

export default Password;
