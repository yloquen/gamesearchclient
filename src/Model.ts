import {GameData, WikiData} from "./types";
import C_Evt from "./const/C_Evt";
import {app} from "./App";


export default class Model
{
    public searchString:string;
    public loading:boolean = false;
    public loaded:boolean = false;
    public gameData:GameData[] = [];
    public priceData:GameData[] = [];
    public usdToBgn:number = 1.9;
    public wikiData:WikiData;
    public videoId:string;


    setSearchResults(data:any)
    {
        this.gameData = data.gameData;
        this.priceData = data.priceData;
        this.wikiData = data.wikiData;
        this.videoId = data.videoId;

        this.gameData.sort((r1:GameData, r2:GameData) =>
        {
            return r1.price - r2.price
        });

        app.dispatcher.emit(C_Evt.LOAD_EVENT);
    }


}