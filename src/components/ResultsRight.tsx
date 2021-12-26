import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import Util from "../Util";
import {CSSProperties} from "react";
import ReactHtmlParser from 'react-html-parser';


export default function ResultsRight()
{
    return (<div id="results_right_container" className="side_panel">
            {app.model.loaded ? <WikiData wikiData={app.model.wikiData}/> : undefined}
        </div>);
}


const WikiText = (props) =>
{
    debugger;
    return <div>{props.info.name + " " + props.info.value}</div>;
};


const WikiData = (props:any) =>
{
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

    const textResults = props.wikiData.textInfo.map(info =>
    {
        return <WikiText info={info}/>;
    });

    return (<div id="results_side_container">
        <img style={imgStyle} src="./assets/providers/wikipedia.png"/>
        <div style={infoBoxStyle}>
            <img className="wiki_img" src={props.wikiData.imgURL}/>
            {textResults}
        </div>
    </div>)
};






