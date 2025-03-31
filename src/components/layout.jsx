import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";

import PropTypes from "prop-types";

import Header from "./layout/header";
import Footer from "./layout/footer";
import MobileMenu from "./layout/mobileMenu";

import Algolia from "./algolia/init";

import ResponsiveTag from "./helpers/respoTag";

import "../styles/layout.scss";

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 882);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {!isMobile && (
                <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
            )}
            {isMobile && (
                <MobileMenu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
            )}

            <div style={{ paddingTop: isMobile ? "75px" : "0" }}>
                <main>{children}</main>
                <Footer />
            </div>

            <Algolia />

            <div className="algolia-overlay" />

            {process.env.NODE_ENV === "development" && <ResponsiveTag />}
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
