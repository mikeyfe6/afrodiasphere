import * as React from "react";

import { useStaticQuery, graphql } from "gatsby";

function Seo({
    description,
    title,
    children,
    pathname,
    image,
    noindex,
}: SeoProps) {
    const { site } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    author
                    image
                    siteUrl
                }
            }
        }
    `);

    const metaDescription = description || site.siteMetadata.description;
    const defaultTitle = site.siteMetadata?.title;
    const metaImage =
        image || site.siteMetadata.siteUrl + site.siteMetadata?.image;
    const siteTitle = defaultTitle ? `${title} · ${defaultTitle}` : title;
    const siteUrl = site.siteMetadata.siteUrl + (pathname || "");

    return (
        <>
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="image" content={metaImage} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={metaImage} />
            <meta property="og:site_name" content={site.siteMetadata.title} />
            <meta property="og:url" content={siteUrl} />
            <meta name="twitter:card" content="summary" />
            <meta
                name="twitter:creator"
                content={site.siteMetadata?.author || ``}
            />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
            <meta name="twitter:url" content={siteUrl} />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
                integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
            {noindex && <meta name="robots" content="noindex" />}
            // TODO: FONTAWESOME uit react !!
            {children}
        </>
    );
}

export default Seo;
