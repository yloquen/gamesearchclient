import * as React from "react";
import {Component, useEffect, useRef} from 'react';
import {app} from "./App";
import {MainState} from "./types";
import C_Evt from "./const/C_Evt";
import LoadingCircle from "./components/LoadingCircle";
import {SearchResults} from "./components/SearchResults";
import {SearchForm} from "./components/SearchForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "./store/store";
import LoginWindow from "./components/LoginWindow";
import {Outlet} from "react-router-dom";
import {resetSearch} from "./features/search/searchSlice";
import {getFadeWrapper} from "./hoc/FadeWrapper";




const Main = () =>
{
    const loginWindow = useSelector((state:RootState) => state.user.loginWindow);

    const dispatch = useDispatch();
    useEffect(() =>
    {
        window.addEventListener('popstate', function (event)
        {
            dispatch(resetSearch());
        });

        return () => console.log("Removing LoginWindow");
    }, []);

    const FadeLoginWin = getFadeWrapper(LoginWindow);
    const content =
    [
        loginWindow ? <FadeLoginWin key={4}/> : null,
        <SearchForm key={0}/>,
        <Outlet key={1} />
    ];

    return (<div id="main_container">
        { content }
    </div>);
};

export default Main;