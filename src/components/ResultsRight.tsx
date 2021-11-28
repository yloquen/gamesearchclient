import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import Util from "../Util";
import {CSSProperties} from "react";
import ReactHtmlParser from 'react-html-parser';


export default function ResultsRight()
{
    return (<div id="results_right_container" className="side_panel">
            {app.model.loaded ? <PriceChartingList/> : undefined}
        </div>);
}


const PriceChartingList = (props:any) =>
{
    const containerStyle:CSSProperties =
    {
        display:"flex",
        flexDirection:"column",
        backgroundColor:"#ffffff"
    };

    const imgStyle:CSSProperties =
    {
        width:"60%"
    };

    const infoBoxStyle =
    {

    };


    return (<div style={containerStyle} id="price_charting_container">
        <img style={imgStyle} src="./assets/providers/wikipedia.png"/>
        <div style={infoBoxStyle}>{ ReactHtmlParser(app.model.wikiData) }</div>
        <div style={infoBoxStyle}>{ ReactHtmlParser(app.model.wikiReviews) }</div>
    </div>)
};






