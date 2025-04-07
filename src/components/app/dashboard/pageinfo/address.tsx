import React, { useState, useEffect } from "react";

import axios from "axios";

import GoogleMapReact from "google-map-react";

import * as profileInfoStyles from "../../../../styles/modules/dashboard/profileInfo.module.scss";

import * as addressStyles from "../../../../styles/modules/dashboard/address.module.scss";

import * as mapsStyles from "../../../../styles/modules/ui/maps.module.scss";

const defaultProps = {
    center: {
        lat: 52.30994007862562,
        lng: 4.974422834381031,
    },
    zoom: 15,
};

const Address: React.FC<AddressProps> = ({
    docId,
    apiURL,
    token,
    preview,
    address,
    setAddress,
    setContactSuccess,
    setValidationMessage,
    loadingData,
}) => {
    const [pin, setPin] = useState<LocationPin | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLocationSearched, setIsLocationSearched] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [deleteLocation, setDeleteLocation] = useState(false);

    const apiKey = process.env.GATSBY_GOOGLE_GEO_KEY;

    const Marker: React.FC<CoordinationProps> = ({ lat, lng }) => (
        <div data-lat={lat} data-lng={lng} className={mapsStyles.marker}>
            <img src={preview} alt={"title"} />
        </div>
    );

    useEffect(() => {
        setPin(address);
    }, [address]);

    const fetchGeocode = async () => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    inputValue
                )}&key=${apiKey}&language=nl`
            );

            if (response.data.status === "OK") {
                const { formatted_address, geometry } =
                    response.data.results[0];
                const newLocation = {
                    location: formatted_address,
                    latitude: geometry.location.lat,
                    longitude: geometry.location.lng,
                };

                setPin(newLocation);
                setAddress(newLocation);
                setIsLocationSearched(true);
                setValidationMessage(null);
            } else {
                setValidationMessage(
                    `Geen locatie gevonden: ${response.data.status}`
                );
                setPin(null);
                setIsLocationSearched(false);
            }
        } catch (error) {
            setValidationMessage(
                `Er is een fout opgetreden bij het ophalen van de locatie: ${
                    error instanceof Error ? error.message : "Onbekende fout"
                }`
            );
            setPin(null);
            setIsLocationSearched(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsLocationSearched(false);
    };

    const handleSearch = () => {
        if (!validateInput(inputValue)) {
            return;
        }

        fetchGeocode();
    };

    const validateInput = (value: string) => {
        if (value.length < 2 || value.length > 100) {
            const errorMessage = "Invoer moet tussen de 2 en 100 tekens zijn";
            setValidationError(errorMessage);
            setValidationMessage(errorMessage);
            return false;
        }

        setValidationError(null);
        setValidationMessage(null);
        return true;
    };

    const submitAddress = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const params = {
            address: {
                location: address.location,
                latitude: address.latitude,
                longitude: address.longitude,
            },
        };

        try {
            await axios.put(
                `${apiURL}/api/pages/${docId}`,
                { data: params },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setContactSuccess("Adres succesvol geüpdatet");
            setTimeout(() => setContactSuccess(null), 5000);
            setInputValue("");
            setIsLocationSearched(false);
            setDeleteLocation(false);
        } catch (error) {
            console.error("Error updating address:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteAddress = () => {
        setAddress({ location: "", latitude: null, longitude: null });
        setInputValue("");
        setDeleteLocation(true);
    };

    return (
        <>
            <form
                onSubmit={submitAddress}
                className={`${profileInfoStyles.profileField} ${profileInfoStyles.address}`}
            >
                <div>
                    <label htmlFor="address">Adres</label>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        placeholder="bijv. Kelbergen 300, 1104LJ"
                        id="address"
                        name="address"
                        value={inputValue}
                        disabled={loadingData || isSubmitting}
                        style={{
                            color: validationError ? "#c60319" : "inherit",
                        }}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        disabled={!inputValue}
                        title="Zoek adres"
                        onClick={handleSearch}
                    >
                        <i className="fa-solid fa-location-crosshairs fa-lg" />
                    </button>
                    <button
                        type="submit"
                        title="Sla locatie op"
                        disabled={!(isLocationSearched || deleteLocation)}
                    >
                        <i className="fa-solid fa-floppy-disk fa-lg" />
                    </button>
                    <button
                        type="reset"
                        onClick={() => deleteAddress()}
                        title="Wis locatie"
                        disabled={
                            (!inputValue && isLocationSearched) ||
                            address.location === ""
                        }
                    >
                        <i className="fa-solid fa-arrows-rotate fa-lg"></i>
                    </button>
                </div>
            </form>

            <div className={addressStyles.address}>
                <input
                    value={
                        pin && pin.location
                            ? pin.location
                            : address
                            ? address.location
                            : ""
                    }
                    placeholder="Geen adres gevonden"
                    readOnly
                />
            </div>

            <div className={`${mapsStyles.maps} ${mapsStyles.adsDashboard}`}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: process.env.GATSBY_GOOGLE_MAPS_KEY,
                        language: "nl",
                        region: "NL",
                    }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    center={
                        pin && pin.latitude && pin.longitude
                            ? { lat: pin.latitude, lng: pin.longitude }
                            : defaultProps.center
                    }
                >
                    {pin && pin.latitude && pin.longitude && (
                        <Marker lat={pin.latitude} lng={pin.longitude} />
                    )}
                </GoogleMapReact>
            </div>
        </>
    );
};

export default Address;
