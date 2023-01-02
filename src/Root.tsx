import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Main";
import {SearchResults} from "./components/SearchResults";
import React from "react";

const themeState = { winBgColor:"#f0f" };

export const GlobalContext = React.createContext(themeState);

export default () =>
{
    return <GlobalContext.Provider value={themeState}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}>
                        <Route path="/search" element={<SearchResults/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </GlobalContext.Provider>
}