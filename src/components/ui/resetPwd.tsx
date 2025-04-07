import React, { useState, useRef, useEffect } from "react";

import { useLocation } from "@reach/router";

import { navigate } from "gatsby";

import axios from "axios";

import * as styles from "../../styles/modules/pages/resetpwd.module.scss";

const apiURL = process.env.GATSBY_BACKEND_URL;

const ErrorMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className={styles.error}>
        <span>{text}</span>
    </div>
);

const LoadingMessage: React.FC<{ text: string }> = ({ text }) => (
    <div className={styles.loading}>
        <span>{text}</span>
    </div>
);

const ResetPwd = () => {
    const codeRef = useRef<HTMLInputElement | null>(null);
    const passwordResetRef = useRef<HTMLInputElement | null>(null);
    const confPasswordResetRef = useRef<HTMLInputElement | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<string | null>(null);
    const [resetCode, setResetCode] = useState<string | null>(null);

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");
        setResetCode(code);
    }, [location]);

    const handleSubmitRegister = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            await axios.post(`${apiURL}/api/auth/reset-password`, {
                code: resetCode,
                password: passwordResetRef.current?.value || "",
                passwordConfirmation: confPasswordResetRef.current?.value || "",
            });

            setLoading("Aan het laden");
            setError(null);
            navigate("/login/");
        } catch {
            setLoading(null);
            setError("Verkeerde invoer, probeer 't opnieuw");
            setTimeout(() => setError(null), 5000);
        }
    };

    return (
        <form onSubmit={handleSubmitRegister} className={styles.resetPwdForm}>
            <fieldset>
                <input
                    ref={codeRef}
                    type="text"
                    name="code"
                    placeholder="Verificatiecode"
                    value={resetCode || ""}
                    readOnly
                />
                <br />
                <input
                    ref={passwordResetRef}
                    type="password"
                    name="password"
                    placeholder="Voer een nieuw wachtwoord in"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    autoComplete="new-password"
                    title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
                />
                <br />
                <input
                    ref={confPasswordResetRef}
                    type="password"
                    name="confirmpassword"
                    placeholder="Voer jouw nieuwe wachtwoord opnieuw in"
                />
                <button type="submit">Verstuur</button>
            </fieldset>

            {error && <ErrorMessage text={error} />}
            {loading && <LoadingMessage text={loading} />}
        </form>
    );
};

export default ResetPwd;
