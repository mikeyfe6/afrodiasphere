import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
    // path: `.env.${process.env.NODE_ENV}`,
    path: ".env",
});

const siteMetadata = {
    siteUrl: `https://afrodiasphere.com`,
    title: `Afrodiasphere`,
    author: "Michael Fransman",
    description: `Een efficiente oplossing voor het delen van contactinformatie`,
    image: "/ads-logo.png",
    bgColor: "#a9a9a9",
    themeColor: "#cc9932",
};

const config: GatsbyConfig = {
    graphqlTypegen: true,
    siteMetadata,
    plugins: [
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: "GTM-PRN53H8",
                includeInDevelopment: false,
                defaultDataLayer: { platform: "gatsby" },

                // Specify optional GTM environment details.
                // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
                // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: "gatsby-plugin-nprogress",
            options: {
                color: `white`,
                showSpinner: true,
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-robots-txt`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-catch-links`,
        {
            resolve: "gatsby-plugin-canonical-urls",
            options: {
                siteUrl: siteMetadata.siteUrl,
            },
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                implementation: require("sass"),
                sassOptions: {
                    silenceDeprecations: ["legacy-js-api"],
                },
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: siteMetadata.title,
                short_name: siteMetadata.title,
                description: `Een veilige en duurzame oplossing voor het delen van contactinformatie`,
                start_url: `/`,
                background_color: siteMetadata.bgColor,
                lang: `nl`,
                theme_color: siteMetadata.themeColor,
                display: `standalone`,
                icon: "src/images/logo/ads-icon-inverted.png",
                icon_options: {
                    purpose: `any maskable`,
                },
                crossOrigin: `use-credentials`,
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        `gatsby-plugin-offline`,
    ],
};

export default config;
