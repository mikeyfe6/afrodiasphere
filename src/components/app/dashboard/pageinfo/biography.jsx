import React, { useState, useEffect } from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/biography.module.scss";

const Biography = ({
    docId,
    apiURL,
    token,
    setSuccess,
    biography,
    setBiography,
    loadingData,
    setValidationMessage,
}) => {
    const [initialValue, setInitialValue] = useState(biography);
    const [validationError, setValidationError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!initialValue) {
            setInitialValue(biography);
        }
    });

    const setBiographyHandler = (e) => {
        setBiography(e.target.value);
        setValidationError(null);
        setValidationMessage(null);
    };

    const validateInput = (value) => {
        if (value.length > 240) {
            const errorMessage = "Maximaal 240 karakters";
            setValidationError(errorMessage);
            setValidationMessage(errorMessage);
            return false;
        }

        setValidationError(null);
        setValidationMessage(null);
        return true;
    };

    const submitBiography = async (e) => {
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

            setSuccess("Biografie succesvol geüpdatet");
            setTimeout(() => setSuccess(null), 5000);
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
                type="text"
                name="biography"
                placeholder="Voer hier een korte beschrijving in van max 240 tekens.."
                value={biography || ""}
                onChange={setBiographyHandler}
                disabled={loadingData || isSubmitting}
                style={{ borderColor: validationError ? "#CA231E" : "#cc9932" }}
            />
            <div>
                <span
                    style={{
                        color: biography
                            ? biography.length > 240
                                ? "#CA231E"
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
