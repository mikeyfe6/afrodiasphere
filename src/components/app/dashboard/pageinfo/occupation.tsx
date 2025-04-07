import React, { useEffect, useState } from "react";

import axios from "axios";

import * as occupationStyles from "../../../../styles/modules/dashboard/occupation.module.scss";

const Occupation: React.FC<OccupationProps> = ({
    docId,
    apiURL,
    token,
    occupation,
    setOccupation,
}) => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const onOccupationChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setOccupation(e.target.value);

        const params = {
            occupation: e.target.value,
        };

        await axios.put(
            `${apiURL}/api/pages/${docId}`,
            { data: params },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    };

    useEffect(() => {
        const occupationCategories = {
            bedrijf: "Werkgevers en Organisaties",
            stichting: "Werkgevers en Organisaties",
            "non-profit organisatie": "Werkgevers en Organisaties",
            "zelfstandig ondernemer": "Zelfstandigen en Freelancers",
            freelancer: "Zelfstandigen en Freelancers",
            artiest: "Creatieve en Kunstzinnige Beroepen",
            musicus: "Creatieve en Kunstzinnige Beroepen",
            schrijver: "Creatieve en Kunstzinnige Beroepen",
            "beeldend kunstenaar": "Creatieve en Kunstzinnige Beroepen",
            docent: "Onderwijs en Onderzoek",
            onderzoeker: "Onderwijs en Onderzoek",
            student: "Onderwijs en Onderzoek",
            stagiair: "Onderwijs en Onderzoek",
            technicus: "Technische en Vakgerichte Beroepen",
            ingenieur: "Technische en Vakgerichte Beroepen",
            "medisch professional": "Gezondheidszorg en Welzijn",
            verzorger: "Gezondheidszorg en Welzijn",
            "administratief medewerker": "Administratie en Kantoorwerk",
            "kantoor medewerker": "Administratie en Kantoorwerk",
            hobbyist: "Overige Beroepen",
            vrijwilliger: "Overige Beroepen",
            gepensioneerde: "Overige Beroepen",
            werkzoekende: "Overige Beroepen",
            overig: "Overige Beroepen",
            geen: "Overige Beroepen",
        };

        const currentCategory =
            occupationCategories[
                occupation as keyof typeof occupationCategories
            ];
        if (currentCategory) {
            setExpandedSection(currentCategory);
        }
    }, [occupation]);

    const toggleSection = (section: string) => {
        setExpandedSection((prevSection) =>
            prevSection === section ? null : section
        );
    };

    return (
        <form className={occupationStyles.occupation}>
            <fieldset>
                <legend>Occupatie</legend>

                <div>
                    {[
                        {
                            category: "Werkgevers en Organisaties",
                            occupations: [
                                "bedrijf",
                                "stichting",
                                "non-profit organisatie",
                            ],
                        },
                        {
                            category: "Zelfstandigen en Freelancers",
                            occupations: [
                                "zelfstandig ondernemer",
                                "freelancer",
                            ],
                        },
                        {
                            category: "Creatieve en Kunstzinnige Beroepen",
                            occupations: [
                                "artiest",
                                "musicus",
                                "schrijver",
                                "beeldend kunstenaar",
                            ],
                        },
                        {
                            category: "Onderwijs en Onderzoek",
                            occupations: [
                                "docent",
                                "onderzoeker",
                                "student",
                                "stagiair",
                            ],
                        },
                        {
                            category: "Technische en Vakgerichte Beroepen",
                            occupations: ["technicus", "ingenieur"],
                        },
                        {
                            category: "Gezondheidszorg en Welzijn",
                            occupations: ["medisch professional", "verzorger"],
                        },
                        {
                            category: "Administratie en Kantoorwerk",
                            occupations: [
                                "administratief medewerker",
                                "kantoor medewerker",
                            ],
                        },
                        {
                            category: "Overige Beroepen",
                            occupations: [
                                "hobbyist",
                                "vrijwilliger",
                                "gepensioneerde",
                                "werkzoekende",
                                "overig",
                                "geen",
                            ],
                        },
                    ].map(({ category, occupations }) => (
                        <div
                            key={category}
                            className={occupationStyles.collapsible}
                        >
                            <button
                                type="button"
                                onClick={() => toggleSection(category)}
                                className={`${occupationStyles.category} ${
                                    expandedSection === category
                                        ? occupationStyles.active
                                        : ""
                                }`}
                            >
                                {category}
                            </button>
                            {expandedSection === category && (
                                <div className={occupationStyles.choice}>
                                    {occupations.map((option) => (
                                        <div key={option}>
                                            <input
                                                id={option.replace(/\s+/g, "")}
                                                type="radio"
                                                value={option}
                                                name="occupation"
                                                checked={occupation === option}
                                                onChange={onOccupationChange}
                                            />
                                            <label
                                                htmlFor={option.replace(
                                                    /\s+/g,
                                                    ""
                                                )}
                                            >
                                                {option
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    option.slice(1)}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </fieldset>
        </form>
    );
};

export default Occupation;
