import React from "react";
import {Component} from 'react';
import Controller from "./Controller";
import {app} from "./App";
import {GameData, MainState} from "./types";
import C_Evt from "./const/C_Evt";




export default class Main extends Component<any, MainState>
{
    constructor(props:any)
    {
        super(props);
        this.state =
        {
            loaded:false
        };
        app.dispatcher.on(C_Evt.LOADED, this.onStateUpdate, this);
    }


    onStateUpdate()
    {
        this.setState(
        {
            loaded:app.model.loaded
        });
    }


    render()
    {
        let content;
        if (app.model.loaded)
        {
            content = <div id="main_container">
                <SearchForm/>
                <SearchResults results={app.model.searchResults}/>
            </div>;
        }
        else
        {
            content = <div id="main_container">
                <SearchForm/>
            </div>;
        }
        return content;
    }
}


function SearchResult(props:{result:GameData})
{
    const result:GameData = props.result;

    return (
        <div className="result_container">
            <img className="result_image" src={"data:image/png;base64," + result.img}/>
            <div className="result_name">
                <a href={result.link} target="_blank" style={{display:"inline-block", verticalAlign:"middle"}}>{result.name}</a>
            </div>
            <div className="result_price">
                {result.price.toFixed(2)}
                <div style={{height:"0.25vw"}}/>
                <img src={"./providers/" + result.provider.toLocaleLowerCase() + ".png"} style={{height:"1.75vw"}}/>
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
            <input className="search_form_component" type="text" ref={ref}/>
            <button className="search_form_component" onClick={() => {app.controller.runQuery(ref.current.value)}}>
                Search
            </button>
        </div>
    );
}


function Header(props:any)
{
    return (
        <div id="header">
            GAME SEARCH
        </div>
    );
}

