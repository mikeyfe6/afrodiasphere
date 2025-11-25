import React, { useRef, useState } from "react";
import type { RouteComponentProps } from "@reach/router";

import { navigate, Link } from "gatsby";

import axios from "axios";

import { setUser } from "../../services/auth";

import mamaAfrica from "../../images/mamafrica.png";

import * as styles from "../../styles/modules/pages/login.module.scss";

const apiURL = process.env.GATSBY_BACKEND_URL;

const ErrorMessage: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className={styles.error}>
            <span>{text}</span>
        </div>
    );
};

const LoadingMessage: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className={styles.loading}>
            <span>{text}</span>
        </div>
    );
};

const LoginPage: React.FC<RouteComponentProps> = () => {
    const [loginError, setLoginError] = useState<string | null>(null);
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [loading, setLoading] = useState<string | null>(null);

    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const usernameRegRef = useRef<HTMLInputElement | null>(null);
    const emailRegRef = useRef<HTMLInputElement | null>(null);
    const passwordRegRef = useRef<HTMLInputElement | null>(null);
    const passwordConfirmRegRef = useRef<HTMLInputElement | null>(null);

    const signUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const container = document.getElementById("ads-form");
        if (container) {
            container.classList.add(styles.rightPanelActive);
        }
        e.preventDefault();
    };

    const signInHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const container = document.getElementById("ads-form");
        if (container) {
            container.classList.remove(styles.rightPanelActive);
        }
        e.preventDefault();
    };

    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiURL}/api/auth/local`, {
                identifier: usernameRef.current?.value?.toLowerCase() || "",
                password: passwordRef.current?.value || "",
            });

            const { data } = response;

            setLoading("Aan het laden");
            setLoginError(null);
            setUser(data);
            navigate("/dashboard/");
        } catch (error) {
            console.error("Login error:", error);

            setLoading(null);
            setLoginError("Inlogfout, probeer 't opnieuw");
            setTimeout(() => setLoginError(null), 5000);
        }
    };

    const handleSubmitRegister = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const password = passwordRegRef.current?.value || "";
        const passwordConfirm = passwordConfirmRegRef.current?.value || "";

        if (password !== passwordConfirm) {
            setRegisterError("Wachtwoorden komen niet overeen");
            setTimeout(() => setRegisterError(null), 5000);
            return;
        }

        try {
            const response = await axios.post(
                `${apiURL}/api/auth/local/register`,
                {
                    username:
                        usernameRegRef.current?.value
                            ?.toLowerCase()
                            .replace(/\s+/g, "") || "",
                    email:
                        emailRegRef.current?.value
                            ?.toLowerCase()
                            .replace(/\s+/g, "") || "",
                    password: password,
                }
            );

            const { data } = response;

            setRegisterError(null);
            setLoading("Aan het laden");

            setUser(data);

            if (process.env.NODE_ENV === "production") {
                await axios.post(
                    `https://api.netlify.com/build_hooks/61fd35548a7a1a15735fd2b8`
                );
            }

            console.log("Welkom bij Afrodiasphere!");

            navigate("/dashboard/");
        } catch (error) {
            console.error("Login error:", error);
            setLoading(null);
            setRegisterError("Registratie mislukt, probeer 't opnieuw");
            setTimeout(() => setRegisterError(null), 5000);
        }
    };

    return (
        <section className={styles.login}>
            <div>
                <h1>Log in / Registreer</h1>
                <img src={mamaAfrica} alt="" />
            </div>

            <div className={styles.loginContainer}>
                <div className={styles.loginWrapper} id="ads-form">
                    <div
                        className={`${styles.formContainer} ${styles.signUpContainer}`}
                    >
                        <form onSubmit={handleSubmitRegister} noValidate>
                            <h3>Maak een ADS-profiel aan</h3>
                            <span>
                                voer jouw e-mailadres in en kies een
                                gebruikersnaam & wachtwoord
                            </span>
                            <input
                                ref={usernameRegRef}
                                type="text"
                                name="username"
                                pattern="[^\s]+"
                                style={{ textTransform: "lowercase" }}
                                placeholder="gebruikersnaam"
                                title="Kies een gebruikersnaam"
                                autoCapitalize="none"
                            />
                            <input
                                ref={emailRegRef}
                                type="email"
                                name="email"
                                placeholder="e-mailadres"
                                style={{ textTransform: "lowercase" }}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Voer je e-mailadres in"
                                autoCapitalize="none"
                            />
                            <input
                                ref={passwordRegRef}
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                placeholder="wachtwoord"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Moet op z'n minst 1 nummer, 1 hoofdletter, 1 klein letter en 8 karakters lang zijn."
                                autoCapitalize="none"
                            />
                            <input
                                ref={passwordConfirmRegRef}
                                type="password"
                                name="passwordConfirm"
                                autoComplete="new-password"
                                placeholder="bevestig wachtwoord"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Voer hetzelfde wachtwoord nogmaals in ter bevestiging."
                                autoCapitalize="none"
                            />

                            {registerError && (
                                <ErrorMessage text={registerError} />
                            )}
                            {loading && <LoadingMessage text={loading} />}
                            <button type="submit" title="Registreer">
                                Registreer
                            </button>
                        </form>
                    </div>
                    <div
                        className={`${styles.formContainer} ${styles.signInContainer}`}
                    >
                        <form onSubmit={handleSubmitLogin} noValidate>
                            <h3>Log In</h3>
                            <span>.. met jouw ADS-profiel</span>
                            <input
                                ref={usernameRef}
                                pattern="[^\s]+"
                                type="text"
                                name="username"
                                placeholder="e-mailadres / gebruikersnaam"
                                style={{ textTransform: "lowercase" }}
                                title="Log in met jouw e-mailadres of gebruikersnaam"
                                autoCapitalize="none"
                                required
                            />
                            <input
                                ref={passwordRef}
                                type="password"
                                name="password"
                                placeholder="wachtwoord"
                                title="Voer jouw wachtwoord in"
                                autoCapitalize="none"
                                required
                            />

                            {loginError && <ErrorMessage text={loginError} />}
                            {loading && <LoadingMessage text={loading} />}

                            <Link
                                to="/wachtwoord-vergeten/"
                                className={styles.forgetLink}
                                title="Ik ben mijn wachtwoord vergeten"
                            >
                                Wachtwoord vergeten
                            </Link>

                            <button type="submit" title="Inloggen">
                                Inloggen
                            </button>
                        </form>
                    </div>
                    <div className={styles.overlayContainer}>
                        <div className={styles.overlay}>
                            <div
                                className={`${styles.overlayPanel} ${styles.overlayLeft}`}
                            >
                                <h3 className={styles.overlayTitle}>
                                    Join the movement!
                                </h3>
                                <p className={styles.overlayText}>
                                    {/* <b>Join the movement!</b> */}
                                    <span>
                                        Creëer hier jouw eigen "ADS-profiel" en
                                        voeg jouw bedrijf binnen no-time toe aan
                                        het Afrodiasphere-netwerkendomein.
                                    </span>
                                    <span>
                                        <u>Al</u> een profiel?
                                    </span>
                                    <strong>Klik hieronder..</strong>
                                </p>

                                <button
                                    onClick={signInHandler}
                                    title="Open tablad voor inloggen"
                                >
                                    Naar 'Inloggen'
                                </button>
                            </div>
                            <div
                                className={`${styles.overlayPanel} ${styles.overlayRight}`}
                            >
                                <h2 className={styles.overlayTitle}>Welkom</h2>
                                <p className={styles.overlayText}>
                                    <span>
                                        Maak optimaal gebruik van de webapp!
                                    </span>
                                    <span>
                                        {" "}
                                        Deze kan je downloaden en plaatsen op
                                        het beginscherm van jouw favoriete
                                        toestel. Zo blijf je altijd up-to-date
                                        met de nieuwste ontwikkelingen.
                                    </span>
                                    <span>
                                        Nog <u>geen</u> profiel?{" "}
                                    </span>
                                    <strong>Klik hieronder..</strong>
                                </p>

                                <button
                                    onClick={signUpHandler}
                                    title="Open tablad voor registreren"
                                >
                                    Naar 'Registreren'
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
