import React, { useState, useRef, useEffect } from "react";

import axios from "axios";

import * as styles from "../../../../styles/modules/dashboard/links.module.scss";

const ErrorMessage: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className={styles.error}>
            <span>{text}</span>
        </div>
    );
};

const SuccessMessage: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className={styles.success}>
            <span>{text}</span>
        </div>
    );
};

const Links: React.FC<LinksProps> = ({
    pageId,
    docId,
    apiURL,
    token,
    links,
    setLinks,
}) => {
    const linkTitle = useRef<HTMLInputElement>({
        value: "",
    } as HTMLInputElement);
    const linkUrl = useRef<HTMLInputElement>({ value: "" } as HTMLInputElement);
    const [linkError, setLinkError] = useState<string | null>(null);
    const [linkSuccess, setLinkSuccess] = useState<string | null>(null);

    const [editLinkTitle, setEditLinkTitle] = useState<{
        [key: string]: string;
    }>({});
    const [editLinkUrl, setEditLinkUrl] = useState<{ [key: string]: string }>(
        {}
    );

    useEffect(() => {
        const getLinks = async () => {
            if (!docId) {
                console.error("Page DocumentID is missing.");
                return;
            }

            try {
                const res = await axios.get(
                    `${apiURL}/api/pages/${docId}?populate[0]=links`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const data = res.data.data;

                if (data && data.links) {
                    setLinks(data.links);
                } else {
                    setLinks([]);
                }

                setLinkError(null);
            } catch (error) {
                console.error("Error fetching user links:", error);
                setLinkError("Failed to fetch links.");
            }
        };

        if (docId) {
            getLinks();
        }
    }, [apiURL, token, docId]);

    const createLink = async () => {
        if (
            (!linkTitle.current?.value && !linkUrl.current?.value) ||
            /^\s*$/.test(
                (linkTitle.current?.value || "") &&
                    (linkUrl.current?.value || "")
            )
        ) {
            return [
                setLinkError(
                    "Posten mislukt, voer de titel of link correct door.."
                ),
                setTimeout(() => setLinkError(null), 7500),
            ];
        }

        const params = {
            title: linkTitle.current?.value || "",
            url: linkUrl.current?.value || "",
            page: pageId,
        };

        try {
            const res = await axios.post(
                `${apiURL}/api/links`,
                { data: params },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data && res.data.data) {
                const newLink = res.data.data;

                const newLinks = Array.isArray(links)
                    ? [...links, newLink]
                    : [newLink];
                setLinks(newLinks);
                setLinkSuccess("Link succesvol toegevoegd.");
                setTimeout(() => setLinkSuccess(null), 5000);
                setLinkError(null);
            }
            if (linkTitle.current) {
                linkTitle.current.value = "";
            }
            if (linkUrl.current) {
                linkUrl.current.value = "";
            }
        } catch (err) {
            console.error("Error creating link:", err);
        }
    };

    const editTheLinkTitle = async (link: { value: string; docId: string }) => {
        const changedLinkTitle = link.value.trim();

        if (!changedLinkTitle || /^\s*$/.test(changedLinkTitle)) {
            setLinkError("Updaten mislukt, voer de titel correct door..");
            setTimeout(() => setLinkError(null), 7500);
            return;
        }

        const params = { title: changedLinkTitle };

        try {
            const res = await axios.put(
                `${apiURL}/api/links/${link.docId}`,
                { data: params },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data?.data) {
                const updatedLink = res.data.data;

                const newLinks = links.map((el) =>
                    el.documentId === updatedLink.documentId
                        ? { ...el, ...updatedLink }
                        : el
                );

                setLinks(newLinks);
            }

            setEditLinkTitle((prev) => ({ ...prev, [link.docId]: "" }));
        } catch (err) {
            console.error("Error updating link:", err);
        }
    };

    const handleEditLink = (
        event: React.ChangeEvent<HTMLInputElement>,
        linkId: string
    ) => {
        setEditLinkTitle({ ...editLinkTitle, [linkId]: event.target.value });
    };

    const editTheHyperLink = async (link: { value: string; docId: string }) => {
        const changedLinkUrl = link.value.trim();

        if (!changedLinkUrl) {
            setLinkError("Update failed, enter a valid link.");
            setTimeout(() => setLinkError(null), 5000);
            return;
        }

        const params = { url: changedLinkUrl, page: pageId };

        try {
            const res = await axios.put(
                `${apiURL}/api/links/${link.docId}`,
                { data: params },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data?.data) {
                const updatedLink = res.data.data;

                const newLinks = links.map((el) =>
                    el.documentId === updatedLink.documentId
                        ? { ...el, ...updatedLink }
                        : el
                );

                setLinks(newLinks);
            }

            setEditLinkUrl((prev) => ({ ...prev, [link.docId]: "" }));
            setEditLinkUrl({});
        } catch (err) {
            console.error("Error updating link:", err);
        }
    };

    const handleEditHyperLink = (
        event: React.ChangeEvent<HTMLInputElement>,
        linkId: string
    ) => {
        setEditLinkUrl({ ...editLinkUrl, [linkId]: event.target.value });
    };

    const toggleLink = async (
        link: { documentId: string; visible: boolean },
        checked: boolean
    ) => {
        const params = { visible: checked };
        try {
            const res = await axios.put(
                `${apiURL}/api/links/${link.documentId}`,
                { data: params },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data?.data) {
                const updatedLink = res.data.data;

                const newLinks = links.map((el) =>
                    el.documentId === updatedLink.documentId
                        ? { ...el, ...updatedLink }
                        : el
                );

                setLinks(newLinks);
            }
        } catch (err) {
            console.error("Error updating link visibility:", err);
        }
    };

    const deleteLink = async (link: { documentId: string }) => {
        await axios.delete(`${apiURL}/api/links/${link.documentId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setLinks(links.filter((el) => el.documentId !== link.documentId));
    };

    return (
        <>
            <div className={styles.newLink}>
                <div className={styles.newLinkFields}>
                    <div className={styles.newTitle}>
                        <label htmlFor="newtitle">
                            <h4 style={{ color: "#fcfcfc" }}>
                                Titel<span>:</span>
                            </h4>
                        </label>
                        <input
                            id="newtitle"
                            type="text"
                            name="title"
                            placeholder="voer een titel in"
                            ref={linkTitle}
                            minLength={5}
                            required
                        />
                    </div>
                    <hr />
                    <div className={styles.newHyperlink}>
                        <label htmlFor="newhyperlink">
                            <h4 style={{ color: "#fcfcfc" }}>
                                Hyperlink<span>:</span>
                            </h4>
                        </label>
                        <input
                            id="newhyperlink"
                            type="url"
                            name="url"
                            placeholder="voorbeeld.nl"
                            ref={linkUrl}
                            style={{ textTransform: "lowercase" }}
                            minLength={5}
                            title="Let op: 'http(s)://' NIET nodig !"
                            required
                        />
                    </div>
                </div>

                <div className={styles.newLinkBtns}>
                    <button
                        onClick={(event) => {
                            createLink();
                            event.preventDefault();
                        }}
                    >
                        Creëer link
                    </button>
                    <button
                        onClick={(event) => {
                            linkTitle.current.value = "";
                            linkUrl.current.value = "";
                            event.preventDefault();
                        }}
                    >
                        Reset invoer
                    </button>
                </div>
            </div>

            <div className={styles.logs}>
                {linkError && <ErrorMessage text={linkError} />}
                {linkSuccess && <SuccessMessage text={linkSuccess} />}
            </div>

            {links && links.length > 0 ? (
                <ul className={styles.linkList}>
                    {links.map((link, index) => (
                        <li key={index} className={styles.link}>
                            <div className={styles.linkFields}>
                                <div className={styles.linkTitle}>
                                    <div>
                                        <span>
                                            <p title={link.title}>
                                                {link.title}
                                            </p>
                                        </span>
                                        <hr />
                                        <input
                                            id={`editTitle${link.documentId}`}
                                            type="text"
                                            value={
                                                editLinkTitle[
                                                    link.documentId
                                                ] || ""
                                            }
                                            onChange={(event) =>
                                                handleEditLink(
                                                    event,
                                                    link.documentId
                                                )
                                            }
                                            placeholder="bewerk titel"
                                            minLength={5}
                                            required
                                        />
                                    </div>
                                    <button
                                        title="Sla nieuwe titel op"
                                        disabled={
                                            !editLinkTitle[link.documentId] ||
                                            editLinkTitle[
                                                link.documentId
                                            ].trim() === ""
                                        }
                                        onClick={(event) => {
                                            editTheLinkTitle({
                                                value: editLinkTitle[
                                                    link.documentId
                                                ],
                                                docId: link.documentId,
                                            });
                                            event.preventDefault();
                                        }}
                                    >
                                        {!editLinkTitle[link.documentId] ||
                                        editLinkTitle[
                                            link.documentId
                                        ].trim() === "" ? (
                                            <i className="fa-solid fa-ellipsis" />
                                        ) : (
                                            <i className="fa-solid fa-check" />
                                        )}
                                    </button>
                                </div>
                                <div className={styles.linkUrl}>
                                    <div>
                                        <span>
                                            <a
                                                href={`https://${link.url}`}
                                                title={`https://${link.url}`}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                {link.url}
                                            </a>
                                            <i className="fa-solid fa-square-arrow-up-right fa-xs" />
                                        </span>
                                        <hr />
                                        <input
                                            id={`editUrl${link.documentId}`}
                                            type="url"
                                            value={
                                                editLinkUrl[link.documentId] ||
                                                ""
                                            }
                                            onChange={(event) =>
                                                handleEditHyperLink(
                                                    event,
                                                    link.documentId
                                                )
                                            }
                                            placeholder="bewerk hyperlink"
                                            minLength={5}
                                            required
                                        />
                                    </div>
                                    <button
                                        title="Sla nieuwe hyperlink op"
                                        disabled={
                                            !editLinkUrl[link.documentId] ||
                                            editLinkUrl[
                                                link.documentId
                                            ].trim() === ""
                                        }
                                        onClick={(event) => {
                                            editTheHyperLink({
                                                value: editLinkUrl[
                                                    link.documentId
                                                ],
                                                docId: link.documentId,
                                            });
                                            event.preventDefault();
                                        }}
                                    >
                                        {!editLinkUrl[link.documentId] ||
                                        editLinkUrl[link.documentId].trim() ===
                                            "" ? (
                                            <i className="fa-solid fa-ellipsis" />
                                        ) : (
                                            <i className="fa-solid fa-check" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.linkBtns}>
                                <div
                                    className={styles.trashBtn}
                                    title="Verwijder deze link"
                                    onClick={(event) => {
                                        deleteLink(link);
                                        event.preventDefault();
                                    }}
                                >
                                    <i className="fa-solid fa-trash-can fa-lg" />
                                </div>
                                <div className={styles.showBtn}>
                                    <input
                                        title="Maak link (ont)zichtbaar"
                                        type="checkbox"
                                        hidden
                                        id={`checkbox${link.documentId}`}
                                        checked={link.visible}
                                        onChange={(e) =>
                                            toggleLink(link, e.target.checked)
                                        }
                                    />

                                    <span
                                        onClick={() =>
                                            toggleLink(link, !link.visible)
                                        }
                                    >
                                        {link.visible ? (
                                            <i
                                                className="fa-solid fa-eye"
                                                title="Maak link ontzichtbaar"
                                            />
                                        ) : (
                                            <i
                                                className="fa-solid fa-eye-slash"
                                                title="Maak link zichtbaar"
                                            />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <button
                    className={styles.noLinks}
                    onClick={() => linkTitle.current.focus()}
                >
                    Creëer je eerste link!
                </button>
            )}
        </>
    );
};

export default Links;
