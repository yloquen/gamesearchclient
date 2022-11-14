import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import {CSSProperties, ForwardedRef, useContext, useDebugValue} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {makeLoginRequest, showLoginWindow} from "../features/user/userSlice";
import "/css/login.sass";
import {GlobalContext} from "../index";
import {useEffect} from "react";
import {resetSearch} from "../features/search/searchSlice";
import {getFadeWrapper, getFadeWrapperFuncComp} from "../hoc/FadeWrapper";
import {LabelledInput} from "./BasicComponents";



export const LoginWindow = (props:any) =>
{
    const dispatch = useDispatch();
    const FadeLoginWin = getFadeWrapperFuncComp(LoginWinBase, () => dispatch(showLoginWindow(false)));
    return (<FadeLoginWin {...props}/>);
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
            <div id="login_bg"/>
            <div id="login">
            <span id="close" onClick={ () => { props.closeRequest() }  }>[X]</span>

                <form onSubmit={onSubmit}>
                    <LabelledInput ref={emailRef} type="text" id={"loginEmail"}>E-mail</LabelledInput>
                    <br/>
                    <LabelledInput ref={passRef} type="password" id={"loginPass"}>Password</LabelledInput>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>)
};





