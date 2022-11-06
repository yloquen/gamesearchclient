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
import {LoginWindow} from "./components/LoginWindow";
import {Outlet} from "react-router-dom";
import {resetSearch} from "./features/search/searchSlice";
import {getFadeWrapper} from "./hoc/FadeWrapper";
import {showLoginWindow} from "./features/user/userSlice";





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

    const comps =
    [
        <SearchForm key={2}/>,
        <Outlet key={3}/>,
        loginWindow ? <LoginWindow key={1} myProp={"zzz"} otherProp={"yyy"}/> : null
    ];

    return (<div id="main_container">
        { comps }
    </div>);
};

export default Main;