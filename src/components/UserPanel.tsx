import * as React from 'react'
import {gsap, Linear} from "gsap";
import Util, {useFade} from "../Util";
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
import {DefaultButton, HeaderButton} from "./BasicComponents";
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
        padding:"1 vw"
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
            <HeaderButton key={1}
                onClick={() => {dispatch(showLoginWindow(true))}}>Login</HeaderButton>,

            <span key={2}>&nbsp;&nbsp;&nbsp;</span>,

            <HeaderButton key={3}
                onClick={() => {dispatch(showRegisterWindow(true))}}>{"Sign\u00a0up"}</HeaderButton>
        ];
    }

    return <div style={containerStyle}>{content}</div>;
}





const UserMenu = (props:any) =>
{
    const dispatch = useDispatch<AppDispatch>();

    const [toggleCallback, fadeStyle, isOpen] = useFade();

    const butExtraStyle:CSSProperties = { margin:"0.2rem"};
    if (!isOpen)
    {
        butExtraStyle.pointerEvents = "none";
    }

    return (<div style={{backgroundColor:"#0ff", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <img alt="menu" src="./assets/menu_icon.png" onClick={toggleCallback} id="menu_button"/>
            <div id="user_menu_container" style={fadeStyle}>
                <DefaultButton onClick={()=>
                {
                    dispatch(makeSearchHistoryRequest());
                    toggleCallback();
                }}
                    style={butExtraStyle}>
                    Search history
                </DefaultButton>

                <DefaultButton
                    onClick={()=>
                    {
                        dispatch(makeLogoutRequest());
                        toggleCallback();
                    }}
                    style={butExtraStyle}>
                    Logout
                </DefaultButton>

            </div>
        </div>)
};