import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import {CSSProperties, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {makeLoginRequest, showLoginWindow} from "../features/user/userSlice";
import "/css/login.sass";
import {GlobalContext} from "../index";
import {useEffect} from "react";
import {resetSearch} from "../features/search/searchSlice";
import {getFadeWrapper, getFadeWrapperFuncComp} from "../hoc/FadeWrapper";



export const LoginWindow = (props:any) =>
{
    const dispatch = useDispatch();
    const FadeLoginWin = getFadeWrapperFuncComp(LoginWinBase, () => dispatch(showLoginWindow(false)));
    return (<FadeLoginWin {...props}/>);
};


const LoginWinBase = (props:any) =>
{
    useEffect(() =>
    {
        console.log("did mount");

        return () => { console.log("will unmount"); }
    }, []);


    const dispatch = useDispatch();

    const onSubmit = () =>
    {
        props.closeRequest();
        const emailInput:HTMLInputElement = document.getElementById("loginEmail") as HTMLInputElement;
        const passInput:HTMLInputElement = document.getElementById("loginPass") as HTMLInputElement;
        dispatch(makeLoginRequest({email:emailInput.value, pass:passInput.value}));
    };

    return (
        <>
            <div id="login_bg"/>
            <div id="login">
            <span id="close" onClick={ () => { props.closeRequest() }  }>[X]</span>

                <form onSubmit={onSubmit}>
                    <label htmlFor="loginEmail" >
                        <span className="label">{"E-mail"}</span>
                        <input type="text" className="text_input" id="loginEmail"/>
                    </label>

                    <br/>
                    <label htmlFor="loginPass">
                        <span className="label">{"Password"}</span>
                        <input type="password" className="text_input" id="loginPass"/>
                    </label>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>)
};





