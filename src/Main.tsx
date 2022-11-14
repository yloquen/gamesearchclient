import * as React from "react";
import { useEffect } from 'react';
import {SearchForm} from "./components/SearchForm";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "./store/store";
import {LoginWindow} from "./components/LoginWindow";
import {Outlet} from "react-router-dom";
import {resetSearch} from "./features/search/searchSlice";


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
    }, []);

    const comps =
    [
        <SearchForm key={2}/>,
        <Outlet key={3}/>,
        loginWindow ? <LoginWindow key={1}/> : null
    ];

    return (<div>
        { comps }
    </div>);
};

export default Main;