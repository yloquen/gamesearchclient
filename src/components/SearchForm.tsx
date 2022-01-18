import * as React from "react";
import {app} from "../App";
import {LegacyRef} from "react";


export function SearchForm(props:any)
{
    const logoStyle =
    {
        position:"absolute",
        left:"1.5vw"
    };

    const ref:any = React.createRef();
    return (
        <div id="search_form_container">
            <img style={logoStyle} alt="" src="./assets/game_search_logo.png"/>

            <input id="search_form_input" type="text" ref={ref}/>
            <button id="search_form_button" onClick={() => {app.controller.runQuery(ref.current.value)}}>
                Search
            </button>
        </div>
    );
}