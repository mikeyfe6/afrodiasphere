import React, { useState, useRef, useEffect } from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/avatar.module.scss";

const Avatar: React.FC<AvatarProps> = ({
    docId,
    pageId,
    avatarId,
    apiURL,
    token,
    preview,
    setPreview,
    avatar,
    setAvatar,
    noavatar,
    setProfileSuccess,
    loadingData,
}) => {
    const [image, setImage] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (avatar) {
            setAvatar(avatar);
        }
    }, [avatar, setAvatar]);

    const deleteAvatar = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await axios.delete(`${apiURL}/api/upload/files/${avatarId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProfileSuccess("Je avatar is verwijderd");
            setTimeout(() => setProfileSuccess(null), 5000);
            setPreview(noavatar);
            setImage(null);
            setAvatar(null);
        } catch (error) {
            console.error(
                "Avatar verwijderen lukt niet, probeer het nog 's",
                error
            );
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const imgData = new FormData();
            if (image) {
                imgData.append("files", image);
            } else {
                console.error("No image selected to upload.");
                return;
            }
            imgData.append("ref", "api::page.page");
            imgData.append("refId", pageId !== null ? pageId.toString() : "");
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

            setProfileSuccess("Je avatar is opgeslagen");
            setTimeout(() => setProfileSuccess(null), 5000);
            setAvatar(avatarUrl);
            setImage(null);
        } catch (error) {
            console.error("Niet gelukt!", error);
        }
    };

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPreview(reader.result);
                }
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
                        if (fileInputRef.current) {
                            fileInputRef.current.click();
                        }
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
                        const file = event.target.files
                            ? event.target.files[0]
                            : null;

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
