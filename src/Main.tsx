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
import LoginWindow from "./components/LoginWindow";
import {Outlet} from "react-router-dom";


const Main = () =>
{
    const loginWindow = useSelector((state:RootState) => state.user.loginWindow);

    const content =
    [
        <SearchForm key={0}/>,
        <Outlet />
    ];

/*    if (loading)
    {
        content.push(<LoadingCircle key={1}/>);
    }*/

/*    if (loaded)
    {
        content.push(<SearchResults results = {searchResults} key={2}/>);
    }*/

    if (loginWindow)
    {
        content.push(<LoginWindow key={3}/>);
    }

    return (<div id="main_container">
        { content }
    </div>);
};

export default Main;