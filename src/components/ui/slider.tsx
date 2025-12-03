import React, { useState, useEffect } from "react";

import { useLocation } from "@reach/router";
import { Link } from "gatsby";

import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

import Spinner from "./spinner";

import noavatar from "../../images/noavatar.png";

import * as styles from "../../styles/modules/ui/slider.module.scss";

const Slider = () => {
    const [carousel, setCarousel] = useState<CarouselItem[]>([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    const apiURL = process.env.GATSBY_BACKEND_URL;
    const baseURL = location.origin;

    useEffect(() => {
        const getCarousel = async () => {
            try {
                const res = await axios.get(
                    `${apiURL}/api/pages?populate[0]=avatar&populate[1]=user&filters[user][confirmed][$eq]=true`
                );

                setCarousel(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching carousel data:", error);
            }
        };
        getCarousel();
    }, []);

    return (
        <section className={styles.carousel} id="slider">
            {loading ? (
                <Spinner type="slide" />
            ) : (
                <Swiper
                    modules={[A11y, Autoplay]}
                    className={styles.carouselContainer}
                    loop
                    spaceBetween={15}
                    autoplay={{ delay: 5000 }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        360: { slidesPerView: 2 },
                        576: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        992: { slidesPerView: 5 },
                    }}
                >
                    {carousel?.map((ads) => {
                        const isNew =
                            new Date().getTime() -
                                new Date(ads.createdAt).getTime() <=
                            7 * 24 * 60 * 60 * 1000;

                        return (
                            <SwiperSlide
                                key={ads.id}
                                className={styles.carouselSlide}
                            >
                                <div>
                                    <img
                                        src={
                                            !ads.avatar?.url
                                                ? noavatar
                                                : ads.avatar?.url
                                        }
                                        className={styles.avatar}
                                        alt={ads.profile}
                                    />
                                    <div className={styles.profile}>
                                        {ads.profile}
                                    </div>

                                    <div
                                        className={styles.occupate}
                                        style={{
                                            visibility:
                                                !ads.occupation ||
                                                ads.occupation === "geen"
                                                    ? "hidden"
                                                    : "visible",
                                        }}
                                    >
                                        {ads.occupation}
                                    </div>

                                    <div className={styles.biography}>
                                        <p>{ads.biography}</p>
                                    </div>
                                    <div className={styles.url}>
                                        <Link
                                            to={`/${ads.slug}/`}
                                            title={`${baseURL}/${ads.slug}/`}
                                        >
                                            <span>・</span>
                                            <span>/</span>
                                            <span>{`${ads.slug ?? ".."}`}</span>
                                        </Link>
                                    </div>
                                </div>
                                {isNew && <span>NIEUW</span>}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </section>
    );
};

export default Slider;
