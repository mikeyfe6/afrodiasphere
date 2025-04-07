import React, { useState, useEffect } from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/profileInfo.module.scss";

const Profile: React.FC<ProfileProps> = ({
    docId,
    apiURL,
    token,
    profile,
    setProfile,
    setProfileSuccess,
    setValidationMessage,
    loadingData,
}) => {
    const [initialValue, setInitialValue] = useState(profile);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!initialValue) {
            setInitialValue(profile);
        }
    });

    const setProfileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile(e.target.value);
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
        const regex = /^[a-zA-Z0-9.,() ]+$/;

        if (!regex.test(value)) {
            const errorMessage =
                "Alleen letters en speciale tekens die zijn beperkt tot punt, komma, haakjes en cijfers.";
            setValidationError(errorMessage);
            setValidationMessage(errorMessage);
            return false;
        }

        setValidationError(null);
        setValidationMessage(null);
        return true;
    };

    const submitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateInput(profile)) {
            return;
        }

        setIsSubmitting(true);

        const params = {
            profile: profile,
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

            setProfileSuccess("Profielnaam succesvol geüpdatet");
            setTimeout(() => setProfileSuccess(null), 5000);
            setInitialValue(profile);
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={submitProfile}
            className={styles.profileField}
            noValidate
        >
            <label htmlFor="profile">Profielnaam</label>
            <input
                id="profile"
                type="text"
                name="profile"
                value={profile}
                onChange={setProfileHandler}
                disabled={loadingData || isSubmitting}
                style={{ color: validationError ? "#c60319" : "inherit" }}
            />
            <button
                type="submit"
                title="Sla profielnaam op"
                disabled={profile === initialValue || isSubmitting}
            >
                <i className="fa-solid fa-floppy-disk fa-lg" />
            </button>
        </form>
    );
};

export default Profile;
