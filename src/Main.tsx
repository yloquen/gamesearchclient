import * as React from "react";
import { useEffect } from 'react';
import {Header} from "./components/Header";
import {useDispatch, useSelector} from "react-redux";
import {RootState, store} from "./store/store";
import {LoginWindow, RegisterWindow} from "./components/windows";
import {Outlet} from "react-router-dom";
import {resetSearch, startSearch} from "./features/search/searchSlice";
import WindowLayer from "./components/WindowLayer";
import LoadingCircle from "./components/LoadingCircle";
import { useNavigate, useLocation } from "react-router-dom";
import Background from "./components/Background";




const Main = () =>
{
    const { search } = useLocation();
    const q = React.useMemo(() => new URLSearchParams(search), [search]).get("q");

    //const query = useSelector((state:RootState) => state.search.query);

    const dispatch = useDispatch();
    useEffect(() =>
    {
        window.addEventListener('popstate', function (event)
        {
            dispatch(resetSearch());
        });
    }, []);

/*    useEffect(() =>
    {
        if (query)
        {
            //dispatch(startSearch(query));
            // navigate(`/search?q=${query}`);
        }
    }, [query]);*/

    const comps =
    [
        <Background key={0}/>,
        <Header key={1}/>,
        <Outlet key={2}/>,
        <WindowLayer key={3}/>
    ];

    return (<div>
        { comps }
    </div>);
};

export default Main;