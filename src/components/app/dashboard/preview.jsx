import * as React from "react";

import * as styles from "../../../styles/modules/dashboard/themes.module.scss";

const Preview = ({
    preview,
    profile,
    occupation,
    biography,
    telephone,
    mail,
    links,
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
    color,
}) => {
    const getThemeClassName = (element) => {
        switch (color) {
            case "geel":
                return styles[`yellowStyle${element}`];
            case "grijs":
                return styles[`grayStyle${element}`];
            case "roze":
                return styles[`pinkStyle${element}`];
            case "zwart":
                return styles[`blackStyle${element}`];
            case "bruin":
                return styles[`brownStyle${element}`];
            case "groen":
                return styles[`greenStyle${element}`];
            case "afrotheme":
                return styles[`afroStyle${element}`];
            default:
                return styles[`blackStyle${element}`];
        }
    };

    const hasLinks = links.some((link) => link.visible);

    const hasSocials =
        (fbLink && fbLink.length > 1) ||
        (twLink && twLink.length > 1) ||
        (igLink && igLink.length > 1) ||
        (waLink && waLink.length > 1) ||
        (tkLink && tkLink.length > 1) ||
        (liLink && liLink.length > 1) ||
        (piLink && piLink.length > 1) ||
        (snLink && snLink.length > 1) ||
        (ytLink && ytLink.length > 1) ||
        (paLink && paLink.length > 1);

    return (
        <div id="iphone-frame">
            {mail && mail.length > 1 && (
                <a
                    href={`mailto:${mail}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    id="iphone-mail"
                >
                    <i className="fa-solid fa-envelope fa-lg" />
                </a>
            )}

            <img src={preview} alt="" id="iphone-avatar" />

            {telephone && telephone.length > 1 && (
                <a
                    href={`tel:${telephone}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    id="iphone-telephone"
                >
                    <i className="fa-solid fa-phone fa-lg" />
                </a>
            )}

            {profile && profile.length > 1 && (
                <p
                    id="iphone-username"
                    className={getThemeClassName("Username")}
                >
                    {profile}
                </p>
            )}

            {occupation && occupation !== "geen" && (
                <p
                    id="iphone-occupate"
                    className={getThemeClassName("Occupate")}
                >
                    {occupation}
                </p>
            )}

            {biography && biography.length > 1 && (
                <p
                    id="iphone-biography"
                    className={getThemeClassName("Biography")}
                >
                    {biography}
                </p>
            )}

            {hasLinks && (
                <ul id="iphone-links" className={getThemeClassName("Links")}>
                    {links
                        .filter((link) => link.visible)
                        .slice(0, 5)
                        .map((link, index) => (
                            <li
                                key={index}
                                id={`link${link.id}`}
                                hidden={!link.visible}
                            >
                                <a
                                    href={`https://${link.url}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    title={`https://${link.url}`}
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                </ul>
            )}

            {hasSocials && (
                <div id="iphone-icons" className={getThemeClassName("Icons")}>
                    {fbLink && fbLink.length > 1 && (
                        <a
                            href={`https://www.facebook.com/${fbLink}`}
                            title={`https://www.facebook.com/${fbLink}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <i className="fa-brands fa-facebook-f" />
                        </a>
                    )}

                    {twLink && twLink.length > 1 && (
                        <a
                            href={`https://x.com/${twLink}`}
                            title={`https://x.com/${twLink}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <i className="fa-brands fa-x-twitter" />
                        </a>
                    )}

                    {igLink && igLink.length > 1 && (
                        <a
                            href={`https://www.instagram.com/${igLink}`}
                            title={`https://www.instagram.com/${igLink}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <i className="fa-brands fa-instagram" />
                        </a>
                    )}

                    {waLink && waLink.length > 1 && (
                        <a
                            href={`https://wa.me/${waLink}`}
                            title={`https://wa.me/${waLink}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <i className="fa-brands fa-whatsapp" />
                        </a>
                    )}

                    {tkLink && tkLink.length > 1 && (
                        <a
                            href={`https://www.tiktok.com/@${tkLink}`}
                            title={`https://www.tiktok.com/@${tkLink}`}
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
                            title={`https://pinterest.com/${piLink}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <i className="fa-brands fa-pinterest" />
                        </a>
                    )}

                    {snLink && snLink.length > 1 && (
                        <a
                            href={`https://www.snapchat.com/${snLink}`}
                            title={`https://www.snapchat.com/${snLink}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <i className="fa-brands fa-snapchat" />
                        </a>
                    )}

                    {ytLink && ytLink.length > 1 && (
                        <a
                            href={`https://www.youtube.com/${ytLink}`}
                            title={`https://www.youtube.com/${ytLink}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <i className="fa-brands fa-youtube" />
                        </a>
                    )}

                    {paLink && paLink.length > 1 && (
                        <a
                            href={`https://www.patreon.com/${paLink}`}
                            title={`https://www.patreon.com/${paLink}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <i className="fa-brands fa-patreon" />
                        </a>
                    )}
                </div>
            )}

            <div id="iphone-bg" className={getThemeClassName("")} />
            {/* <img
            src={gatsbyUser.user.gebruiker.background.url}
            alt=""
            className={accountStyles.iphoneBg}
          />{" "} */}
        </div>
    );
};

export default Preview;
