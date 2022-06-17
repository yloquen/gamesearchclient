import C_Config from "./const/C_Config";
import {app} from "./App";
import C_Evt from "./const/C_Evt";

export default class Controller
{


    async runQuery(searchString:string)
    {
        return new Promise(function (resolve, reject)
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", C_Config.SERVER_URL + "/search?q=" + escape(searchString));

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

            xhr.send();
        });
    }


}