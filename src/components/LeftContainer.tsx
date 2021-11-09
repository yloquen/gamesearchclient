import * as React from "react";
import {PriceData} from "../types";
import {app} from "../App";
import Util from "../Util";

export default function LeftContainer()
{
    return (<div id="results_left_container">
            <PriceChartingList/>
        </div>);
}


const PriceChartingList = (props:any) =>
{
    const results = app.model.priceData.map((priceData:PriceData) =>
    {
        return <PriceChartingItem priceData={priceData}/>
    });

    return (<div id="price_charting_container">
        {results}
    </div>)
};


const PriceChartingItem = (props:{priceData:PriceData}) =>
{
    const containerStyle =
    {
        display:"flex",
        flexDirection:"row"
    };

    const nameStyle =
    {
        backgroundColor:"#ffccff",
        minWidth:"20vw"
    };

    const priceStyle =
    {
        backgroundColor:"#ffff00"
    };

    return (<div className="price_charting_item" style={containerStyle}>
        <div className = "price_charting_name" style={nameStyle}>{props.priceData.name}</div>
        <div className = "price_charting_price" style={priceStyle}>{props.priceData.price}</div>
    </div>)
};





