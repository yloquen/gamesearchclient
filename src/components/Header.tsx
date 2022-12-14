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
import {DefaultButton, HeaderButton} from "./BasicComponents";
import "/css/header.sass";

export function Header(props:any)
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const context = useContext(GlobalContext);

    const inputRef:any = React.createRef();
    return (
        <div id="header_container">

            <img onClick={() => window.location.href = "/" } id="logo" alt="" src="/assets/game_search_logo.png"/>

            <div id="search_group">
                <input className="default_input" id="search_input" type="text" ref={inputRef}/>
                <HeaderButton
                              onClick={() =>
                              {
                                  dispatch(resetSearch());
                                  navigate(`/search?q=${inputRef.current.value}`);
                              }}>
                    Search
                </HeaderButton>
            </div>

            <UserPanel/>
        </div>
    );
}