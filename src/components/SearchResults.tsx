import {GameData} from "../types";
import Util from "../Util";
import ResultsLeft from "./ResultsLeft";
import ResultsRight from "./ResultsRight";
import * as React from "react";
import {LegacyRef} from "react";

export function SearchResult(props:{result:GameData, index:number})
{
    const ref = Util.createTweens([], [{ duration:.5, alpha:0, delay:props.index * .1 }]);

    const result:GameData = props.result;

    return (
        <div ref={ref} className="result_container">
            <img className="result_image" src={result.img}/>
            <div className="result_name">
                <a href={result.link} target="_blank">{result.name}</a>
            </div>
            <div className="result_price">
                {result.price.toFixed(2)}
                <div style={{height:"0.25vw"}}/>
                <img className="result_provider" src={"./assets/providers/" + result.provider.toLocaleLowerCase() + ".png"} />
            </div>
        </div>);
}


export function SearchResults(props:any)
{
    const results = props.results.map((result, index) =>
    {
        return <SearchResult result={result} index={index} key={result.name}/>;
    });

    return (
        <div id="results_root">
            <ResultsLeft/>
            <div id="results_center_container">
                {results}
            </div>
            <ResultsRight/>
        </div>

    );
}