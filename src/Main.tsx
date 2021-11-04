import React, {useEffect} from "react";
import {Component} from 'react';
import Controller from "./Controller";
import {app} from "./App";
import {GameData, MainState} from "./types";
import C_Evt from "./const/C_Evt";
import { gsap, Linear } from "gsap";




export default class Main extends Component<any, MainState>
{


    constructor(props:any)
    {
        super(props);
        this.state =
        {
            loading:false,
            loaded:false
        };
        app.dispatcher.on(C_Evt.LOAD_EVENT, this.updateState, this);
    }


    updateState()
    {
        this.setState(
        {
            loading:app.model.loading,
            loaded:app.model.loaded
        });
    }


    render()
    {
        const content =
        [
            <SearchForm/>,
            <SearchResults results = { app.model.searchResults }/>
        ];

        if (this.state.loading)
        {
            content.push(<Loader/>);
        }

        return (<div id="main_container">
            { content }
        </div>);
    }


}


function SearchResult(props:{result:GameData})
{
    const result:GameData = props.result;

    return (
        <div className="result_container">
            <img className="result_image" src={result.img}/>
            <div className="result_name">
                <a href={result.link} target="_blank" style={{display:"inline-block", verticalAlign:"middle"}}>{result.name}</a>
            </div>
            <div className="result_price">
                {result.price.toFixed(2)}
                <div style={{height:"0.25vw"}}/>
                <img className="result_provider" src={"./assets/providers/" + result.provider.toLocaleLowerCase() + ".png"} />
            </div>
        </div>);
}


function SearchResults(props:any)
{
    const results = props.results.map((result) =>
    {
        return <SearchResult result={result}/>;
    });

    return (
        <div id="results_container">
            {results}
        </div>
    );
}


function SearchForm(props:any)
{
    const ref = React.createRef();
    return (
        <div id="search_form_container">
            <input id="search_form_input" type="text" ref={ref}/>
            <div id="search_spacer"/>
            <button id="search_form_button" onClick={() => {app.controller.runQuery(ref.current.value)}}>
                Search
            </button>
        </div>
    );
}


function Loader(props:any)
{
    const ref = React.createRef();

    useEffect(() =>
    {
        gsap.to(ref.current, { duration:2, ease:Linear.easeNone, rotation:360, repeat:10});
        gsap.from(ref.current, { duration:.2, alpha:0 });
    });

    const style:React.CSSProperties =
    {
        width:"7vw",
        height:"7vw",
        position:"fixed",
        left:"50vw",
        top:"50vh",
        transform:"translate(-50%, -50%)",
        filter:"brightness(70%)",
        opacity:0.5
    };

    return (<img ref={ref} src="./assets/loading_circle.png" style={style}/>);
}

