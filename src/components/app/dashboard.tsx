import React, { useState, useEffect, useCallback } from "react";

import { useLocation } from "@reach/router";
import { navigate } from "gatsby";

import axios from "axios";

import { getUser, logout, isLoggedIn } from "../../services/auth";

import Sidebar from "./dashboard/sidebar";
import Preview from "./dashboard/preview";
import Avatar from "./dashboard/pageinfo/avatar";
import Profile from "./dashboard/pageinfo/profile";
import Username from "./dashboard/userdetails/username";
import Email from "./dashboard/userdetails/email";
import Slug from "./dashboard/pageinfo/slug";
import Password from "./dashboard/userdetails/password";
import Terminate from "./dashboard/pageinfo/terminate";
import Occupation from "./dashboard/pageinfo/occupation";
import Biography from "./dashboard/pageinfo/biography";
import Telephone from "./dashboard/pageinfo/telephone";
import Mail from "./dashboard/pageinfo/email";
import Address from "./dashboard/pageinfo/address";
import Facebook from "./dashboard/socials/facebook";
import Twitter from "./dashboard/socials/twitter";
import Instagram from "./dashboard/socials/instagram";
import Whatsapp from "./dashboard/socials/whatsapp";
import TikTok from "./dashboard/socials/tiktok";
import Linkedin from "./dashboard/socials/linkedin";
import Pinterest from "./dashboard/socials/pinterest";
import Snapchat from "./dashboard/socials/snapchat";
import Youtube from "./dashboard/socials/youtube";
import Patreon from "./dashboard/socials/patreon";
import Links from "./dashboard/pageinfo/links";
import Themes from "./dashboard/themes";
import AdsLink from "./dashboard/adslink";

import noavatar from "../../images/noavatar.png";

import * as styles from "../../styles/modules/pages/dashboard.module.scss";

const SuccessMessage: React.FC<{ text: string | JSX.Element }> = ({ text }) => {
    return (
        <div className={styles.success}>
            <span>{text}</span>
        </div>
    );
};

const ErrorMessage: React.FC<{ text: string | JSX.Element }> = ({ text }) => {
    return (
        <div className={styles.error}>
            <span>{text}</span>
        </div>
    );
};

const DashboardPage: React.FC = () => {
    useEffect(() => {
        if (!isLoggedIn()) {
            navigate("/login/");
        }
    }, []);

    const location = useLocation();

    const apiURL = process.env.GATSBY_BACKEND_URL || "";
    const baseURL = location.origin;

    const adsUser = getUser();
    const token = adsUser.jwt;

    const [userId, setUserId] = useState<number | null>(null);
    const [pageId, setPageId] = useState<number | null>(null);
    const [docId, setDocId] = useState<string | null>(null);

    const [avatar, setAvatar] = useState<string | null>(null);
    const [avatarId, setAvatarId] = useState(null);
    const [preview, setPreview] = useState(noavatar);

    const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
    const [contactSuccess, setContactSuccess] = useState<string | null>(null);
    const [socialSuccess, setSocialSuccess] = useState<
        string | JSX.Element | null
    >(null);

    const [profileError, setProfileError] = useState<string | null>(null);
    const [contactError, setContactError] = useState<string | null>(null);
    const [socialError, setSocialError] = useState<string | null>(null);
    // const [error, setError] = useState(null);

    const [loadingData, setLoadingData] = useState(false);

    const [profile, setProfile] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [slug, setSlug] = useState("");

    const [occupation, setOccupation] = useState("");
    const [biography, setBiography] = useState("");

    const [telephone, setTelephone] = useState("");
    const [mail, setMail] = useState("");
    const [address, setAddress] = useState<LocationPin>({
        location: "",
        latitude: null,
        longitude: null,
    });

    const [fbLink, setFbLink] = useState("");
    const [twLink, setTwLink] = useState("");
    const [igLink, setIgLink] = useState("");
    const [waLink, setWaLink] = useState("");
    const [tkLink, setTkLink] = useState("");
    const [liLink, setLiLink] = useState("");
    const [piLink, setPiLink] = useState("");
    const [snLink, setSnLink] = useState("");
    const [ytLink, setYtLink] = useState("");
    const [paLink, setPaLink] = useState("");

    const [smLinks, setSmLinks] = useState({
        facebook: "",
        twitter: "",
        instagram: "",
        whatsapp: "",
        tiktok: "",
        linkedin: "",
        pinterest: "",
        snapchat: "",
        youtube: "",
        patreon: "",
    });

    const [changedSmLinks, setChangedSmLinks] = useState({});

    const [links, setLinks] = useState<LinkItem[]>([]);

    const [color, setColor] = useState("");

    const [isCollapsed, setIsCollapsed] = useState(true);

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                logout(() => navigate("/login/"));
                console.log("unauthorized, logging out ...");
            }
        }
    );

    const getUserData = useCallback(async () => {
        setLoadingData(true);

        try {
            const res = await axios.get(
                `${apiURL}/api/users/me?populate[page][populate][0]=address&populate[page][populate][1]=avatar`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setUserId(res.data.id);
            setPageId(res.data.page.id);
            setDocId(res.data.page.documentId);

            setProfile(res.data.page.profile);
            setUsername(res.data.username);
            setEmail(res.data.email);

            setSlug(res.data.page.slug);

            setOccupation(res.data.page.occupation || "");
            setBiography(res.data.page.biography || "");
            setTelephone(res.data.page.telephone || "");
            setMail(res.data.page.email || "");

            setFbLink(res.data.page.facebook || "");
            setIgLink(res.data.page.instagram || "");
            setLiLink(res.data.page.linkedin || "");
            setTkLink(res.data.page.tiktok || "");
            setTwLink(res.data.page.twitter || "");
            setWaLink(res.data.page.whatsapp || "");
            setPiLink(res.data.page.pinterest || "");
            setSnLink(res.data.page.snapchat || "");
            setYtLink(res.data.page.youtube || "");
            setPaLink(res.data.page.patreon || "");

            setColor(res.data.page.theme);

            if (res.data.page.address) {
                setAddress({
                    location: res.data.page.address.location || "",
                    latitude: res.data.page.address.latitude || null,
                    longitude: res.data.page.address.longitude || null,
                });
            }

            if (!res.data.page.avatar) {
                setPreview(noavatar);
                setAvatar(null);
            } else {
                setAvatar(res.data.page.avatar.url);
                setPreview(res.data.page.avatar.url);
                setAvatarId(res.data.page.avatar.id);
            }
        } catch (error) {
            console.error("Error fetching user ID:", error);
            // setError("Er gaat iets mis met het ophalen van je gegevens");
        } finally {
            setLoadingData(true);
        }
    }, [apiURL, token]);

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    const handleSmLinkChange = (name: string, value: string) => {
        setSmLinks((prevLinks) => ({ ...prevLinks, [name]: value }));

        setChangedSmLinks((prevChangedLinks) => ({
            ...prevChangedLinks,
            [name]: true,
        }));
    };

    const handleSaveSocials = async () => {
        let allUpdatesSuccessful = true;
        const updatedLinks = [];

        for (const [name, hasChanged] of Object.entries(changedSmLinks)) {
            if (hasChanged) {
                const params = {
                    [name]: smLinks[name as keyof typeof smLinks],
                };

                try {
                    await axios.put(
                        `${apiURL}/api/pages/${docId}`,
                        { data: params },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setSocialError(null);
                    updatedLinks.push(name);
                } catch {
                    setSocialError(
                        `Iets ging mis met het opslaan van jouw socials links`
                    );
                    setTimeout(() => setSocialError(null), 5000);
                    allUpdatesSuccessful = false;
                }

                setChangedSmLinks((prevChangedLinks) => ({
                    ...prevChangedLinks,
                    [name]: false,
                }));
            }
        }

        if (updatedLinks.length > 0) {
            setSocialSuccess(
                <>
                    Jouw socials links zijn opgeslagen:{" "}
                    <b>{updatedLinks.join(", ")}</b>
                </>
            );
            setTimeout(() => setSocialSuccess(null), 5000);
        }

        if (allUpdatesSuccessful) {
            setSmLinks({
                facebook: "",
                twitter: "",
                instagram: "",
                whatsapp: "",
                tiktok: "",
                linkedin: "",
                pinterest: "",
                snapchat: "",
                youtube: "",
                patreon: "",
            });
        }
    };

    const areAllSmLinksEmpty = () => {
        const isInputFocused = document.activeElement?.tagName === "INPUT";

        for (const link of Object.values(smLinks)) {
            if (link.trim().length === 1) {
                return true;
            }
        }

        const allLinksEmpty = Object.values(smLinks).every(
            (link) => link.trim() === ""
        );

        if (allLinksEmpty && !isInputFocused) {
            return true;
        }

        return false;
    };

    return (
        <div className={`${styles.gridContainer}`}>
            {/* SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR <--------------------------------------------------------------------------------> SIDEBAR SIDEBAR SIDEBAR SIDEBAR SIDEBAR */}

            <aside id="ads-sidebar" className={styles.sidebar}>
                <Sidebar profile={profile} loadingData={loadingData} />
            </aside>

            {/* PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW <--------------------------------------------------------------------------------> PREVIEW PREVIEW PREVIEW PREVIEW PREVIEW */}

            <section id="ads-preview" className={styles.preview}>
                <Preview
                    preview={preview}
                    profile={profile}
                    occupation={occupation}
                    biography={biography}
                    telephone={telephone}
                    mail={mail}
                    links={links}
                    fbLink={fbLink}
                    twLink={twLink}
                    igLink={igLink}
                    waLink={waLink}
                    tkLink={tkLink}
                    liLink={liLink}
                    piLink={piLink}
                    snLink={snLink}
                    ytLink={ytLink}
                    paLink={paLink}
                    color={color}
                    loadingData={loadingData}
                />
            </section>

            {/* DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD <-------------------------------------------------------> DASHBOARD DASHBOARD DASHBOARD DASHBOARD DASHBOARD */}

            <section id="ads-dashboard" className={styles.dashboard}>
                <h2>Profiel Info</h2>

                <div className={styles.avatarWProfileInfo}>
                    <Avatar
                        pageId={pageId}
                        docId={docId}
                        avatarId={avatarId}
                        apiURL={apiURL}
                        token={token}
                        preview={preview}
                        setPreview={setPreview}
                        avatar={avatar}
                        setAvatar={setAvatar}
                        noavatar={noavatar}
                        setProfileSuccess={setProfileSuccess}
                        loadingData={loadingData}
                    />

                    {/* PROFILE INFO ROFILE INFO PROFILE INFO PROFILE INFO <-----------------------------------------------------------> PROFILE INFO PROFILE INFO PROFILE INFO PROFILE INFO */}

                    <div className={styles.profileInfo}>
                        <Profile
                            docId={docId}
                            apiURL={apiURL}
                            token={token}
                            profile={profile}
                            setProfile={setProfile}
                            setProfileSuccess={setProfileSuccess}
                            setValidationMessage={setProfileError}
                            loadingData={loadingData}
                        />

                        {!isCollapsed && (
                            <>
                                <Username
                                    userId={userId}
                                    apiURL={apiURL}
                                    token={token}
                                    username={username}
                                    setUsername={setUsername}
                                    setProfileSuccess={setProfileSuccess}
                                    setValidationMessage={setProfileError}
                                    loadingData={loadingData}
                                />

                                <Email
                                    userId={userId}
                                    apiURL={apiURL}
                                    token={token}
                                    email={email}
                                    setEmail={setEmail}
                                    setProfileSuccess={setProfileSuccess}
                                    setValidationMessage={setProfileError}
                                    loadingData={loadingData}
                                />

                                <Slug
                                    docId={docId}
                                    apiURL={apiURL}
                                    token={token}
                                    slug={slug}
                                    setSlug={setSlug}
                                    // setError={setError}
                                    loadingData={loadingData}
                                />

                                <Password
                                    userId={userId}
                                    apiURL={apiURL}
                                    token={token}
                                    username={username}
                                    password={password}
                                    setPassword={setPassword}
                                    setProfileSuccess={setProfileSuccess}
                                    setValidationMessage={setProfileError}
                                />

                                <Terminate
                                    docId={docId}
                                    userId={userId}
                                    apiURL={apiURL}
                                    token={token}
                                    links={links}
                                    username={username}
                                    setValidationMessage={setProfileError}
                                />
                            </>
                        )}

                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            style={{
                                display: "flex",
                                marginLeft: "auto",
                                backgroundColor: "#cc9932",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "0.125rem",
                                marginTop: "1rem",
                                color: "black",
                            }}
                        >
                            {isCollapsed
                                ? "Toon gebruikersdetails"
                                : "Verberg gebruikersdetails"}
                        </button>
                    </div>
                </div>

                <div className={styles.logs}>
                    {profileError && <ErrorMessage text={profileError} />}
                    {profileSuccess && <SuccessMessage text={profileSuccess} />}
                </div>

                <div className={styles.occupationWBio}>
                    <Occupation
                        docId={docId}
                        apiURL={apiURL}
                        token={token}
                        occupation={occupation}
                        setOccupation={setOccupation}
                    />

                    <Biography
                        docId={docId}
                        apiURL={apiURL}
                        token={token}
                        biography={biography}
                        setBiography={setBiography}
                        loadingData={loadingData}
                    />
                </div>

                <hr />

                <h2>Contact Info</h2>

                <div className={styles.contactInfo}>
                    <Telephone
                        docId={docId}
                        apiURL={apiURL}
                        token={token}
                        telephone={telephone}
                        setTelephone={setTelephone}
                        setContactSuccess={setContactSuccess}
                        setValidationMessage={setContactError}
                        loadingData={loadingData}
                    />

                    <Mail
                        docId={docId}
                        apiURL={apiURL}
                        token={token}
                        mail={mail}
                        setMail={setMail}
                        setContactSuccess={setContactSuccess}
                        setValidationMessage={setContactError}
                        loadingData={loadingData}
                    />
                </div>

                <div className={styles.logs}>
                    {contactError && <ErrorMessage text={contactError} />}
                    {contactSuccess && <SuccessMessage text={contactSuccess} />}
                </div>

                <Address
                    docId={docId}
                    apiURL={apiURL}
                    token={token}
                    preview={preview}
                    address={address}
                    setAddress={setAddress}
                    setContactSuccess={setContactSuccess}
                    setValidationMessage={setContactError}
                    loadingData={loadingData}
                />

                <hr />

                {/* SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT <-------------------------------------------------------> SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT SOCIAL CONT */}

                <h2>Social Links</h2>

                <div className={styles.socials}>
                    <Facebook
                        fbLink={fbLink}
                        setFbLink={setFbLink}
                        handleSmLinkChange={handleSmLinkChange}
                        loadingData={loadingData}
                    />

                    <Twitter
                        twLink={twLink}
                        setTwLink={setTwLink}
                        handleSmLinkChange={handleSmLinkChange}
                        loadingData={loadingData}
                    />

                    <Instagram
                        igLink={igLink}
                        setIgLink={setIgLink}
                        handleSmLinkChange={handleSmLinkChange}
                        loadingData={loadingData}
                    />

                    <Whatsapp
                        waLink={waLink}
                        setWaLink={setWaLink}
                        handleSmLinkChange={handleSmLinkChange}
                        loadingData={loadingData}
                    />

                    <TikTok
                        tkLink={tkLink}
                        setTkLink={setTkLink}
                        handleSmLinkChange={handleSmLinkChange}
                        loadingData={loadingData}
                    />

                    <Linkedin
                        liLink={liLink}
                        setLiLink={setLiLink}
                        handleSmLinkChange={handleSmLinkChange}
                        loadingData={loadingData}
                    />

                    <Pinterest
                        piLink={piLink}
                        setPiLink={setPiLink}
                        handleSmLinkChange={handleSmLinkChange}
                        loadingData={loadingData}
                    />

                    <Snapchat
                        snLink={snLink}
                        setSnLink={setSnLink}
                        handleSmLinkChange={handleSmLinkChange}
                        loadingData={loadingData}
                    />

                    <Youtube
                        ytLink={ytLink}
                        setYtLink={setYtLink}
                        handleSmLinkChange={handleSmLinkChange}
                        loadingData={loadingData}
                    />

                    <Patreon
                        paLink={paLink}
                        setPaLink={setPaLink}
                        handleSmLinkChange={handleSmLinkChange}
                        loadingData={loadingData}
                    />
                </div>

                <div className={styles.logs}>
                    {socialError && <ErrorMessage text={socialError} />}
                    {socialSuccess && <SuccessMessage text={socialSuccess} />}
                </div>

                <button
                    className={styles.dashBtn}
                    onClick={handleSaveSocials}
                    disabled={areAllSmLinksEmpty()}
                >
                    Opslaan
                </button>

                <hr />

                {/* ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE <--------------------------------------------------> ADD LINK SECTIE ADD LINK SECTIE ADD LINK SECTIE */}

                <h2>Link Lijst</h2>

                <Links
                    pageId={pageId}
                    docId={docId}
                    apiURL={apiURL}
                    token={token}
                    links={links}
                    setLinks={setLinks}
                />

                <hr />

                {/* CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR <------------------------------------------------------>  CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR CHOOSE COLOR*/}

                <h2>Thema's</h2>

                <Themes
                    docId={docId}
                    apiURL={apiURL}
                    token={token}
                    color={color}
                    setColor={setColor}
                />
            </section>

            {/* SLUG LINK SLUG LINK SLUG LINK SLUG LINK SLUG LINK <-----------------------------------------------> SLUG LINK SLUG LINK SLUG LINK SLUG LINK SLUG LINK */}

            <aside className={`${styles.slug}`}>
                <AdsLink slug={slug} baseURL={baseURL} />
            </aside>
        </div>
    );
};

export default DashboardPage;
