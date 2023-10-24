import "../css/main.css";

import ReactDOM from "react-dom/client";
import React from "react";
import Main from "./Main";
import {connect, Provider} from "react-redux";
import {RootState, store} from "./store/store";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SearchResults} from "./components/SearchResults";
import {gsap} from "gsap";
import Root from "./Root";

console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Root/>);


if (process.env.NODE_ENV !== 'production' && module.hot)
{
    module.hot.accept([], () => root.render(<Root/>));
}





