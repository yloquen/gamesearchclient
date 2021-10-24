import C_Config from "./const/C_Config";
import {app} from "./App";

export default class Controller
{


    runQuery(searchString:string)
    {
        const req = new XMLHttpRequest();
        req.open("GET", C_Config.SERVER_URL + "/search?q=" + searchString);
        req.send();

        req.onreadystatechange = () => {
            if (req.readyState == 4 && req.status == 200)
            {
                app.model.setSearchResults(JSON.parse(req.response));
            }
        };
    }


}