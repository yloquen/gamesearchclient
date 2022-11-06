import * as React from 'react'
import {gsap, Linear} from "gsap";
import Util from "../Util";
import {useDispatch, useSelector} from "react-redux";
import {CSSProperties} from "react";
import {RootState} from "../store/store";
import {makeLoginRequest, showLoginWindow} from "../features/user/userSlice";
import {useState} from "react";

export default function UserPanel(props:any)
{
    const [init, setInit] = useState(false);

    const loggedIn = useSelector((state:RootState) => state.user.loggedIn);
    const username = useSelector((state:RootState) => state.user.username);

    const style:CSSProperties =
    {
        position:"absolute",
        right:"1.5vw",
        padding:"1 vw",
        fontSize:"1.25rem"
    };

    const dispatch = useDispatch();
    if (!init)
    {
        dispatch(makeLoginRequest({}));
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
            <button key={1} onClick={() => {dispatch(showLoginWindow(true))}}>Login</button>,
            <span key={2}>&nbsp;&nbsp;&nbsp;</span>,
            <button key={3} onClick={() => {}}>Sign up</button>
        ];
    }

    return <div style={style}>{content}</div>;
}