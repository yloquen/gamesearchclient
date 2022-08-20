import * as React from "react";
import {app} from "../App";
import {CSSProperties, LegacyRef} from "react";
import {fetchSearchResults} from "../features/search/searchSlice";
import {useDispatch} from "react-redux";
import UserPanel from "./UserPanel";


export function SearchForm(props:any)
{
    const dispatch = useDispatch();

    const logoStyle:CSSProperties =
    {
        position:"absolute",
        left:"1.5vw"
    };

    const ref:any = React.createRef();
    return (
        <div id="search_form_container">
            <img style={logoStyle} alt="" src="./assets/game_search_logo.png"/>

            <input id="search_form_input" type="text" ref={ref}/>
            <button id="search_form_button" onClick={() => { dispatch(fetchSearchResults(ref.current.value))} }>
                Search
            </button>
            <UserPanel/>
        </div>
    );
}