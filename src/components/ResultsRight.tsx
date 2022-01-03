import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import {CSSProperties} from "react";


export default function ResultsRight()
{
    return (<div id="results_right_container" className="side_panel">
            {app.model.loaded ? <WikiData wikiData={app.model.wikiData}/> : undefined}
        </div>);
}


const WikiText = (props) =>
{
    const containerStyle =
    {
        display:"flex",
        flexDirection:"row",
        paddingTop:"0.3vw",
        fontSize:"0.8rem"
    };

    const nameStyle =
    {
        width:"9vw",
        backgroundColor:"#f5f8ff"
    };

    const valueStyle =
    {
        width:"15vw",
        backgroundColor:"#f5f8ff"
    };

    return <div style={containerStyle}>
        <div style={nameStyle}>{props.info.name}</div>
        <div style={valueStyle}>{props.info.value}</div>
    </div>;
};


const WikiData = (props:any) =>
{
    const wikiLogoStyle:CSSProperties =
    {
        width:"60%"
    };

    const infoBoxStyle =
    {
        display:"flex",
        flexDirection:"column",
        justifyContent:"right",
        backgroundColor:"#ffffff",
        alignItems:"center"
    };

    const wikiImgStyle =
    {
        padding:"1vw",
        width:"20vw"
    };

    const textResults = props.wikiData?.textInfo?.map(info =>
    {
        return <WikiText info={info}/>;
    });

    return (<div id="results_side_container" className="results_side_container bordered_field">
        <a href={app.model.wikiData.link} target="_blank">
            <img style={wikiLogoStyle} src="./assets/providers/wikipedia.png"/>
        </a>
        <div style={infoBoxStyle}>
            <img style={wikiImgStyle} src={props.wikiData.imgURL}/>
            {textResults}
        </div>
    </div>)
};






