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
import {getFavoritesRequest, startLoadingFavorites} from "../features/user/userSlice";
import {SearchResult} from "./SearchResult";
import {debug} from "util";


export function Favorites(props:any)
{
    const dispatch = useAppDispatch();

    const loading = useSelector((state:RootState) => state.user.loadingFavorites);
    const loaded = useSelector((state:RootState) => state.user.loadedFavorites);
    const favorites = useSelector((state:RootState) => state.user.favorites);

    let content;

    useEffect(() =>
    {
        if (!loaded && !loading)
        {
            dispatch(getFavoritesRequest());
            dispatch(startLoadingFavorites());
        }
    });

    if (loaded)
    {
        const results =
            favorites?.map((result, index) =>
                <SearchResult result={result} index={index} key={result.id}/>) || [];

        content = <div id="results_root">
            <div id="results_center_container">
                {results}
            </div>
        </div>
    }
    else
    {
        content = <LoadingCircle/>;
    }

    return (content);
}


