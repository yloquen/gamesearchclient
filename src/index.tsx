import "../css/main.css";
import "../css/search_form.css";

import ReactDOM from "react-dom";
import React from "react";
import Main from "./Main";
import { Provider } from "react-redux";
import {store} from "./store/store";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SearchResults} from "./components/SearchResults";
import {gsap} from "gsap";

const themeState = { winBgColor:"#f0f0" };

export const GlobalContext = React.createContext(themeState);

/*
const MyElement = (props) =>
{
    return (<div>{props.children}</div>);
};
const root = React.createElement(MyElement, {}, "Hello");
ReactDOM.render(root, document.getElementById('root'));
*/








ReactDOM.render(
    <GlobalContext.Provider value={themeState}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}>
                        <Route path="/search" element={<SearchResults/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </GlobalContext.Provider>,
    document.getElementById('root'));

