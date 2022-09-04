import C_Config from "./const/C_Config";
import {app} from "./App";
import C_Evt from "./const/C_Evt";
import {store} from "./store/store";
import {resetSearch} from "./features/search/searchSlice";
import {makeLoginRequest} from "./features/user/userSlice";

export default class Controller
{


    async runQuery(method:string, path:string, query:string=undefined, body:string=undefined)
    {
        return new Promise(function (resolve, reject)
        {
            let xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            let url = C_Config.SERVER_URL + path;
            if (query)
            {
                url += ("?" + query);
            }
            xhr.open(method, url);

            xhr.onload = function ()
            {
                if (this.status >= 200 && this.status < 300)
                {
                    let resp = {};
                    try
                    {
                        resp = JSON.parse(xhr.response)
                    }
                    finally
                    {
                        resolve(resp);
                    }
                }
                else
                {
                    reject({
                        status:this.status,
                        statusText:xhr.statusText
                    });
                }
            };

            xhr.onerror = function ()
            {
                reject({
                    status:this.status,
                    statusText:xhr.statusText
                });
            };

            xhr.send(body);
        });
    }


}