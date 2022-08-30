import "../css/main.css";
import "../css/search_form.css";

import ReactDOM from "react-dom";
import Main from "./Main";
import { Provider } from "react-redux";
import {store} from "./store/store";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {SearchResults} from "./components/SearchResults";


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}>
                    <Route path="/search" element={<SearchResults/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));