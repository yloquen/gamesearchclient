import {GameData} from "./types";
import C_Evt from "./const/C_Evt";
import {app} from "./App";

export default class Model
{
    public loading:boolean = false;
    public loaded:boolean = false;
    public gameData:GameData[] = [];
    public priceData:GameData[] = [];
    public usdToBgn:number = 1.7;


    setSearchResults(data:{gameData:GameData[], priceData:GameData[]})
    {
        this.gameData = data.gameData;
        this.priceData = data.priceData;

        this.gameData.sort((r1:GameData, r2:GameData) => {return r1.price - r2.price});

        app.dispatcher.emit(C_Evt.LOAD_EVENT);
    }


}