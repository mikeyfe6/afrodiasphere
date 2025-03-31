import React, { useState, useRef, useEffect } from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/avatar.module.scss";

const Avatar = ({
    docId,
    pageId,
    avatarId,
    apiURL,
    token,
    setSuccess,
    setPreview,
    preview,
    noavatar,
    loadingData,
    avatar,
    setAvatar,
}) => {
    const [image, setImage] = useState(null);

    const fileInputRef = useRef();

    useEffect(() => {
        if (avatar) {
            setAvatar(avatar);
        }
    }, [avatar, setAvatar]);

    const deleteAvatar = async (e) => {
        e.preventDefault();
        setImage(null);
        setPreview(noavatar);

        try {
            setSuccess(true);
            await axios.delete(`${apiURL}/api/upload/files/${avatarId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTimeout(() => setSuccess(false), 5000);
            setAvatar(null);
        } catch (error) {
            console.error(
                "Avatar verwijderen lukt niet, probeer het nog 's",
                error
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSuccess(true);
            const imgData = new FormData();
            imgData.append("files", image);
            imgData.append("ref", "api::page.page");
            imgData.append("refId", pageId);
            imgData.append("field", "avatar");

            const response = await axios.post(
                `${apiURL}/api/upload/`,
                imgData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const uploadedAvatarId = response.data[0].id;
            const avatarUrl = response.data[0].url;

            await axios.put(
                `${apiURL}/api/pages/${docId}`,
                {
                    data: {
                        avatar: uploadedAvatarId,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAvatar(avatarUrl);
            setSuccess(false);
        } catch (error) {
            console.log("Niet gelukt!", error);
        }
    };

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        }
    }, [image, setPreview]);

    return (
        <form onSubmit={handleSubmit} className={styles.avatar}>
            <img
                src={preview}
                alt=""
                className={styles.avatarImage}
                style={{ filter: loadingData ? "blur(2px)" : "none" }}
            />

            <div className={styles.avatarButtons}>
                <button
                    className={styles.addBtn}
                    onClick={(event) => {
                        event.preventDefault();
                        fileInputRef.current.click();
                    }}
                    title="Kies een avatar"
                >
                    {!image ? "Avatar" : "Verander"}
                </button>
                <button
                    className={styles.resetBtn}
                    type="reset"
                    onClick={deleteAvatar}
                    title="Verwijder jouw avatar"
                    disabled={
                        avatar === null || (image !== null && avatar !== null)
                    }
                >
                    Verwijder
                </button>
                <input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    ref={fileInputRef}
                    onChange={(event) => {
                        const file = event.target.files[0];

                        if (file && file.type.substring(0, 5) === "image") {
                            setImage(file);
                        } else {
                            setImage(null);
                        }
                    }}
                />
                <button
                    className={styles.submitBtn}
                    type="submit"
                    title="Sla jouw avatar op"
                    disabled={image === null}
                >
                    Opslaan
                </button>
            </div>
        </form>
    );
};

export default Avatar;
