import "../css/main.css";

import ReactDOM from "react-dom/client";
import React from "react";
import Main from "./Main";
import { Provider } from "react-redux";
import {store} from "./store/store";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SearchResults} from "./components/SearchResults";
import {gsap} from "gsap";
import Root from "./Root";



const MyElement = (props) =>
{
    return (<div style={{backgroundColor:props.color}}>{props.children}</div>);
};
//const root = React.createElement(MyElement, {}, "Hello");
//ReactDOM.render(root, document.getElementById('root'));



const test = React.createElement(MyElement, {color:"#f0f"}, "Hello");
const test2 =  React.cloneElement(test, {color:"#ff0"});

const frag = <React.Fragment>
    {test}
    {test2}
</React.Fragment>

debugger;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(frag);

if (process.env.NODE_ENV !== 'production' && module.hot)
{
    module.hot.accept();
}





