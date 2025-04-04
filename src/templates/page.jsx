import React, { useEffect, useState } from "react";

import { useLocation } from "@reach/router";
import { Link } from "gatsby";

import axios from "axios";
import GoogleMapReact from "google-map-react";

import { isLoggedIn, isBrowser, getUser } from "../services/auth";

import AdsLayout from "../components/adslayout";
import Spinner from "../components/ui/spinner";
import Seo from "../components/seo";

import noavatar from "../images/noavatar.png";
import afroLogo from "../images/logo/ads-logo.png";

import * as mapsStyles from "../styles/modules/ui/maps.module.scss";
import "../styles/adspage.scss";

const defaultProps = {
    center: { lat: 52.30994007862562, lng: 4.974422834381031 },
    zoom: 15,
};

const apiURL = process.env.GATSBY_BACKEND_URL;

const AdsTemplate = ({ pageContext: { slug, documentId } }) => {
    const [color, setColor] = useState("zwart");
    const [avatar, setAvatar] = useState(noavatar);
    const [profile, setProfile] = useState("");
    const [occupation, setOccupation] = useState("");
    const [biography, setBiography] = useState("");
    const [links, setLinks] = useState([]);
    const [spinner, setSpinner] = useState(true);

    const [telephone, setTelephone] = useState("");
    const [mail, setMail] = useState("");
    const [address, setAddress] = useState({
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

    const adsUser = getUser();

    const location = useLocation();
    const baseURL = location.origin;

    useEffect(() => {
        const getPageData = async () => {
            try {
                const res = await axios.get(
                    `${apiURL}/api/pages/${documentId}/?populate[0]=avatar&populate[1]=address&populate[2]=links`
                );

                setColor(res.data.data.theme);
                setTelephone(res.data.data.telephone);
                setMail(res.data.data.email);
                setProfile(res.data.data.profile);
                setOccupation(res.data.data.occupation);
                setLinks(res.data.data.links);
                setBiography(res.data.data.biography);
                setAddress(res.data.data.address);

                setFbLink(res.data.data.facebook);
                setTwLink(res.data.data.twitter);
                setIgLink(res.data.data.instagram);
                setWaLink(res.data.data.whatsapp);
                setTkLink(res.data.data.tiktok);
                setLiLink(res.data.data.linkedin);
                setPiLink(res.data.data.pinterest);
                setSnLink(res.data.data.snapchat);
                setYtLink(res.data.data.youtube);
                setPaLink(res.data.data.patreon);

                if (!res.data.data.avatar) {
                    setAvatar(noavatar);
                } else {
                    setAvatar(res.data.data.avatar.url);
                }
            } catch (error) {
                console.error("Error fetching page data:", error);
            } finally {
                setSpinner(false);
            }
        };
        getPageData();
    }, [documentId]);

    const Marker = ({ lat, lng }) => {
        return (
            <div data-lat={lat} data-lng={lng} className={mapsStyles.marker}>
                <img src={avatar} alt={profile} />
            </div>
        );
    };

    const isShareSupported = () => {
        console.log("isShareSupported", navigator.share);
        return navigator.share !== undefined;
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: profile,
                    text: biography,
                    url: baseURL + slug,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            console.error("Web Share API not supported in this browser.");
        }
    };

    const hasLinks = () => {
        const hasLink = links.some((link) => link.visible);
        return hasLink;
    };

    const hasSocials = () => {
        const hasSocialLink = [
            fbLink,
            twLink,
            igLink,
            waLink,
            tkLink,
            liLink,
            piLink,
            snLink,
            ytLink,
            paLink,
        ].some((link) => typeof link === "string" && link.length > 1);

        return hasSocialLink;
    };

    const hasAddress = () => {
        if (!address) {
            return false;
        }

        const hasAddressLink =
            address.latitude || address.longitude || address.location;

        return hasAddressLink;
    };

    return (
        <>
            {spinner ? (
                <Spinner />
            ) : (
                <AdsLayout>
                    <div className={`theme-${color}`}>
                        <div className={`theme-avatar-contact`}>
                            {mail && (
                                <a
                                    href={`mailto:${mail}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className={`theme-email`}
                                >
                                    <i className="fa-solid fa-envelope fa-xl" />
                                </a>
                            )}

                            <img src={avatar} alt={profile} />

                            {telephone && (
                                <a
                                    href={`tel:${telephone}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className={`theme-telephone`}
                                >
                                    <i className="fa-solid fa-phone fa-xl" />
                                </a>
                            )}
                        </div>

                        <h1 className={`theme-${color}-username`}>{profile}</h1>

                        {occupation && occupation !== "geen" && (
                            <p className={`theme-${color}-occupate`}>
                                {occupation}
                            </p>
                        )}

                        {biography && biography.length > 1 && (
                            <p className={`theme-${color}-biography`}>
                                {biography}
                            </p>
                        )}

                        {hasLinks() && (
                            <ul className={`theme-${color}-links`}>
                                {links.slice(0, 20).map((link) => (
                                    <li key={link.id} hidden={!link.visible}>
                                        <a
                                            href={`https://${link.url}`}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {hasAddress() && (
                            <p className={`theme-${color}-location`}>
                                <i className="fa-solid fa-map-location-dot fa-xl" />
                                <a
                                    href={`https://www.google.com/maps?q=${address.latitude},${address.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {address.location}
                                </a>
                            </p>
                        )}

                        {hasAddress() && (
                            <div
                                className={`theme-${color}-maps ${mapsStyles.maps} ${mapsStyles.adsPage}`}
                            >
                                <GoogleMapReact
                                    bootstrapURLKeys={{
                                        key: process.env.GATSBY_GOOGLE_MAPS_KEY,
                                        language: "nl",
                                        region: "NL",
                                    }}
                                    defaultCenter={defaultProps.center}
                                    defaultZoom={defaultProps.zoom}
                                    center={
                                        address.latitude !== null &&
                                        address.longitude !== null
                                            ? {
                                                  lat: address.latitude,
                                                  lng: address.longitude,
                                              }
                                            : defaultProps.center
                                    }
                                >
                                    {address.latitude !== null &&
                                        address.longitude !== null && (
                                            <Marker
                                                lat={address.latitude}
                                                lng={address.longitude}
                                            />
                                        )}
                                </GoogleMapReact>
                            </div>
                        )}

                        {hasSocials() && (
                            <div className={`theme-${color}-icons`}>
                                {fbLink && fbLink.length > 1 && (
                                    <a
                                        href={`https://www.facebook.com/${fbLink}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa-brands fa-facebook-f" />
                                    </a>
                                )}

                                {twLink && twLink.length > 1 && (
                                    <a
                                        href={`https://x.com/${twLink}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa-brands fa-x-twitter" />
                                    </a>
                                )}

                                {igLink && igLink.length > 1 && (
                                    <a
                                        href={`https://www.instagram.com/${igLink}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa-brands fa-instagram" />
                                    </a>
                                )}

                                {waLink && waLink.length > 1 && (
                                    <a
                                        href={`https://wa.me/${waLink}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa-brands fa-whatsapp" />
                                    </a>
                                )}

                                {tkLink && tkLink.length > 1 && (
                                    <a
                                        href={`https://www.tiktok.com/@${tkLink}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa-brands fa-tiktok" />
                                    </a>
                                )}

                                {liLink && liLink.length > 1 && (
                                    <a
                                        href={`https://linkedin.com/${liLink}`}
                                        title={`https://linkedin.com/${liLink}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa-brands fa-linkedin" />
                                    </a>
                                )}

                                {piLink && piLink.length > 1 && (
                                    <a
                                        href={`https://pinterest.com/${piLink}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa-brands fa-pinterest" />
                                    </a>
                                )}

                                {snLink && snLink.length > 1 && (
                                    <a
                                        href={`https://www.snapchat.com/${snLink}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa-brands fa-snapchat" />
                                    </a>
                                )}

                                {ytLink && ytLink.length > 1 && (
                                    <a
                                        href={`https://www.youtube.com/${ytLink}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa-brands fa-youtube" />
                                    </a>
                                )}

                                {paLink && paLink.length > 1 && (
                                    <a
                                        href={`https://www.patreon.com/${paLink}`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <i className="fa-brands fa-patreon" />
                                    </a>
                                )}
                            </div>
                        )}

                        <Link to="/" className={`theme-footer`}>
                            <img src={afroLogo} alt="" />
                        </Link>
                    </div>
                    {isLoggedIn() && isBrowser() && (
                        <div className="ads-user">
                            {isShareSupported() ?? (
                                <button onClick={handleShare}>
                                    <i className="fa-solid fa-share-nodes fa-xl" />
                                </button>
                            )}

                            <Link
                                to={`/dashboard/`}
                                title="Ga naar jouw dashboard"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to={`/${adsUser.user.username}/`}
                                title="Ga naar jouw ADS page"
                            >
                                {adsUser.user.username}
                            </Link>
                        </div>
                    )}
                </AdsLayout>
            )}
        </>
    );
};

export default AdsTemplate;

export const Head = ({ pageContext: { profile, biography, slug, avatar } }) => {
    return (
        <Seo
            title={profile}
            description={biography}
            pathname={"/" + slug + "/"}
            image={avatar ? avatar.url : undefined}
        />
    );
};

{
    /* <Img
fluid={data.strapiInstantie.background.childImageSharp.fluid}
style={{
  width: "100vw",
  height: "100vh",
  zIndex: 1,
  position: "absolute",
  marginLeft: "auto",
  marginRight: "auto",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  textAlign: "center",
  // opacity: 0.1,
}}
/> */
}
