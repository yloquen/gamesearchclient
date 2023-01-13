import {GameData, UseSearchParamsType} from "../types";
import Util from "../Util";
import ResultsLeft from "./ResultsLeft";
import ResultsRight from "./ResultsRight";
import * as React from "react";
import {CSSProperties, LegacyRef, useEffect} from "react";
import {URLSearchParamsInit, useLocation, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../store/store";
import LoadingCircle from "./LoadingCircle";
import {fetchSearchResults, startSearch} from "../features/search/searchSlice";
import {SearchResult} from "./SearchResult";
import {debug} from "util";


export function SearchResults(props:any)
{
    const dispatch = useAppDispatch();

    const { search } = useLocation();
    const searchQuery = React.useMemo(() => new URLSearchParams(search), [search]).get("q");

    const loading = useSelector((state:RootState) => state.search.loading);
    const loaded = useSelector((state:RootState) => state.search.loaded);
    const searchResults = useSelector((state:RootState) => state.search.searchResults?.gameData);

    let content;

    useEffect(() =>
    {
        if (!loaded && !loading)
        {
            dispatch(fetchSearchResults(searchQuery));
            dispatch(startSearch());
        }
    });

    if (loaded)
    {
        const results =
            searchResults?.map((result, index) =>
                <SearchResult result={result} index={index} key={result.id}/>) || [];

        content = <div id="results_root">
            <ResultsLeft/>
            <div id="results_center_container">
                {results}
            </div>
            <ResultsRight/>
        </div>
    }
    else
    {
        content = <LoadingCircle/>;
    }

    return (content);
}


