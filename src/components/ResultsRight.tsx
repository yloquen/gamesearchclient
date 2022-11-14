import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import {CSSProperties} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import C_Config from "../const/C_Config";


export default function ResultsRight()
{
    const loaded = useSelector((state:RootState) => state.search.loaded);

    return (<div id="results_right_container" className="side_panel">
            {loaded ? <WikiData/> : undefined}
        </div>);
}


const WikiText = (props) =>
{
    const containerStyle:CSSProperties =
    {
        display:"flex",
        flexDirection:"row",
        paddingTop:"0.3vw",
        fontSize:"min(1.5vw, 0.75rem)",
        width:"100%"
    };

    const nameStyle =
    {
        width:"40%",
        backgroundColor:"#f5f8ff"
    };

    const valueStyle =
    {
        width:"60%",
        backgroundColor:"#f5f8ff"
    };

    return <div style={containerStyle}>
        <div style={nameStyle}>{props.info.name}</div>
        <div style={valueStyle}>{props.info.value}</div>
    </div>;
};


const WikiData = (props:any) =>
{
    const wikiData:any = useSelector((state:RootState) => state.search.searchResults?.wikiData );

    const wikiLogoStyle:CSSProperties =
    {
        width:"60%"
    };

    const infoBoxStyle:CSSProperties =
    {
        display:"flex",
        flexDirection:"column",
        justifyContent:"right",
        backgroundColor:"#ffffff",
        alignItems:"center"
    };

    const wikiImgStyle =
    {
        padding:"2%",
        width:"90%"
    };

    const textResults = wikiData?.textInfo?.map((info:any, index:number) =>
    {
        return <WikiText key={index} info={info}/>;
    });

    return (<div className="results_side_container bordered_field">
        <a href={wikiData.link} target="_blank">
            <img style={wikiLogoStyle} src="./assets/providers/wikipedia.png"/>
        </a>
        <div style={infoBoxStyle}>
            <img style={wikiImgStyle} src={C_Config.IMG_URL + wikiData.imgURL}/>
            {textResults}
        </div>
    </div>)
};






