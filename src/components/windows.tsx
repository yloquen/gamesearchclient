import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import {CSSProperties, ForwardedRef, useContext, useDebugValue, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {makeLoginRequest, makeRegisterRequest, showLoginWindow, showRegisterWindow,
    showSearchHistoryWindow } from "../features/user/userSlice";
import "/css/login.sass";
import {GlobalContext} from "../index";
import {useEffect} from "react";
import {resetSearch} from "../features/search/searchSlice";
import {getFadeWrapper, getFadeWrapperFuncComp} from "../hoc/FadeWrapper";
import {DefaultButton, HeaderButton, LabelledInput} from "./BasicComponents";
import {useFade} from "../Util";
import "/css/history.sass";
import "/css/common.sass";
import C_Config from "../const/C_Config";




export const LoginWindow = (props:any) =>
{
    const dispatch = useDispatch();
    const FadeLoginWin = getFadeWrapperFuncComp(LoginWinBase, () => dispatch(showLoginWindow(false)));
    return (<FadeLoginWin {...props}/>);
};


export const RegisterWindow = (props:any) =>
{
    const dispatch = useDispatch();
    const FadeRegisterWin = getFadeWrapperFuncComp(RegisterWinBase, () => dispatch(showRegisterWindow(false)));
    return (<FadeRegisterWin {...props}/>);
};


const LoginWinBase = (props:any) =>
{
    const dispatch = useDispatch();
    const [emailRef, passRef]:ForwardedRef<HTMLInputElement>[] = [React.createRef(), React.createRef()];

    const onSubmit = () =>
    {
        props.closeRequest();
        dispatch(makeLoginRequest({email:emailRef.current.value, pass:passRef.current.value}) as any);
    };

    return (
        <>
            <div id="window_bg"/>
            <div id="login">
                <span id="close" onClick={ () => { props.closeRequest() }  }>[X]</span>
                <div id="form">
                    <LabelledInput ref={emailRef} type="text" id={"loginEmail"}>E-mail</LabelledInput>
                    <br/>
                    <LabelledInput ref={passRef} type="password" id={"loginPass"}>Password</LabelledInput>
                    <br/>
                    <HeaderButton onClick={onSubmit}>Submit</HeaderButton>
                </div>
            </div>
        </>)
};



const RegisterWinBase = (props:any) =>
{
    const [passValid, setPassValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const dispatch = useDispatch();
    const [emailRef, passRef, repeatPassRef]:ForwardedRef<HTMLInputElement>[] = [React.createRef(), React.createRef(), React.createRef()];

    const onSubmit = () =>
    {
        props.closeRequest();
        dispatch(makeRegisterRequest({email:emailRef.current.value, pass:passRef.current.value}) as any);
    };

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

    const submitButtonStyle = !passValid || !emailValid ?
    {
        opacity : 0.6,
        cursor : "not-allowed"
    } : {};

    return (
        <>
            <div id="window_bg"/>
            <div id="register">
                <span id="close" onClick={ () => { props.closeRequest() }  }>[X]</span>
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
                    <button style={submitButtonStyle} type="submit" onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </>)
};


export const SearchHistoryWindow = (props:any) =>
{
    const dispatch = useDispatch();

    const [toggleCallback, fadeStyle] = useFade(1);

    const urlPrefix = C_Config.URL_BASE + "search?q=";

    const history = useSelector((state:RootState) => state.user.searchHistory);
    const historyItems = history.map(e => <><a href={urlPrefix + encodeURIComponent(e)}>{e}</a><br/></>);

    return (
        <>
            <div id="window_bg" style={fadeStyle}/>

            <div id="win_bg" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <span id="close" onClick={ () =>
                {
                    dispatch(showSearchHistoryWindow(false))
                }  }>[X]</span>
                <div>
                    {historyItems}
                </div>
            </div>
        </>);
};

