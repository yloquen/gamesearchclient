import C_Config from "./const/C_Config";
import {app} from "./App";
import C_Evt from "./const/C_Evt";

export default class Controller
{


    runQuery(searchString:string)
    {
        const req = new XMLHttpRequest();
        req.open("GET", C_Config.SERVER_URL + "/search?q=" + searchString);
        req.send();

        app.model.loaded = false;
        app.model.loading = true;
        app.dispatcher.emit(C_Evt.LOAD_EVENT);

        req.onreadystatechange = () =>
        {
            if (req.readyState == 4 && req.status == 200)
            {
                app.model.setSearchResults(JSON.parse(req.response));
            }
        };
    }


}