import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import Util from "../Util";
import {CSSProperties} from "react";
import ReactHtmlParser from 'react-html-parser';


export default function ResultsRight()
{
    return (<div id="results_right_container" className="side_panel">
            {app.model.loaded ? <WikipediaData/> : undefined}
        </div>);
}


const WikipediaData = (props:any) =>
{
/*    const containerStyle:CSSProperties =
        {
            marginTop:"1vw",
            padding:"1vw",
            width:"26vw"
        };*/

    const imgStyle:CSSProperties =
    {
        width:"60%"
    };

    const infoBoxStyle =
    {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        backgroundColor:"#ffffff",
        marginTop:"1vw",
        padding:"1vw",
        width:"26vw"
    };

    return (<div id="results_side_container">
        <img style={imgStyle} src="./assets/providers/wikipedia.png"/>
        <div style={infoBoxStyle}>{ ReactHtmlParser(app.model.wikiData) }</div>
        <div style={infoBoxStyle}>{ ReactHtmlParser(app.model.wikiReviews) }</div>
    </div>)
};






