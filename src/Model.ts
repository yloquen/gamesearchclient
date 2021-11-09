import {GameData, PriceData} from "./types";
import C_Evt from "./const/C_Evt";
import {app} from "./App";

export default class Model
{
    public loading:boolean = false;
    public loaded:boolean = false;
    public gameData:GameData[] = [];
    public priceData:PriceData[] = [];


    setSearchResults(data:{gameData:GameData[], priceData:PriceData[]})
    {
        this.loading = false;
        this.loaded = true;
        this.gameData = data.gameData;
        this.priceData = data.priceData;

        this.gameData.sort((r1:GameData, r2:GameData) => {return r1.price - r2.price});

        app.dispatcher.emit(C_Evt.LOAD_EVENT);
    }


}