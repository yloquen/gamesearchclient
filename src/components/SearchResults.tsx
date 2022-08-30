import {GameData, UseSearchParamsType} from "../types";
import Util from "../Util";
import ResultsLeft from "./ResultsLeft";
import ResultsRight from "./ResultsRight";
import * as React from "react";
import {LegacyRef} from "react";
import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import LoadingCircle from "./LoadingCircle";
import {fetchSearchResults} from "../features/search/searchSlice";


export function SearchResult(props:{result:GameData, index:number})
{
    const ref = Util.createTweens([], [{ duration:.5, alpha:0, delay:props.index * .1 }]);

    const result:GameData = props.result;

    return (
        <div ref={ref} className="result_container bordered_field">

            <img className="result_image" src={"http://localhost/" + result.img}/>
            <div className="result_name">
                <a href={result.link} target="_blank">{result.name}</a>
            </div>
            <div className="result_price">
                {result.price?.toFixed(2)}
                <div style={{height:"0.25vw"}}/>
                <img className="result_provider" src={"./assets/providers/" + result.provider.toLocaleLowerCase() + ".png"} />
            </div>
        </div>);
}


export function SearchResults(props:any)
{
    const dispatch = useDispatch();
    const [searchParams]:UseSearchParamsType = useSearchParams();

    const loading = useSelector((state:RootState) => state.search.loading);
    const loaded = useSelector((state:RootState) => state.search.loaded);
    const searchResults = useSelector((state:RootState) => state.search.searchResults?.gameData);

    let content;

    if (!loaded)
    {
        if (!loading)
        {
            dispatch(fetchSearchResults(searchParams.get("q")));
        }
        content = <LoadingCircle/>
    }
    else
    {
        const results = searchResults.map((result, index) =>
        {
            return <SearchResult result={result} index={index} key={result.name}/>;
        });

        content = <div id="results_root">
            <ResultsLeft/>
            <div id="results_center_container">
                {results}
            </div>
            <ResultsRight/>
        </div>
    }

    return (content);
}