import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import Util from "../Util";
import {CSSProperties} from "react";


export default function RightContainer()
{
    const style:CSSProperties =
    {
        display:"flex",
        justifyContent:"center",
        alignContent:"middle",
        fontSize:"1vw",
        height:"20vw"
    };

    return (<div style={style} id="results_left_container">
            {app.model.loaded ? <PriceChartingList/> : undefined}
        </div>);
}


const PriceChartingList = (props:any) =>
{
    const containerStyle:CSSProperties =
    {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        backgroundColor:"#ffffff",
        marginTop:"1vw",
        padding:"1vw"
    };

    const imgStyle:CSSProperties =
    {
        width:"60%"
    };

    const results = app.model.priceData.map((priceData:GameData) =>
    {
        return <PriceChartingItem priceData={priceData}/>
    });

    return (<div style={containerStyle} id="price_charting_container">
        <img style={imgStyle} src="./assets/providers/pricecharting.png"/>
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
        minWidth:"20vw",
    };

    const priceStyle:CSSProperties =
    {

    };

    const MAX_LENGTH = 42;
    let name = props.priceData.name;
    if (name.length > MAX_LENGTH)
    {
        name = name.slice(0, MAX_LENGTH-3) + "...";
    }

    const price = props.priceData.price ? (props.priceData.price * app.model.usdToBgn).toFixed(2) : "N.A.";

    return (<div className="price_charting_item" style={containerStyle}>
        <a className = "price_charting_name" style={nameStyle} href={props.priceData.link} target="_blank">{name}</a>
        <div className = "price_charting_price" style={priceStyle}>{price}</div>
    </div>)
};





