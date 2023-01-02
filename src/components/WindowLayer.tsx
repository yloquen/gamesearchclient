import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {RegisterWindow, LoginWindow, SearchHistoryWindow} from "./windows";
import * as React from "react";

export default (props:any) =>
{
    const loginWindow = useSelector((state:RootState) => state.user.loginWindow);
    const registerWindow = useSelector((state:RootState) => state.user.registerWindow);
    const searchHistoryWindow = useSelector((state:RootState) => state.user.searchHistoryWindow);

    return(
        <>
            { loginWindow ? <LoginWindow key={1}/> : null }
            { registerWindow ? <RegisterWindow key={2}/> : null }
            { searchHistoryWindow ? <SearchHistoryWindow key={3}/> : null }
        </>);
}