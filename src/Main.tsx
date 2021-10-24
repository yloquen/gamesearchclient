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
                <Header/>
                <SearchForm/>
                <SearchResults results={app.model.searchResults}/>
            </div>;
        }
        else
        {
            content = <div id="main_container">
                <Header/>
                <SearchForm/>
            </div>;
        }
        return content;
    }
}


function SearchResult(props:{result:GameData})
{
    return (<div id="result_container">
        <div class="result_name">{props.result.name}</div>
        <div class="result_price">{props.result.price}</div>
        <div class="result_provider">{props.result.provider}</div>
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
            <input class="search_form_component" type="text" ref={ref}/>
            <button class="search_form_component" onClick={() => {app.controller.runQuery(ref.current.value)}}>Search</button>
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

