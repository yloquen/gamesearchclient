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
    };

    return (
        <iframe style={style}
            src="https://www.youtube.com/embed/tgbNymZ7vqY">
        </iframe>);
};


const PriceChartingList = (props:any) =>
{
    const containerStyle:CSSProperties =
    {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        backgroundColor:"#ffffff",
        marginTop:"1vw",
        padding:"1vw",
        width:"26vw"
    };

    const imgStyle:CSSProperties =
    {
        width:"50%",
        paddingBottom:"1vw"
    };

    const results = app.model.priceData.map((priceData:GameData) =>
    {
        return <PriceChartingItem priceData={priceData}/>
    });

    return (<div style={containerStyle} id="price_charting_container">
        <img width="50%" style={imgStyle} src="./assets/providers/pricecharting.png"/>
        {results}
    </div>)
};


const PriceChartingItem = (props:{priceData:GameData}) =>
{
    const containerStyle:CSSProperties =
    {
        display:"flex",
        flexDirection:"row",
        padding:"0.075vw",
        paddingLeft:"0.2vw",
        paddingRight:"0.2vw"
    };

    const nameStyle:CSSProperties =
    {
        width:"22vw"
    };

    const priceStyle:CSSProperties =
    {
        width:"6vw",
        textAlign:"right"
    };

    const MAX_LENGTH = 38;
    let name = props.priceData.name;
    if (name.length > MAX_LENGTH)
    {
        name = name.slice(0, MAX_LENGTH-3) + "...";
    }

    const price = props.priceData.price ? (props.priceData.price * app.model.usdToBgn).toFixed(2) + " лв." : "N.A.";


    return (<div className="price_charting_item" style={containerStyle}>
        <a className = "price_charting_name" style={nameStyle} href={props.priceData.link} target="_blank">{name}</a>
        <div className = "price_charting_price" style={priceStyle}>{price}</div>
    </div>)
};





