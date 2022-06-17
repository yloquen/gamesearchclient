import "../css/main.css";
import "../css/search_form.css";

import ReactDOM from "react-dom";
import Main from "./Main";
import { Provider } from "react-redux";
import {store} from "./store/store";


ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('root'));