import * as React from "react";
import {GameData} from "../types";
import {CSSProperties, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import "/css/video.sass";
import C_Config from "../const/C_Config";


export default function ResultsLeft()
{
    const loaded = useSelector((state:RootState) => state.search.loaded);
    const videoId = useSelector((state:RootState) => state.search.searchResults?.videoId);

    return (<div id="results_left_container" className="side_panel">
            {loaded ? <GameVideo videoId={videoId}/> : undefined}
            {loaded ? <PriceChartingList/> : undefined}
        </div>);
}


const GameVideo = (props:any) =>
{
    const [isAnimInitialized, setIsAnimInitialized] = useState(false);
    const [isVideoEnlarged, setIsVideoEnlarged] = useState(false);

    const toggleSize = () =>
    {
        setIsAnimInitialized(true);
        setIsVideoEnlarged(!isVideoEnlarged);
    };

    const videoStyle:CSSProperties =
    {
        position: "relative",
        width: isVideoEnlarged ? "250%" : "100%",
        aspectRatio: 16/9,
        zIndex: 1,
        animationName: isVideoEnlarged ? "scale_up" : "scale_down",
        animationDuration: isAnimInitialized ? "0.15s" : "0s"
    };

    return (
        <div id="walkthrough_video_container">
            <img id="walkthrough_video_resize_but" onClick={() => toggleSize()} src="/assets/video_toggle.png"/>
            <iframe style={videoStyle} src={"https://www.youtube.com/embed/" + props.videoId}/>
        </div>);

};


const PriceChartingList = (props:any) =>
{
    const imgStyle:CSSProperties =
    {
        width:"50%",
        paddingBottom:"1vw"
    };

    const priceData = useSelector((state:RootState) => state.search.searchResults?.priceData) || [];

    const results = priceData?.map((priceData:GameData, index:number) =>
    {
        return <PriceChartingItem key={index} priceData={priceData}/>
    });

    const searchQuery = useSelector((state:RootState) => state.search.query);

    console.log(searchQuery);

    const priceChartingLink = `https://www.pricecharting.com/search-products?type=prices&q=${searchQuery}&go=Go`

    return (<div className="results_side_container bordered_field">
        <a href={priceChartingLink} target="_blank">
            <img style={imgStyle} src="./assets/providers/pricecharting.png"/>
        </a>
        {results}
    </div>)
};


const PriceChartingItem = (props:{priceData:GameData}) =>
{
    const nameStyle:CSSProperties =
    {
        width:"70%",
    };

    const priceStyle:CSSProperties =
    {
        width:"30%",
        textAlign:"right"
    };

    const MAX_LENGTH = 50;
    let name = props.priceData.name;
    if (name.length > MAX_LENGTH)
    {
        name = name.slice(0, MAX_LENGTH-3) + "...";
    }

    const price = props.priceData.price ? (props.priceData.price * C_Config.USD_TO_BGN).toFixed(2) + "\u00A0лв." : "N.A.";

    return (<div className="price_charting_item font_s">
        <a className = "price_charting_name" style={nameStyle} href={props.priceData.link} target="_blank">{name}</a>
        <div className = "price_charting_price" style={priceStyle}>{price}</div>
    </div>)
};





