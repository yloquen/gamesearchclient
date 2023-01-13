import * as React from "react";
import {GameData} from "../types";

import {CSSProperties, ForwardedRef, useContext, useDebugValue, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../store/store";
import {makeLoginRequest, makeRegisterRequest, showLoginWindow, showRegisterWindow,
    showSearchHistoryWindow } from "../features/user/userSlice";
import "/css/login.sass";
import {DefaultButton, LabelledInput} from "./BasicComponents";
import {useFade, useFade2} from "../Util";
import "/css/history.sass";
import "/css/common.sass";
import C_Config from "../const/C_Config";


export const LoginWindow = (props:any) =>
{
    const dispatch = useAppDispatch();
    const [emailRef, passRef]:ForwardedRef<HTMLInputElement>[] = [React.createRef(), React.createRef()];

    const [fadeStyle, setFade] = useFade2(.25, true, true);

    const onSubmit = () =>
    {
        const email = emailRef.current.value;
        const pass = passRef.current.value;
        setFade(false, () =>
        {
            dispatch(showLoginWindow(false));
            dispatch(makeLoginRequest({email:email, pass:pass}));
        });
    };

    return (
        <div style={fadeStyle}>
            <div id="window_bg"/>
            <div id="login">
                <span id="close" onClick={ () =>
                {
                    setFade(false, () => {dispatch(showLoginWindow(false))});
                }}>
                    [X]
                </span>
                <div id="form">
                    <LabelledInput ref={emailRef} type="text" id={"loginEmail"}>E-mail</LabelledInput>
                    <br/>
                    <LabelledInput ref={passRef} type="password" id={"loginPass"}>Password</LabelledInput>
                    <br/>
                    <DefaultButton onClick={onSubmit}>Submit</DefaultButton>
                </div>
            </div>
        </div>)
};



export const RegisterWindow = (props:any) =>
{
    const dispatch = useDispatch<AppDispatch>();

    const [passValid, setPassValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const [emailRef, passRef, repeatPassRef]:ForwardedRef<HTMLInputElement>[] =
        [React.createRef(), React.createRef(), React.createRef()];

    const [fadeStyle, setFade] = useFade2(.25, true, true);

    const validateInput = () =>
    {
        const pass = passRef.current.value;
        const passRepeat = repeatPassRef.current.value;
        const newPassValid = pass === passRepeat && pass.length >= 8;
        if (newPassValid !== passValid)
        {
            setPassValid(newPassValid);
        }

        const email = emailRef.current.value;
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        };

        const newEmailValid = validateEmail(email) !== null;
        if (newEmailValid !== emailValid)
        {
            setEmailValid(newEmailValid);
        }
    };

    const submitButtonStyle:CSSProperties = {};
    if (!passValid || !emailValid)
    {
        submitButtonStyle.opacity = 0.6;
        submitButtonStyle.cursor = "not-allowed";
    }

    return (
        <div style={fadeStyle}>
            <div id="window_bg"/>
            <div id="register">
                <span id="close" onClick={() =>
                {
                    setFade(false, () => {dispatch(showRegisterWindow(false))});
                }}>
                    [X]
                </span>
                <div id="form">
                    <LabelledInput onChange={validateInput} ref={emailRef} isValid={emailValid}
                        type="text" id={"loginEmail"}>E-mail</LabelledInput>
                    <br/>
                    <LabelledInput onChange={validateInput} ref={passRef} isValid={passValid}
                        type="password" id={"loginPass"}>Password</LabelledInput>
                    <br/>
                    <LabelledInput onChange={validateInput} ref={repeatPassRef} isValid={passValid}
                        type="password" id={"loginPass"}>Repeat Password</LabelledInput>
                    <br/>
                    <DefaultButton style={submitButtonStyle} onClick={()=>
                    {
                        const email = emailRef.current.value;
                        const pass = passRef.current.value;
                        setFade(false, () =>
                        {
                            dispatch(makeRegisterRequest({email:email, pass:pass}));
                        });
                    }}>
                        Submit
                    </DefaultButton>
                </div>
            </div>
        </div>)
};


export const SearchHistoryWindow = (props:any) =>
{
    const dispatch = useDispatch();

    const [fadeStyle, setFade] = useFade2(.25, true, true);

    const urlPrefix = C_Config.URL_BASE + "search?q=";

    const history = useSelector((state:RootState) => state.user.searchHistory);
    const historyItems = history.map(e => <><a href={urlPrefix + encodeURIComponent(e)}>{e}</a><br/></>);

    return (
        <div style={fadeStyle}>
            <div id="window_bg"/>

            <div id="win_bg" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <span id="close" onClick={ () =>
                {
                    setFade(false, () => {dispatch(showSearchHistoryWindow(false))});
                }}>
                    [X]
                </span>
                <div>
                    { historyItems }
                </div>
            </div>
        </div>);
};