import React, { useState, useEffect } from "react";

import { Link } from "gatsby";

import GoogleMapReact from "google-map-react";
import axios from "axios";

import * as mapsStyles from "../../styles/modules/ui/maps.module.scss";

import noavatar from "../../images/noavatar.png";

const defaultProps = {
    center: {
        lat: 52.30994007862562,
        lng: 4.974422834381031,
    },
    zoom: 10,
};

const Marker: React.FC<MarkerProps> = ({ lat, lng, imageUrl, onClick }) => (
    <div
        data-lat={lat}
        data-lng={lng}
        className={mapsStyles.marker}
        onClick={onClick}
    >
        <img src={!imageUrl ? noavatar : imageUrl} alt={"Marker"} />
    </div>
);

const Maps = () => {
    const [pins, setPins] = useState<PinItem[]>([]);
    const [selectedPin, setSelectedPin] = useState<PinItem | null>(null);

    const apiURL = process.env.GATSBY_BACKEND_URL;

    useEffect(() => {
        const getMapPins = async () => {
            try {
                const res = await axios.get(
                    `${apiURL}/api/pages?populate[0]=avatar&populate[1]=address`
                );

                const data = res.data.data.map((item: PinItem) => ({
                    ...item.address,
                    imageUrl: item.avatar?.url,
                    profile: item.profile,
                    slug: item.slug,
                    biography: item.biography,
                    occupation: item.occupation,
                    telephone: item.telephone,
                    email: item.email,
                }));
                setPins(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getMapPins();
    }, [apiURL]);

    const handleMarkerClick = (pin: PinItem) => {
        setSelectedPin(pin);
    };

    const closeinfo = () => {
        setSelectedPin(null);
    };

    function formatTelephone(telephone: string) {
        telephone = telephone.replace(/\s+/g, "");

        if (telephone.startsWith("06")) {
            return telephone.replace(
                /(\d{2})(\d{3})(\d{3})(\d{2})/,
                "$1 $2 $3 $4"
            );
        }

        if (
            telephone.startsWith("+31") ||
            telephone.startsWith("0031") ||
            telephone.startsWith("31")
        ) {
            return telephone.replace(
                /(\+31)(\d)(\d{3})(\d{3})(\d{2})/,
                "$1 $2 $3 $4 $5"
            );
        }

        return telephone;
    }

    return (
        <div className={mapsStyles.mapsContainer}>
            <div className={`${mapsStyles.maps} ${mapsStyles.adsHome}`}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.GATSBY_GOOGLE_MAPS_KEY || "",
                        language: "nl",
                        region: "NL",
                    }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    center={defaultProps.center}
                >
                    {pins.map((pin, index) => (
                        <Marker
                            key={index}
                            lat={pin.latitude}
                            lng={pin.longitude}
                            imageUrl={pin.imageUrl}
                            onClick={() => handleMarkerClick(pin)}
                        />
                    ))}
                </GoogleMapReact>
            </div>

            {selectedPin && (
                <div className={mapsStyles.mapsInfo}>
                    <div className={mapsStyles.mapsInfoWrapper}>
                        <div>
                            {selectedPin.profile && (
                                <h3>
                                    {selectedPin.profile}{" "}
                                    {selectedPin.occupation && (
                                        <span>{selectedPin.occupation}</span>
                                    )}
                                </h3>
                            )}

                            {selectedPin.location && (
                                <span>
                                    <i className="fa-solid fa-map-location-dot fa-lg" />
                                    <a
                                        href={`https://www.google.com/maps?q=${selectedPin.latitude},${selectedPin.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {selectedPin.location}
                                    </a>
                                </span>
                            )}

                            {selectedPin.biography && (
                                <p>{selectedPin.biography}</p>
                            )}

                            {(selectedPin.telephone || selectedPin.email) && (
                                <div className={mapsStyles.infoContact}>
                                    {selectedPin.email && (
                                        <div>
                                            <i className="fa-solid fa-envelope fa-lg" />
                                            <a
                                                href={`mailto:${selectedPin.email}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {selectedPin.email}
                                            </a>
                                        </div>
                                    )}
                                    {selectedPin.telephone && (
                                        <div>
                                            <i className="fa-solid fa-phone fa-lg" />
                                            <a
                                                href={`tel:${selectedPin.telephone}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {formatTelephone(
                                                    selectedPin.telephone
                                                )}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className={mapsStyles.infoButtons}>
                                <button onClick={() => closeinfo()}>
                                    Sluit Info
                                </button>

                                {selectedPin.slug && (
                                    <Link to={"/" + selectedPin.slug + "/"}>
                                        Naar ADS-pagina
                                    </Link>
                                )}
                            </div>
                        </div>

                        {(selectedPin.email ||
                            selectedPin.telephone ||
                            selectedPin.imageUrl) && (
                            <div>
                                {selectedPin.imageUrl && (
                                    <img
                                        src={selectedPin.imageUrl}
                                        alt={selectedPin.profile}
                                    />
                                )}

                                {(selectedPin.email ||
                                    selectedPin.telephone) && (
                                    <div
                                        className={mapsStyles.infoContactMobile}
                                    >
                                        {selectedPin.email && (
                                            <div>
                                                <i className="fa-solid fa-envelope fa-lg" />
                                                <a
                                                    href={`mailto:${selectedPin.email}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {selectedPin.email}
                                                </a>
                                            </div>
                                        )}
                                        {selectedPin.telephone && (
                                            <div>
                                                <i className="fa-solid fa-phone fa-lg" />
                                                <a
                                                    href={`tel:${selectedPin.telephone}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {formatTelephone(
                                                        selectedPin.telephone
                                                    )}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Maps;
