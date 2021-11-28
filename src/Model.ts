import {GameData} from "./types";
import C_Evt from "./const/C_Evt";
import {app} from "./App";

export default class Model
{
    public searchString:string;
    public loading:boolean = false;
    public loaded:boolean = false;
    public gameData:GameData[] = [];
    public priceData:GameData[] = [];
    public usdToBgn:number = 1.7;
    public wikiData:string;
    public wikiReviews:string;


    setSearchResults(data:any)
    {
        this.gameData = data.gameData;
        this.priceData = data.priceData;
        this.wikiData = data.wikiData;
        this.wikiReviews = data.wikiReviews;

        this.gameData.sort((r1:GameData, r2:GameData) => {return r1.price - r2.price});

        app.dispatcher.emit(C_Evt.LOAD_EVENT);
    }


}