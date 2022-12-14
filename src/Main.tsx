import * as React from "react";
import { useEffect } from 'react';
import {Header} from "./components/Header";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "./store/store";
import {LoginWindow, RegisterWindow} from "./components/windows";
import {Outlet} from "react-router-dom";
import {resetSearch} from "./features/search/searchSlice";
import WindowLayer from "./components/WindowLayer";


const Main = () =>
{
    const dispatch = useDispatch();
    useEffect(() =>
    {
        window.addEventListener('popstate', function (event)
        {
            dispatch(resetSearch());
        });
    }, []);

    const comps =
    [
        <Header key={1}/>,
        <Outlet key={2}/>,
        <WindowLayer key={3}/>
    ];

    return (<div>
        { comps }
    </div>);
};

export default Main;