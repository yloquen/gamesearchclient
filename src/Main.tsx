import * as React from "react";
import {Component} from 'react';
import {app} from "./App";
import {MainState} from "./types";
import C_Evt from "./const/C_Evt";
import LoadingCircle from "./components/LoadingCircle";
import {SearchResults} from "./components/SearchResults";
import {SearchForm} from "./components/SearchForm";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";


const Main = () =>
{
    const loading = useSelector((state:RootState) => state.search.loading);
    const loaded = useSelector((state:RootState) => state.search.loaded);
    const searchResults = useSelector((state:RootState) => state.search.searchResults?.gameData);

    const content =
    [
        <SearchForm/>,
    ];

    if (loading)
    {
        content.push(<LoadingCircle/>);
    }

    if (loaded)
    {
        content.push(<SearchResults results = { searchResults }/>);
    }

    return (<div id="main_container">
        { content }
    </div>);
};

export default Main;