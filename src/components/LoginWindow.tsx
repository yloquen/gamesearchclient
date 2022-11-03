import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import {CSSProperties, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {makeLoginRequest, showLoginWindow} from "../features/user/userSlice";
import "/css/login.sass";
import {GlobalContext} from "../index";



const LoginWindow = (props:{closeRequest:Function}) =>
{
    const dispatch = useDispatch();

    const onSubmit = () =>
    {
        props.closeRequest();
        // dispatch(showLoginWindow(false));
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

export default LoginWindow;





