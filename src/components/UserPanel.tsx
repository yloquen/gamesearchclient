import * as React from 'react'
import {gsap, Linear} from "gsap";
import Util, {useFade, useFade2} from "../Util";
import {useDispatch, useSelector} from "react-redux";
import {CSSProperties, useEffect, useRef} from "react";
import {AppDispatch, RootState, useAppDispatch} from "../store/store";
import { useNavigate } from "react-router-dom";

import
{
    getFavoritesRequest,
    makeLoginRequest,
    makeLogoutRequest,
    makeRegisterRequest,
    makeSearchHistoryRequest,
    showLoginWindow,
    showRegisterWindow,
    resetLoadingFavorites
} from "../features/user/userSlice";

import {useState} from "react";
import {DefaultButton} from "./BasicComponents";
import "/css/user_panel.sass";


export default function UserPanel(props:any)
{
    const [init, setInit] = useState(false);

    const loggedIn = useSelector((state:RootState) => state.user.loggedIn);
    const username = useSelector((state:RootState) => state.user.username);

    const dispatch = useAppDispatch();
    useEffect(() =>
    {
        if (!init)
        {
            setInit(true);
            dispatch(makeLoginRequest({}));
        }
    });

    let content;
    if (loggedIn)
    {
        content = [
            <span key={0}>{username}</span>,
            <span key={1}>&nbsp;&nbsp;&nbsp;</span>,
            <UserMenu key={2}/>
        ];
    }
    else
    {
        content = [
            <DefaultButton key={0}
                onClick={() => {dispatch(showLoginWindow(true))}}>Login</DefaultButton>,

            <span key={1}>&nbsp;&nbsp;&nbsp;</span>,

            <DefaultButton key={2}
                onClick={() => {dispatch(showRegisterWindow(true))}}>{"Sign\u00a0up"}</DefaultButton>
        ];
    }

    return <div id="user_panel_root">{content}</div>;
}





const UserMenu = (props:any) =>
{
    const dispatch = useAppDispatch();

    const rootRef = useRef<HTMLImageElement>();

    const [fadeStyle, setFade, toggleFade] = useFade2(.25, false, false);

    /*
    if (!isOpen)
    {
        butExtraStyle.pointerEvents = "none";
    }
    else
    {
        /!*
        window.addEventListener("pointerdown", (e:PointerEvent) =>
        {
            if (e.target !== rootRef.current)
            {
                toggleCallback();
            }
        });
        *!/
    }
    */
    const navigate = useNavigate();

    const buttons = [
        { label : "Search History", onClick:() => { dispatch(makeSearchHistoryRequest()) }},
        { label : "Favorites", onClick:() =>
            {
                dispatch(resetLoadingFavorites());
                navigate(`/favorites`);
            }},
        { label : "Logout", onClick:() => { dispatch(makeLogoutRequest()) }}
    ]
        .map((butData, i) => createUserMenuButton(butData, i));

    return (<div id="user_menu_root" ref={rootRef}>
        <img alt="menu" src="./assets/menu_icon.png" onClick={()=>{toggleFade()}} id="menu_toggle_button"/>
            <div id="user_menu_container" style={fadeStyle}>
                {buttons}
            </div>
        </div>)
};


const createUserMenuButton = (butData:{label:string, onClick:() => void}, index:number) =>
{
    const butExtraStyle:CSSProperties = {};

    return <DefaultButton
        onClick={butData.onClick}
        className="user_menu_button"
        key={index}
        style={butExtraStyle}>
        {butData.label}
    </DefaultButton>
}