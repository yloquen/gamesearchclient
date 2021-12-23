import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import {CSSProperties} from "react";


export default function ResultsLeft()
{
    return (<div id="results_left_container" className="side_panel">
            {app.model.loaded ? <PriceChartingList/> : undefined}
            {app.model.loaded ? <GameVideo/> : undefined}
        </div>);
}


const GameVideo = (props:any) =>
{
    const style =
    {
        marginTop:"1.5vw",
        width:"27vw",
        height:"15.1875vw"
    };

    return (
        <iframe style={style}
            src="https://www.youtube.com/embed/tgbNymZ7vqY">
        </iframe>);
};


const PriceChartingList = (props:any) =>
{
    const imgStyle:CSSProperties =
    {
        width:"50%",
        paddingBottom:"1vw"
    };

    const results = app.model.priceData.map((priceData:GameData) =>
    {
        return <PriceChartingItem priceData={priceData}/>
    });

    return (<div id="results_side_container">
        <img width="50%" style={imgStyle} src="./assets/providers/pricecharting.png"/>
        {results}
    </div>)
};


const PriceChartingItem = (props:{priceData:GameData}) =>
{
    const nameStyle:CSSProperties =
    {
        width:"22vw"
    };

    const priceStyle:CSSProperties =
    {
        width:"8vw",
        textAlign:"right",
    };

    const MAX_LENGTH = 60;
    let name = props.priceData.name;
    if (name.length > MAX_LENGTH)
    {
        name = name.slice(0, MAX_LENGTH-3) + "...";
    }

    const price = props.priceData.price ? (props.priceData.price * app.model.usdToBgn).toFixed(2) + "\u00A0лв." : "N.A.";


    return (<div className="price_charting_item">
        <a className = "price_charting_name" style={nameStyle} href={props.priceData.link} target="_blank">{name}</a>
        <div className = "price_charting_price" style={priceStyle}>{price}</div>
    </div>)
};





