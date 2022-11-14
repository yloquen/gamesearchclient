import * as React from 'react'
import {gsap, Linear} from "gsap";
import Util from "../Util";
import {useDispatch, useSelector} from "react-redux";
import {CSSProperties} from "react";
import {RootState} from "../store/store";
import {makeLoginRequest, showLoginWindow} from "../features/user/userSlice";
import {useState} from "react";
import {DefaultButton} from "./BasicComponents";

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
        fontSize:"1.25rem"
    };

    const dispatch = useDispatch();
    if (!init)
    {
        dispatch(makeLoginRequest({}) as any);
        setInit(true);
    }

    let content;
    if (loggedIn)
    {
        content = [<span key={0}>{username}</span>];
    }
    else
    {
        content = [
            <DefaultButton key={1} className="search_bar_element"
                onClick={() => {dispatch(showLoginWindow(true))}}>Login</DefaultButton>,

            <span key={2}>&nbsp;&nbsp;&nbsp;</span>,

            <DefaultButton key={3} className="search_bar_element"
                onClick={() => {}}>Sign up</DefaultButton>
        ];
    }

    return <div style={containerStyle}>{content}</div>;
}