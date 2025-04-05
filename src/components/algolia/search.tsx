import React, { useEffect, useRef } from "react";

import { liteClient as algoliasearch } from "algoliasearch/lite";

import {
    InstantSearch,
    SearchBox,
    Hits,
    useInstantSearch,
} from "react-instantsearch";

import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, ALGOLIA_INDEX_NAME } from "./keys";

import Hit from "./hit";

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

const useClickOutside = (
    ref,
    onClickOutside,
    ignoreRef = { current: null }
) => {
    const events = ["mousedown", "touchstart"];

    useEffect(() => {
        const isOutside = (element) =>
            (!ref.current || !ref.current.contains(element)) &&
            (!ignoreRef.current || !ignoreRef.current.contains(element));

        const onClick = (event) => {
            if (isOutside(event.target)) {
                onClickOutside();
            }
        };

        for (const event of events) {
            document.addEventListener(event, onClick);
        }

        return () => {
            for (const event of events) {
                document.removeEventListener(event, onClick);
            }
        };
    }, [ref, onClickOutside, ignoreRef]);
};

const Search = ({
    style = {},
    hasFocus = false,
    setFocus = () => {},
    setSearchVisible = () => {},
    ignoreRef,
}) => {
    const rootRef = useRef();

    useClickOutside(
        rootRef,
        () => {
            setFocus(false);
            setSearchVisible(false);
        },
        ignoreRef
    );

    useEffect(() => {
        const overlay = document.querySelector(".algolia-overlay");
        if (overlay) {
            overlay.style.display = hasFocus ? "block" : "none";
        }
    }, [hasFocus]);

    return (
        <div
            ref={rootRef}
            onClick={() => setFocus(true)}
            role="search"
            style={style}
            className="algolia"
        >
            <InstantSearch
                searchClient={searchClient}
                indexName={ALGOLIA_INDEX_NAME}
                stalledSearchDelay={500}
                insights={true}
                future={{
                    preserveSharedStateOnUnmount: true,
                }}
            >
                <SearchBox placeholder="Zoek een ADS-profiel..." />
                {hasFocus && (
                    <EmptyQueryBoundary fallback={null}>
                        <NoResultsBoundary fallback={<NoResults />}>
                            <Hits hitComponent={Hit} />
                        </NoResultsBoundary>
                    </EmptyQueryBoundary>
                )}
            </InstantSearch>
        </div>
    );
};

const EmptyQueryBoundary = ({ children, fallback }) => {
    const { indexUiState } = useInstantSearch();

    if (!indexUiState.query) {
        return (
            <>
                {fallback}
                <div hidden>{children}</div>
            </>
        );
    }

    return children;
};

const NoResultsBoundary = ({ children, fallback }) => {
    const { results } = useInstantSearch();

    if (!results.__isArtificial && results.nbHits === 0) {
        return (
            <>
                {fallback}
                <div hidden>{children}</div>
            </>
        );
    }

    return children;
};

const NoResults = () => {
    const { indexUiState } = useInstantSearch();

    return (
        <div className="no-results">
            <p>
                Geen zoekresultaten voor <q>{indexUiState.query}</q>.
            </p>
        </div>
    );
};

export default Search;
