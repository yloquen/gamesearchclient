import * as React from "react";
import {app} from "../App";
import {LegacyRef} from "react";


export function SearchForm(props:any)
{
    const ref:any = React.createRef();
    return (
        <div id="search_form_container">
            <input id="search_form_input" type="text" ref={ref}/>
            <button id="search_form_button" onClick={() => {app.controller.runQuery(ref.current.value)}}>
                Search
            </button>
        </div>
    );
}