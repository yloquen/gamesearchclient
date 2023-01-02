import * as React from "react";
import {app} from "../App";
import {CSSProperties, LegacyRef, Ref, useEffect, useState} from "react";
import {resetSearch, startSearch} from "../features/search/searchSlice";
import {useDispatch} from "react-redux";
import UserPanel from "./UserPanel";
import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import "/css/search_form.css";
import {DefaultButton} from "./BasicComponents";
import "/css/header.sass";

export function Header(props:any)
{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputRef:Ref<HTMLInputElement> = React.createRef();

    const onClick = () =>
    {
        dispatch(resetSearch());
        navigate(`/search?q=${inputRef.current.value}`);
    };

    useEffect(() =>
    {
        inputRef.current.addEventListener("keypress", (event:KeyboardEvent) =>
        {
            if (event.key === "Enter")
            {
                event.preventDefault();
                onClick();
            }
        });
    },[]);

    return (
        <div id="header_container">

            <img onClick={() => window.location.href = "/" } id="logo" alt="" src="/assets/game_search_logo.png"/>

            <div id="search_group">
                <input className="default_input" id="search_input" type="text" ref={inputRef}/>
                <DefaultButton onClick={() => onClick()}>
                    Search
                </DefaultButton>
            </div>

            <UserPanel/>
        </div>
    );
}