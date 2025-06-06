import React, { useState, useEffect } from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/profileInfo.module.scss";

const Mail: React.FC<MailProps> = ({
    docId,
    apiURL,
    token,
    mail,
    setMail,
    setContactSuccess,
    setValidationMessage,
    loadingData,
}) => {
    const [initialValue, setInitialValue] = useState(mail);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!initialValue) {
            setInitialValue(mail);
        }
    });

    const setMailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value.toLowerCase());
        setValidationError(null);
        setValidationMessage(null);
    };

    const validateInput = (value: string) => {
        if (!value.trim()) {
            setValidationError(null);
            setValidationMessage(null);
            return true;
        }

        if (value.length < 2) {
            const errorMessage = "Minstens 2 karakters";
            setValidationError(errorMessage);
            setValidationMessage(errorMessage);
            setContactSuccess(null);
            return false;
        }
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(value)) {
            const errorMessage = "Voer een geldig e-mailadres in.";
            setValidationError(errorMessage);
            setValidationMessage(errorMessage);
            setContactSuccess(null);
            return false;
        }

        setValidationError(null);
        setValidationMessage(null);
        return true;
    };

    const submitMail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateInput(mail)) {
            return;
        }

        setIsSubmitting(true);

        const params = {
            email: mail.trim() === "" ? null : mail,
        };

        try {
            await axios.put(
                `${apiURL}/api/pages/${docId}`,
                { data: params },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setContactSuccess("E-mailadres succesvol geüpdatet");
            setTimeout(() => setContactSuccess(null), 5000);
            setInitialValue(mail);
        } catch (error) {
            console.error("Error updating telephone:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={submitMail} className={styles.profileField} noValidate>
            <label htmlFor="mail">E-mailadres</label>
            <input
                id="mail"
                type="email"
                name="telephone"
                placeholder="voorbeeld@email.nl"
                value={mail}
                onChange={setMailHandler}
                disabled={loadingData || isSubmitting}
                style={{ color: validationError ? "#c60319" : "inherit" }}
            />
            <button
                type="submit"
                title="Sla e-mailadres op"
                disabled={mail === initialValue || isSubmitting}
            >
                <i className="fa-solid fa-floppy-disk fa-lg" />
            </button>
        </form>
    );
};

export default Mail;
