import * as React from "react";
import {app} from "../App";
import {CSSProperties, LegacyRef, useState} from "react";
import {resetSearch} from "../features/search/searchSlice";
import {useDispatch} from "react-redux";
import UserPanel from "./UserPanel";
import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import {GlobalContext} from "../index";
import "/css/search_form.css";

export function SearchForm(props:any)
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const context = useContext(GlobalContext);

    const logoStyle:CSSProperties =
    {
        position:"absolute",
        left:"1.5vw",
        backgroundColor:context.winBgColor,
        cursor: "pointer"
    };

    const inputRef:any = React.createRef();
    return (
        <div id="search_form_container">

            <img onClick={() => window.location.href = "/" } style={logoStyle} alt="" src="/assets/game_search_logo.png"/>

            <input id="search_form_input" type="text" ref={inputRef}/>
            <button ref={props.myRef} id="search_form_button" onClick={() =>
            {
                dispatch(resetSearch());
                navigate(`/search?q=${inputRef.current.value}`);
            }}>
                Search
            </button>
            <UserPanel/>
        </div>
    );
}