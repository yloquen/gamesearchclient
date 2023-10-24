import C_Config from "./const/C_Config";
import { store } from "./store/store";
import { setLoginState } from "./features/user/userSlice";

export async function runQuery(method:string, path:string, query:string=undefined, body:string=undefined)
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
                let resp;
                try
                {
                    resp = JSON.parse(xhr.response);
                }
                catch
                {
                    resp = {};
                }
                finally
                {
                    if (store.getState().user.loggedIn !== resp.loggedIn)
                    {
                        store.dispatch(setLoginState(resp.loggedIn));
                    }

                    if (!resp.data)
                    {
                        reject("Response has no data");
                    }
                    else if (resp.data.error)
                    {
                        reject("Response error : " + JSON.stringify(resp.data.error));
                    }
                    else
                    {
                        resolve(resp.data);
                    }
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