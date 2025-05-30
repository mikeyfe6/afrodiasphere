import { useEffect } from "react";

import { algoliasearch } from "algoliasearch";
import axios from "axios";

import { ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } from "./keys";

const apiURL = process.env.GATSBY_BACKEND_URL;

const Algolia = () => {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") return;

        const indexData = async () => {
            if (!ALGOLIA_APP_ID || !ALGOLIA_API_KEY) {
                throw new Error("Algolia credentials are not defined.");
            }
            const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

            try {
                const response = await axios.get(
                    `${apiURL}/api/pages?populate[0]=avatar`
                );
                const records = response.data.data;

                const objectsWithID = records.map(
                    (record: { documentId: any }) => ({
                        objectID: record.documentId,
                        ...record,
                    })
                );

                await client.saveObjects({
                    indexName:
                        ALGOLIA_INDEX_NAME ||
                        (() => {
                            throw new Error(
                                "ALGOLIA_INDEX_NAME is not defined."
                            );
                        })(),
                    objects: objectsWithID,
                });
            } catch (error) {
                console.error("Error during indexing:", error);
            }
        };

        indexData();
    }, []);

    return null;
};

export default Algolia;
