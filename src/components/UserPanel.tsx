import * as React from 'react'
import {gsap, Linear} from "gsap";
import Util from "../Util";
import {useDispatch, useSelector} from "react-redux";
import {CSSProperties} from "react";
import {RootState} from "../store/store";
import
{
    makeLoginRequest,
    makeLogoutRequest,
    makeRegisterRequest, makeSearchHistoryRequest,
    showLoginWindow,
    showRegisterWindow
}
    from "../features/user/userSlice";
import {useState} from "react";
import {DefaultButton} from "./BasicComponents";
import {AppDispatch} from "../types";
import "/css/user_panel.sass";


export default function UserPanel(props:any)
{
    const [init, setInit] = useState(false);

    const loggedIn = useSelector((state:RootState) => state.user.loggedIn);
    const username = useSelector((state:RootState) => state.user.username);

    const containerStyle:CSSProperties =
    {
        display:"flex",
        flexDirection:"row",
        placeItems: "center",
        position:"absolute",
        right:"1.5vw",
        padding:"1 vw",
        fontSize:"calc(min(1.5vw, 1.25rem))"
    };

    const dispatch = useDispatch<AppDispatch>();
    if (!init)
    {
        dispatch(makeLoginRequest({}));
        setInit(true);
    }

    let content;
    if (loggedIn)
    {
        content = [
            <span key={0}>{username}</span>,
            <span key={2}>&nbsp;&nbsp;&nbsp;</span>,
/*            <DefaultButton key={1} className="search_bar_element" onClick={() => {dispatch(makeLogoutRequest())}}>
                Logout
            </DefaultButton>*/

            <UserMenu/>
        ];
    }
    else
    {
        content = [
            <DefaultButton key={1}
                onClick={() => {dispatch(showLoginWindow(true))}}>Login</DefaultButton>,

            <span key={2}>&nbsp;&nbsp;&nbsp;</span>,

            <DefaultButton key={3}
                onClick={() => {dispatch(showRegisterWindow(true))}}>Sign up</DefaultButton>
        ];
    }

    return <div style={containerStyle}>{content}</div>;
}


const UserMenu = (props:any) =>
{
    const dispatch = useDispatch<AppDispatch>();

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const toggleMenu = () =>
    {
        setMenuIsOpen(!menuIsOpen);
        setIsInitialized(true);
    };

    const menuContainerStyle:CSSProperties =
    {
        animationName: menuIsOpen ? "fade_in" : "fade_out",
        animationDuration: (isInitialized ? 0.25 : 0) + "s",
        opacity: menuIsOpen ? "100%" : "0%"
    };


    const butStyle:CSSProperties =
    {
        margin:"0.2rem"
    };

    return (<div style={{backgroundColor:"#0ff", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <img alt="menu" src="./assets/menu_icon.png" onClick={toggleMenu} id="menu_button"/>
            <div id="user_menu_container" style={menuContainerStyle}>
                <DefaultButton onClick={()=>{ dispatch(makeSearchHistoryRequest()) }} style={butStyle}>Search history</DefaultButton>
                <DefaultButton onClick={()=>{ dispatch(makeLogoutRequest()) }} style={butStyle}>Logout</DefaultButton>
            </div>
        </div>)
};