import * as React from "react";
import {app} from "../App";
import {CSSProperties, LegacyRef, useState} from "react";
import {resetSearch} from "../features/search/searchSlice";
import {useDispatch} from "react-redux";
import UserPanel from "./UserPanel";
import { useNavigate } from "react-router-dom";

export function SearchForm(props:any)
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoStyle:CSSProperties =
    {
        position:"absolute",
        left:"1.5vw"
    };

    const inputRef:any = React.createRef();
    return (
        <div id="search_form_container">
            <img style={logoStyle} alt="" src="./assets/game_search_logo.png"/>

            <input id="search_form_input" type="text" ref={inputRef}/>
            <button id="search_form_button" onClick={() =>
            {
                // navigate(`/`);
                dispatch(resetSearch());
                navigate(`/search?q=${inputRef.current.value}`);
            }}>
                Search
            </button>
            <UserPanel/>
        </div>
    );
}