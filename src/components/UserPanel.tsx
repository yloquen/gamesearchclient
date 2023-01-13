import * as React from 'react'
import {gsap, Linear} from "gsap";
import Util, {useFade, useFade2} from "../Util";
import {useDispatch, useSelector} from "react-redux";
import {CSSProperties, useEffect, useRef} from "react";
import {AppDispatch, RootState, useAppDispatch} from "../store/store";

import
{
    makeLoginRequest,
    makeLogoutRequest,
    makeRegisterRequest,
    makeSearchHistoryRequest,
    showLoginWindow,
    showRegisterWindow
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

    const butExtraStyle:CSSProperties = {};
/*    if (!isOpen)
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
    }*/

    return (<div id="user_menu_root" ref={rootRef}>
        <img alt="menu" src="./assets/menu_icon.png" onClick={()=>{toggleFade()}} id="menu_toggle_button"/>
            <div id="user_menu_container" style={fadeStyle}>
                <DefaultButton onClick={()=>
                {
                    dispatch(makeSearchHistoryRequest());
                    // toggleCallback();
                }}
                    className="user_menu_button"
                    style={butExtraStyle}>
                    Search history
                </DefaultButton>

                <DefaultButton
                    onClick={()=>
                    {
                        dispatch(makeLogoutRequest());
                        // toggleCallback();
                    }}
                    className="user_menu_button"
                    style={butExtraStyle}>
                    Logout
                </DefaultButton>

            </div>
        </div>)
};