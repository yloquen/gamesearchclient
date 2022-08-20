import * as React from "react";
import {GameData} from "../types";
import {app} from "../App";
import {CSSProperties} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {makeLoginRequest, showLoginWindow} from "../features/user/userSlice";


const LoginWindow = (props:{}) =>
{
    const dispatch = useDispatch();

    const style:CSSProperties =
    {
        width:"40vw",
        height:"30vh",
        position:"fixed",
        left:"30vw",
        top:"35vh",
        backgroundColor:"#f5f8ff",
        fontSize:"2rem",
        display:"flex",
        flexDirection:"column"
    };

    const closeButStyle:CSSProperties =
    {
        position:"absolute",
        right:"1vw",
        top:"1vh",
        cursor:"pointer",
        fontSize:"1.25rem"
    };

    return (<div style={style}>
        <span style={closeButStyle} onClick={() => {dispatch(showLoginWindow(false))}}>close[X]</span>

            <form onSubmit={() =>
                {
                    dispatch(showLoginWindow(false));
                    const emailInput:HTMLInputElement = document.getElementById("loginEmail") as HTMLInputElement;
                    const passInput:HTMLInputElement = document.getElementById("loginPass") as HTMLInputElement;
                    dispatch(makeLoginRequest({email:emailInput.value, pass:passInput.value}));
                }}>
                <label htmlFor="loginEmail">E-mail</label>
                <input type="text" id="loginEmail"/>
                <br/>
                <label htmlFor="loginPass">Password</label>
                <input type="password" id="loginPass"/>
                <button type="submit">Submit</button>
            </form>

    </div>)
};

export default LoginWindow;





