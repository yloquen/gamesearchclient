import {GameData} from "./types";
import C_Evt from "./const/C_Evt";
import {app} from "./App";

export default class Model
{
    public loaded:boolean = false;
    public searchResults:GameData[];



    setSearchResults(data:any)
    {
        this.loaded = true;
        this.searchResults = data;

        this.searchResults.sort((r1:GameData, r2:GameData) => {return r1.price - r2.price});

        app.dispatcher.emit(C_Evt.LOADED);
    }


}