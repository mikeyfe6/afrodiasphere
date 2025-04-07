import React, { useState, useEffect } from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/biography.module.scss";

const Biography: React.FC<BiographyProps> = ({
    docId,
    apiURL,
    token,
    biography,
    setBiography,
    loadingData,
}) => {
    const [initialValue, setInitialValue] = useState(biography);
    const [validationError, setValidationError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!initialValue) {
            setInitialValue(biography);
        }
    });

    const setBiographyHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBiography(e.target.value);
        setValidationError(false);
        setSuccess(false);
    };

    const validateInput = (value: string) => {
        if (value.length > 240) {
            setValidationError(true);
            setSuccess(false);
            return false;
        }

        setValidationError(false);
        return true;
    };

    const submitBiography = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateInput(biography)) {
            return;
        }

        setIsSubmitting(true);

        const params = { biography: biography };

        try {
            await axios.put(
                `${apiURL}/api/pages/${docId}`,
                { data: params },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
            setInitialValue(biography);
        } catch (error) {
            console.error("Error updating biography:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={submitBiography} className={styles.biography}>
            <label htmlFor="biography">Biografie</label>
            <textarea
                id="biography"
                name="biography"
                placeholder="Voer hier een korte beschrijving in van max 240 tekens.."
                value={biography || ""}
                onChange={setBiographyHandler}
                disabled={loadingData || isSubmitting}
                style={{
                    borderColor: validationError
                        ? "#c60319"
                        : success
                        ? "#407e2b"
                        : "#cc9932",
                }}
            />
            <div>
                <span
                    style={{
                        color: biography
                            ? biography.length > 240
                                ? "#c60319"
                                : "#cc9932"
                            : "#cc9932",
                    }}
                >
                    {" "}
                    {biography ? biography.length : 0}
                </span>
                <span> / 240</span>
            </div>
            <button
                type="submit"
                title="Sla biografie op"
                disabled={biography === initialValue || isSubmitting}
            >
                Opslaan
            </button>
        </form>
    );
};

export default Biography;
