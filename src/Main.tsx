import * as React from "react";
import {useEffect} from "react";
import {Component} from 'react';
import Controller from "./Controller";
import {app} from "./App";
import {GameData, MainState} from "./types";
import C_Evt from "./const/C_Evt";
import { gsap, Linear } from "gsap";
import LoadingCircle from "./components/LoadingCircle";
import Util from "./Util";
import LeftContainer from "./components/LeftContainer";
import RightContainer from "./components/RightContainer";


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
            <SearchResults results = { app.model.gameData }/>
        ];

        if (this.state.loading)
        {
            content.push(<LoadingCircle/>);
        }

        return (<div id="main_container">
            { content }
        </div>);
    }


}


function SearchResult(props:{result:GameData, index:number})
{
    const ref = Util.createTweens(
        [],
        [{ duration:.5, alpha:0, delay:props.index * .1 }]);

    const result:GameData = props.result;

    return (
        <div ref={ref} className="result_container">
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
    const results = props.results.map((result, index) =>
    {
        return <SearchResult result={result} index={index} key={result.name}/>;
    });

    return (
        <div id="results_root">
            <LeftContainer/>
            <div id="results_center_container">
                {results}
            </div>
            <RightContainer/>
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

