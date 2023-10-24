import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Main";
import {SearchResults} from "./components/SearchResults";
import React from "react";
import {Favorites} from "./components/Favorites";

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
                        <Route path="/favorites" element={<Favorites/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </GlobalContext.Provider>
}