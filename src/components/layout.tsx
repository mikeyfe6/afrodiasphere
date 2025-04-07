import React, { useState, useEffect, ReactNode } from "react";

import Header from "./layout/header";
import Footer from "./layout/footer";
import MobileMenu from "./layout/mobileMenu";

import Algolia from "./algolia/init";

import ResponsiveTag from "./helpers/respoTag";

import "../styles/layout.scss";

const Layout = ({ children }: { children: ReactNode }) => {
 

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
            {!isMobile && <Header />}
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

export default Layout;
