import * as React from "react";
import {Component} from 'react';
import {app} from "./App";
import {MainState} from "./types";
import C_Evt from "./const/C_Evt";
import LoadingCircle from "./components/LoadingCircle";
import {SearchResults} from "./components/SearchResults";
import {SearchForm} from "./components/SearchForm";


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


